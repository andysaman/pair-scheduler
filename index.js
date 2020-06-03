const arrayToKeys = (arr) => {
  return arr.reduce(function (acc, curr) {
    acc[curr] = [];
    return acc;
  }, {});
};

const groupBy = (array, key, initialObj) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, initialObj);
};

const deleteFromObject = (object, deleteList) => {
  return deleteList.forEach((target) => delete object[target]);
};

const findSmallestKeyArray = (list, object) => {
  let lowestCount;
  let smallest;
  list.forEach((item) => {
    if (object[item] === undefined) return;
    if (lowestCount === undefined || object[item].length < lowestCount) {
      lowestCount = object[item].length;
      smallest = item;
    }
  });
  return smallest;
};

const shuffleArray = (arr) => {
  // Fisher-Yates Algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};

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
  roles = [],
  weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  totalWeeks = 2,
  memberMaxDailySessions = 1
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

// Calculate the sessions
const roles = ["Driver", "Navigator"];
const sessionPlan = generateAllSessions(["Cynthia", "Frank", "Jimal", "Cory"], roles);

// Format the output report
let currentDay = "";
let currentSession = "";
let sessionString = "";
let sessionCount = 0;
sessionPlan.forEach((sessionItem) => {
  if (sessionItem.day != currentDay) {
    currentDay = sessionItem.day;
    console.log(currentDay + ": ");
  }
  if (sessionItem.sessionId != currentSession) {
    currentSession = sessionItem.sessionId;
    sessionString = " * ";
    sessionCount = 0;
  } else {
    sessionString += " <-> ";
  }
  sessionString += sessionItem.role + ": " + sessionItem.member;
  sessionCount++;
  if (sessionCount === roles.length) {
    console.log(sessionString);
  }
});
