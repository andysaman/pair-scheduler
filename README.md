# pair-scheduler

Calculate a schedule for pair programming in teams.

# Requirements

- Node v14+

# Configuration

Define a file called config.yml.

Example format:

```
team:
  - Andy
  - Kevin
  - Pablo
  - Piyush
  - Raviraj
  - Sam
roles:
  - Driver
  - Navigator
weekdays:
  - Tuesday
  - Wednesday
  - Thursday
weeks: 2
dailySessions: 1
intradayShuffle: true
```

## Settings:

- _intradayShuffle_ - Automatically shuffle the team list multiple times per day. Without intradayShuffle, the same team members will be paired with each other multiple times per day.
