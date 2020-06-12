// Given a sessionPlan and the number of roles, display a report of the sessions in the console:
// Session Plan:
// ┌─────────┬───────────┬─────────────┬─────────────┬───────────┐
// │ (index) │ sessionId │     day     │    role     │  member   │
// ├─────────┼───────────┼─────────────┼─────────────┼───────────┤
// │    0    │ 'W0D0S0'  │  'Tuesday'  │  'Driver'   │ 'Raviraj' │
// │    1    │ 'W0D0S0'  │  'Tuesday'  │ 'Navigator' │ 'Piyush'  │
// │    2    │ 'W0D0S1'  │  'Tuesday'  │  'Driver'   │  'Kevin'  │
// │    3    │ 'W0D0S1'  │  'Tuesday'  │ 'Navigator' │  'Andy'   │
// │    4    │ 'W0D0S2'  │  'Tuesday'  │  'Driver'   │   'Sam'   │
// │    5    │ 'W0D0S2'  │  'Tuesday'  │ 'Navigator' │  'Pablo'  │
// │    6    │ 'W0D1S0'  │ 'Wednesday' │  'Driver'   │  'Andy'   │
// │    7    │ 'W0D1S0'  │ 'Wednesday' │ 'Navigator' │   'Sam'   │
// │    8    │ 'W0D1S1'  │ 'Wednesday' │  'Driver'   │ 'Piyush'  │
// │    9    │ 'W0D1S1'  │ 'Wednesday' │ 'Navigator' │ 'Raviraj' │
// │   10    │ 'W0D1S2'  │ 'Wednesday' │  'Driver'   │  'Pablo'  │
// │   11    │ 'W0D1S2'  │ 'Wednesday' │ 'Navigator' │  'Kevin'  │
// │   12    │ 'W0D2S0'  │ 'Thursday'  │  'Driver'   │  'Kevin'  │
// │   13    │ 'W0D2S0'  │ 'Thursday'  │ 'Navigator' │ 'Raviraj' │
// │   14    │ 'W0D2S1'  │ 'Thursday'  │  'Driver'   │   'Sam'   │
// │   15    │ 'W0D2S1'  │ 'Thursday'  │ 'Navigator' │  'Pablo'  │
// │   16    │ 'W0D2S2'  │ 'Thursday'  │  'Driver'   │ 'Piyush'  │
// │   17    │ 'W0D2S2'  │ 'Thursday'  │ 'Navigator' │  'Andy'   │
// │   18    │ 'W1D0S0'  │  'Tuesday'  │  'Driver'   │  'Andy'   │
// │   19    │ 'W1D0S0'  │  'Tuesday'  │ 'Navigator' │   'Sam'   │
// │   20    │ 'W1D0S1'  │  'Tuesday'  │  'Driver'   │ 'Raviraj' │
// │   21    │ 'W1D0S1'  │  'Tuesday'  │ 'Navigator' │ 'Piyush'  │
// │   22    │ 'W1D0S2'  │  'Tuesday'  │  'Driver'   │  'Pablo'  │
// │   23    │ 'W1D0S2'  │  'Tuesday'  │ 'Navigator' │  'Kevin'  │
// │   24    │ 'W1D1S0'  │ 'Wednesday' │  'Driver'   │ 'Piyush'  │
// │   25    │ 'W1D1S0'  │ 'Wednesday' │ 'Navigator' │  'Pablo'  │
// │   26    │ 'W1D1S1'  │ 'Wednesday' │  'Driver'   │  'Kevin'  │
// │   27    │ 'W1D1S1'  │ 'Wednesday' │ 'Navigator' │   'Sam'   │
// │   28    │ 'W1D1S2'  │ 'Wednesday' │  'Driver'   │ 'Raviraj' │
// │   29    │ 'W1D1S2'  │ 'Wednesday' │ 'Navigator' │  'Andy'   │
// │   30    │ 'W1D2S0'  │ 'Thursday'  │  'Driver'   │   'Sam'   │
// │   31    │ 'W1D2S0'  │ 'Thursday'  │ 'Navigator' │  'Kevin'  │
// │   32    │ 'W1D2S1'  │ 'Thursday'  │  'Driver'   │  'Pablo'  │
// │   33    │ 'W1D2S1'  │ 'Thursday'  │ 'Navigator' │ 'Raviraj' │
// │   34    │ 'W1D2S2'  │ 'Thursday'  │  'Driver'   │  'Andy'   │
// │   35    │ 'W1D2S2'  │ 'Thursday'  │ 'Navigator' │ 'Piyush'  │
// └─────────┴───────────┴─────────────┴─────────────┴───────────┘
//
// Report Output:
// Tuesday:
//  * Driver: Raviraj <-> Navigator: Piyush
//  * Driver: Kevin <-> Navigator: Andy
//  * Driver: Sam <-> Navigator: Pablo
// Wednesday:
//  * Driver: Andy <-> Navigator: Sam
//  * Driver: Piyush <-> Navigator: Raviraj
//  * Driver: Pablo <-> Navigator: Kevin
// Thursday:
//  * Driver: Kevin <-> Navigator: Raviraj
//  * Driver: Sam <-> Navigator: Pablo
//  * Driver: Piyush <-> Navigator: Andy
// Tuesday:
//  * Driver: Andy <-> Navigator: Sam
//  * Driver: Raviraj <-> Navigator: Piyush
//  * Driver: Pablo <-> Navigator: Kevin
// Wednesday:
//  * Driver: Piyush <-> Navigator: Pablo
//  * Driver: Kevin <-> Navigator: Sam
//  * Driver: Raviraj <-> Navigator: Andy
// Thursday:
//  * Driver: Sam <-> Navigator: Kevin
//  * Driver: Pablo <-> Navigator: Raviraj
//  * Driver: Andy <-> Navigator: Piyush

export const showLog = (roles, sessionPlan) => {
  // Format the output report
  let currentDay = "";
  let currentSession = "";
  let sessionString = "";
  let sessionRoleCounter = 0;

  sessionPlan.forEach((sessionItem) => {
    if (sessionItem.day != currentDay) {
      currentDay = sessionItem.day;
      console.log(currentDay + ": ");
    }
    if (sessionItem.sessionId != currentSession) {
      currentSession = sessionItem.sessionId;
      sessionString = " * ";
      sessionRoleCounter = 0;
    } else {
      sessionString += " <-> ";
    }
    sessionString += sessionItem.role + ": " + sessionItem.member;
    sessionRoleCounter++;
    if (sessionRoleCounter === roles.length) {
      console.log(sessionString);
    }
  });
};
