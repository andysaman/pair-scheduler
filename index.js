import yaml from "js-yaml";
import fs from "fs";
import {
  arrayToKeys,
  deleteFromObject,
  findSmallestKeyArray,
  groupBy,
  shuffleArray,
} from "./utils/arrayUtils.js";
import { showLog } from "./reports/output.js";

const DEFAULT_TEAM = ["Teammate #1", "Teammate #2", "Teammate #3"];
const DEFAULT_ROLES = ["Driver", "Navigator"];
const DEFAULT_WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DEFAULT_WEEKS = 2;
const DEFAULT_DAILY_SESSIONS = 1;
const DEFAULT_INTRADAY_SHUFFLE = false;

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
  team,
  roles,
  weekdays,
  totalWeeks,
  memberDailySessions,
  enableIntradayShuffle
) => {
  const sessionList = [];
  let shuffledTeam = Array.from(team);

  for (let i = 0; i < totalWeeks; i++) {
    weekdays.forEach((day, dayIndex) => {
      // Randomize the member selection once each day
      shuffleArray(shuffledTeam);

      // Calculate the sessions per day based on team size. Track assignments per day.
      const sessionsPerDay = Math.floor(shuffledTeam.length / roles.length) * memberDailySessions;
      let pastMembers = [];
      for (let j = 0; j < sessionsPerDay; j++) {
        const sessionId = "W" + i + "D" + dayIndex + "S" + j;
        roles.forEach((role) => {
          const memberForRole = getNextForRole(shuffledTeam, roles, sessionList, role, pastMembers);
          // Add this assignment to the list of already assigned; reset if full
          pastMembers.push(memberForRole);
          if (pastMembers.length === shuffledTeam.length) {
            pastMembers = [];
            if (enableIntradayShuffle) shuffleArray(shuffledTeam);
          }
          sessionList.push({ sessionId: sessionId, day: day, role: role, member: memberForRole });
        });
      }
    });
  }

  return sessionList;
};

// // Calculate the sessions for our team
// Get document, or throw exception on error
try {
  // Load the configuration
  const configuration = yaml.safeLoad(fs.readFileSync("./config.yml", "utf8"));

  const myTeam = configuration.team || DEFAULT_TEAM;
  const myRoles = configuration.roles || DEFAULT_ROLES;
  const myWeekdays = configuration.weekdays || DEFAULT_WEEKDAYS;
  const myWeeks = configuration.weeks || DEFAULT_WEEKS;
  const myDailySessions = configuration.dailySessions || DEFAULT_DAILY_SESSIONS;
  const myIntradayShuffle = configuration.intradayShuffle || DEFAULT_INTRADAY_SHUFFLE;

  const sessionPlan = generatePairSessions(
    myTeam,
    myRoles,
    myWeekdays,
    myWeeks,
    myDailySessions,
    myIntradayShuffle
  );

  // Display the output
  showLog(myRoles, sessionPlan);
} catch (e) {
  console.log(e);
}
