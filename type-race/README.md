# Type Race

A real-time multiplayer typing game built with Node.js, Express, and Socket.IO.

## Features

- Real-time multiplayer room system for 2–8 players
- 4-character room codes
- Host-controlled lobby and round flow
- 3-round match with persistent total scores
- Randomized sentence challenges with Easy, Medium, and Hard modes
- Server-authoritative scoring, combo tracking, and typing validation
- Round results and final leaderboard
- Responsive dark-mode interface for desktop and mobile devices

## Requirements

- Node.js
- npm

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

## Local URL

[http://localhost:3000](http://localhost:3000/)

## Multiplayer Testing

To test the multiplayer flow:

- Open two browser windows on the same machine and join the same room
- Use incognito windows or separate browsers for more realistic testing
- Test on multiple devices connected to the same Wi-Fi network
- When running on a local network, the server machine's local IP is used, not `localhost`

On Windows, open a terminal and run:

```bash
ipconfig
```

Then use the IPv4 address shown by Windows, for example:

[http://192.168.1.100:3000](http://192.168.1.100:3000/)

Replace the sample IP with your actual machine address. `localhost` refers to the computer running the server.

## Game Rules

1. Join a room with 2–8 players.
2. Everyone receives the same sentence challenge.
3. Wait for the server-controlled countdown.
4. Type the sentence exactly as shown.
5. Correctly completing a word increases your combo.
6. A typo resets your combo to 1x.
7. The first player to finish gets first place.
8. Other players have up to 30 seconds after the first finish to keep typing.
9. Unfinished players are ranked by progress and score.
10. A match contains 3 rounds.
11. The highest total score wins.

## Deployment

This project is designed for a Node.js-compatible hosting service. It can later be deployed to services such as Render, Railway, Heroku, or another Node hosting provider with minimal configuration changes.
