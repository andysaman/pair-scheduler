import {
  arrayToKeys,
  deleteFromObject,
  findSmallestKeyArray,
  groupBy,
  shuffleArray,
} from "./utils/arrayUtils.js";

import { showLog } from "./reports/output.js";

const DEFAULT_DAILY_SESSIONS = 1;
const DEFAULT_WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DEFAULT_WEEKS = 2;
const DEFAULT_ROLES = ["Driver", "Navigator"];

const getNextForRole = (team, roles, memberRoleHistory, role, memberIgnoreList) => {
  // Find the member with the least assignments for this role
  // (ignoring anyone from the ignore list)

  // Find all assignments, then just the role we are concerned with.
  const historyByRole = groupBy(memberRoleHistory, "role", arrayToKeys(roles));
  const roleHistoryByMember = groupBy(historyByRole[role], "member", arrayToKeys(team));

  // Remove members found in the ignore list
  deleteFromObject(roleHistoryByMember, memberIgnoreList);

  // Return the member with the lowest frequency
  return findSmallestKeyArray(team, roleHistoryByMember);
};

const generatePairSessions = (
  team = [],
  roles = DEFAULT_ROLES,
  weekdays = DEFAULT_WEEKDAYS,
  totalWeeks = DEFAULT_WEEKS,
  memberMaxDailySessions = DEFAULT_DAILY_SESSIONS
) => {
  const sessionList = [];
  let shuffledTeam = Array.from(team);

  for (let i = 0; i < totalWeeks; i++) {
    weekdays.forEach((day, dayIndex) => {
      // Randomize the member selection once each day
      shuffleArray(shuffledTeam);

      // Calculate the sessions per day based on team size and maximums set. Track assignments per day.
      const sessionsPerDay =
        Math.floor(shuffledTeam.length / roles.length) * memberMaxDailySessions;
      const dailyMembers = [];
      for (let j = 0; j < sessionsPerDay; j++) {
        const sessionId = "W" + i + "D" + dayIndex + "S" + j;
        roles.forEach((role) => {
          const memberForRole = getNextForRole(
            shuffledTeam,
            roles,
            sessionList,
            role,
            dailyMembers
          );
          dailyMembers.push(memberForRole);
          sessionList.push({ sessionId: sessionId, day: day, role: role, member: memberForRole });
        });
      }
    });
  }

  return sessionList;
};

// Calculate the sessions for our team
// We are using limited weekdays
const myTeam = ["Kevin", "Sam", "Pablo", "Piyush", "Raviraj", "Andy"];
const myWeekdays = ["Tuesday", "Wednesday", "Thursday"];
const sessionPlan = generatePairSessions(myTeam, DEFAULT_ROLES, myWeekdays, DEFAULT_WEEKS);

// Display the output
console.table(sessionPlan);
showLog(DEFAULT_ROLES, sessionPlan);
