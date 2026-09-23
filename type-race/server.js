const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const MAX_PLAYERS = 8;
const MAX_NAME_LENGTH = 20;
const MAX_ROUNDS = 3;
const ROUND_FINISH_WINDOW_MS = 30000;

const CHALLENGES = {
  easy: [
    'A purple chicken stole my computer and demanded three tacos.',
    'My sleepy robot tried to bake cookies inside the washing machine.',
    'The tiny dragon ordered pizza and accidentally called the police.',
    'My neighbor cat became famous after stealing a golden sandwich.',
    'The astronaut forgot his helmet because he was busy feeding squirrels.',
    'A giant potato challenged the king to a very serious dance battle.',
    'The monkey opened a restaurant and only served invisible soup.',
    'My computer sneezed loudly and scared everyone in the office.',
    'A cheerful raccoon tried to become a professional tea taster.',
    'The tired wizard lost his hat while chasing a runaway goose.'
  ],
  medium: [
    'Seven dancing bananas escaped from the supermarket at midnight.',
    'A confused penguin wore sunglasses while riding a skateboard.',
    'The moonlight magician accidentally mailed his shadow to the wrong mailbox.',
    'A dramatic otter delivered a surprise speech during the city parade.',
    'The grumpy librarian insisted that all squirrels must wear tiny aprons.',
    'A nervous hedgehog attempted a jazz solo beneath a glowing lighthouse.',
    'The circus clown forgot his shoes and performed ballet in flip flops.',
    'A stubborn toaster argued with the microwave about breakfast priorities.',
    'The disguised frog won the talent contest by singing underwater opera.',
    'My backpack was stolen by a very determined pigeon with excellent timing.'
  ],
  hard: [
    'A suspiciously elegant marshmallow attempted to negotiate with the moon during a thunderstorm.',
    'The overcaffeinated octopus invented a newspaper that only reported underwater gossip and suspicious noodles.',
    'A theatrical vulture demanded an expensive microphone before narrating the mayoral parade through a foggy canyon.',
    'The deeply offended pterodactyl refused to share its enchanted popcorn with a nervous astronaut and three penguins.',
    'An absurdly dramatic toaster conducted an orchestra of squeaking mice beneath the abandoned observatory.',
    'The ancient robot librarian insisted that every banana must be alphabetized before sunrise, and then panicked.',
    'A moody volcano disguised itself as a jazz club and summoned thunderous applause from bewildered goats.',
    'The whispered conspiracy of three sleepy owls concluded that umbrellas were secretly government spies.',
    'A fearless walrus launched a moonlit opera while balancing a chandelier on his tusks and singing in Latin.',
    'The polished dragon accountant filed seventeen mysterious tax forms for invisible clouds and suspicious rainbows.'
  ]
};

const rooms = new Map();

function sanitizePlayerName(rawName) {
  const cleaned = String(rawName || '')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, MAX_NAME_LENGTH);

  return cleaned || '';
}

function buildPlayerSnapshot(player) {
  return {
    id: player.id,
    name: player.name,
    score: player.score,
    combo: player.combo,
    progress: player.progress,
    finished: player.finished,
    finishTime: player.finishTime,
    place: player.place,
    roundScore: player.roundScore,
    completedWords: player.completedWords,
    connected: player.connected
  };
}

function buildRoomSnapshot(room) {
  return {
    roomCode: room.roomCode,
    hostId: room.hostId,
    players: room.players.map(buildPlayerSnapshot),
    currentRound: room.currentRound,
    maxRounds: room.maxRounds,
    gameStarted: room.gameStarted,
    roundActive: room.roundActive,
    challenge: room.challenge,
    difficulty: room.difficulty,
    roundResults: room.roundResults,
    finalLeaderboard: room.finalLeaderboard,
    finishWindowStarted: room.finishWindowStarted,
    countdownValue: room.countdownValue,
    roundStatus: room.roundStatus
  };
}

function getRoomBySocketId(socketId) {
  for (const room of rooms.values()) {
    if (room.players.some(player => player.id === socketId)) {
      return room;
    }
  }
  return null;
}

function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  do {
    code = '';
    for (let i = 0; i < 4; i += 1) {
      const index = Math.floor(Math.random() * chars.length);
      code += chars[index];
    }
  } while (rooms.has(code));

  return code;
}

function getCompletedWordCount(prefixText) {
  const trimmed = String(prefixText || '').trim();
  if (!trimmed) return 0;
  const matches = trimmed.match(/[A-Za-z0-9'’-]+/g) || [];
  return matches.length;
}

function getMatchedPrefixLength(typedText, challengeText) {
  const maxLength = Math.min(String(typedText || '').length, String(challengeText || '').length);
  let matched = 0;

  for (let index = 0; index < maxLength; index += 1) {
    if (typedText[index] === challengeText[index]) {
      matched += 1;
    } else {
      break;
    }
  }

  return matched;
}

function resetPlayerRoundState(player) {
  player.combo = 1;
  player.progress = 0;
  player.finished = false;
  player.finishTime = null;
  player.place = null;
  player.roundScore = 0;
  player.completedWords = 0;
  player.lastProgress = 0;
}

function pickChallenge(room) {
  const difficultyLevels = ['easy', 'medium', 'hard'];
  const chosenDifficulty = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
  const pool = CHALLENGES[chosenDifficulty];
  let challenge = pool[Math.floor(Math.random() * pool.length)];

  if (room.lastChallenge && pool.length > 1) {
    let attempts = 0;
    while (challenge === room.lastChallenge && attempts < 10) {
      challenge = pool[Math.floor(Math.random() * pool.length)];
      attempts += 1;
    }
  }

  room.lastChallenge = challenge;
  room.challenge = challenge;
  room.difficulty = chosenDifficulty;
}

function setCountdown(room, duration) {
  room.countdownValue = duration;
  io.to(room.roomCode).emit('countdown', {
    roomCode: room.roomCode,
    value: duration,
    currentRound: room.currentRound,
    difficulty: room.difficulty,
    challenge: room.challenge
  });
}

function startRound(room) {
  room.roundStatus = 'preparing';
  room.roundActive = false;
  room.finishWindowStarted = false;
  room.finishWindowDeadline = null;
  room.roundResults = [];

  pickChallenge(room);

  room.players.forEach(player => {
    resetPlayerRoundState(player);
    player.score = Number(player.score) || 0;
  });

  io.to(room.roomCode).emit('roundPreparing', {
    roomCode: room.roomCode,
    currentRound: room.currentRound,
    difficulty: room.difficulty,
    challenge: room.challenge
  });

  let count = 3;
  const interval = setInterval(() => {
    if (count > 0) {
      setCountdown(room, count);
      count -= 1;
      return;
    }

    clearInterval(interval);
    room.roundStatus = 'active';
    room.roundActive = true;
    room.roundStartTime = Date.now();
    room.countdownValue = 'GO!';

    io.to(room.roomCode).emit('raceStart', {
      roomCode: room.roomCode,
      currentRound: room.currentRound,
      difficulty: room.difficulty,
      challenge: room.challenge,
      roundStartTime: room.roundStartTime
    });
  }, 1000);
}

function calculateRoundRanking(room) {
  const finishedPlayers = room.players.filter(player => player.finished).sort((a, b) => {
    if ((a.finishTime || Infinity) !== (b.finishTime || Infinity)) {
      return (a.finishTime || Infinity) - (b.finishTime || Infinity);
    }
    return a.name.localeCompare(b.name);
  });

  const unfinishedPlayers = room.players.filter(player => !player.finished).sort((a, b) => {
    if (a.progress !== b.progress) {
      return b.progress - a.progress;
    }
    return b.score - a.score;
  });

  const finalRanking = [...finishedPlayers, ...unfinishedPlayers];

  finalRanking.forEach((player, index) => {
    player.place = index + 1;
  });

  room.roundResults = finalRanking.map(player => ({
    id: player.id,
    name: player.name,
    position: player.place,
    score: player.roundScore,
    totalScore: player.score,
    finished: player.finished,
    progress: player.progress,
    combo: player.combo,
    finishTime: player.finishTime
  }));

  return room.roundResults;
}

function endRound(room) {
  if (!room.roundActive && !room.finishWindowStarted && room.currentRound === 0) {
    return;
  }

  room.roundActive = false;
  room.finishWindowStarted = false;
  room.finishWindowDeadline = null;
  room.roundStatus = 'results';

  if (room.finishWindowTimer) {
    clearTimeout(room.finishWindowTimer);
    room.finishWindowTimer = null;
  }

  calculateRoundRanking(room);

  const rankingData = room.roundResults;
  io.to(room.roomCode).emit('roundResults', {
    roomCode: room.roomCode,
    currentRound: room.currentRound,
    results: rankingData
  });

  if (room.currentRound >= MAX_ROUNDS) {
    const finalLeaderboard = [...room.players]
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({
        position: index + 1,
        name: player.name,
        totalScore: player.score
      }));

    room.finalLeaderboard = finalLeaderboard;

    io.to(room.roomCode).emit('gameComplete', {
      roomCode: room.roomCode,
      leaderboard: finalLeaderboard,
      message: 'Game Complete! Highest total score wins the match.'
    });

    room.gameStarted = false;
  }
}

function queueFinishWindow(room) {
  if (room.finishWindowTimer) {
    clearTimeout(room.finishWindowTimer);
  }

  room.finishWindowStarted = true;
  room.finishWindowDeadline = Date.now() + ROUND_FINISH_WINDOW_MS;
  room.finishWindowTimer = setTimeout(() => {
    endRound(room);
  }, ROUND_FINISH_WINDOW_MS);
}

function handlePlayerFinish(room, player) {
  if (player.finished) {
    return;
  }

  player.finished = true;
  player.finishTime = Date.now() - room.roundStartTime;
  player.progress = 100;

  const finishedCount = room.players.filter(entry => entry.finished).length;
  const totalPlayers = room.players.length;

  if (!room.finishWindowStarted) {
    queueFinishWindow(room);
  }

  if (finishedCount === totalPlayers) {
    if (room.finishWindowTimer) {
      clearTimeout(room.finishWindowTimer);
      room.finishWindowTimer = null;
    }
    endRound(room);
    return;
  }

  io.to(room.roomCode).emit('playerProgress', {
    roomCode: room.roomCode,
    players: room.players.map(buildPlayerSnapshot)
  });
}

function syncRoom(room) {
  io.to(room.roomCode).emit('roomUpdate', buildRoomSnapshot(room));
}

function handlePlayerDisconnect(socketId) {
  const room = getRoomBySocketId(socketId);
  if (!room) {
    return;
  }

  const player = room.players.find(entry => entry.id === socketId);
  if (!player) {
    return;
  }

  room.players = room.players.filter(entry => entry.id !== socketId);

  if (room.players.length === 0) {
    rooms.delete(room.roomCode);
    return;
  }

  if (room.hostId === socketId) {
    room.hostId = room.players[0].id;
    io.to(room.roomCode).emit('newHost', {
      roomCode: room.roomCode,
      hostId: room.hostId
    });
  }

  if (room.roundActive && room.players.length < 2) {
    if (room.finishWindowTimer) {
      clearTimeout(room.finishWindowTimer);
      room.finishWindowTimer = null;
    }
    room.roundActive = false;
    room.finishWindowStarted = false;
    room.roundStatus = 'results';
    calculateRoundRanking(room);
    io.to(room.roomCode).emit('roundResults', {
      roomCode: room.roomCode,
      currentRound: room.currentRound,
      results: room.roundResults
    });
  }

  syncRoom(room);
}

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  socket.emit('connectionStatus', { connected: true, message: 'Connected to Type Race.' });

  socket.on('createRoom', ({ name }) => {
    const safeName = sanitizePlayerName(name);
    if (!safeName) {
      return socket.emit('errorMessage', { message: 'Please enter your name.' });
    }

    if (socket.data.roomCode) {
      return socket.emit('errorMessage', { message: 'You are already in a room.' });
    }

    const roomCode = generateRoomCode();
    const room = {
      roomCode,
      hostId: socket.id,
      players: [],
      currentRound: 1,
      maxRounds: MAX_ROUNDS,
      gameStarted: false,
      roundActive: false,
      roundStatus: 'lobby',
      challenge: '',
      difficulty: 'easy',
      finishWindowStarted: false,
      finishWindowDeadline: null,
      countdownValue: null,
      roundStartTime: null,
      roundResults: [],
      finalLeaderboard: [],
      lastChallenge: null,
      finishWindowTimer: null
    };

    const player = {
      id: socket.id,
      name: safeName,
      score: 0,
      combo: 1,
      progress: 0,
      finished: false,
      finishTime: null,
      place: null,
      roundScore: 0,
      completedWords: 0,
      connected: true,
      lastProgress: 0
    };

    room.players.push(player);
    rooms.set(roomCode, room);
    socket.join(roomCode);
    socket.data.roomCode = roomCode;

    socket.emit('roomCreated', {
      roomCode,
      player: buildPlayerSnapshot(player),
      room: buildRoomSnapshot(room)
    });

    syncRoom(room);
  });

  socket.on('joinRoom', ({ name, roomCode }) => {
    const safeName = sanitizePlayerName(name);
    if (!safeName) {
      return socket.emit('errorMessage', { message: 'Please enter your name.' });
    }

    if (socket.data.roomCode) {
      return socket.emit('errorMessage', { message: 'You are already in a room.' });
    }

    const sanitizedRoomCode = String(roomCode || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
    if (!sanitizedRoomCode) {
      return socket.emit('errorMessage', { message: 'Please enter a room code.' });
    }

    const room = rooms.get(sanitizedRoomCode);
    if (!room) {
      return socket.emit('errorMessage', { message: 'Room not found.' });
    }

    if (room.gameStarted) {
      return socket.emit('errorMessage', { message: 'This game has already started.' });
    }

    if (room.players.length >= MAX_PLAYERS) {
      return socket.emit('errorMessage', { message: 'This room is full.' });
    }

    const player = {
      id: socket.id,
      name: safeName,
      score: 0,
      combo: 1,
      progress: 0,
      finished: false,
      finishTime: null,
      place: null,
      roundScore: 0,
      completedWords: 0,
      connected: true,
      lastProgress: 0
    };

    room.players.push(player);
    socket.join(sanitizedRoomCode);
    socket.data.roomCode = sanitizedRoomCode;

    socket.emit('joinedRoom', {
      roomCode: sanitizedRoomCode,
      room: buildRoomSnapshot(room),
      player: buildPlayerSnapshot(player)
    });

    syncRoom(room);
  });

  socket.on('startGame', () => {
    const room = getRoomBySocketId(socket.id);
    if (!room) {
      return socket.emit('errorMessage', { message: 'Room not found.' });
    }

    if (room.hostId !== socket.id) {
      return socket.emit('errorMessage', { message: 'Only the host can start the game.' });
    }

    if (room.players.length < 2) {
      return socket.emit('errorMessage', { message: 'At least 2 players are required.' });
    }

    room.gameStarted = true;
    room.currentRound = 1;
    room.roundStatus = 'preparing';
    startRound(room);
  });

  socket.on('nextRound', () => {
    const room = getRoomBySocketId(socket.id);
    if (!room) {
      return socket.emit('errorMessage', { message: 'Room not found.' });
    }

    if (room.hostId !== socket.id) {
      return socket.emit('errorMessage', { message: 'Only the host can start the next round.' });
    }

    if (room.currentRound >= MAX_ROUNDS) {
      return socket.emit('errorMessage', { message: 'This is the final round.' });
    }

    if (room.roundActive || room.roundStatus === 'preparing') {
      return socket.emit('errorMessage', { message: 'Please wait for the current round to finish.' });
    }

    room.currentRound += 1;
    room.roundStatus = 'preparing';
    startRound(room);
  });

  socket.on('typing', ({ text }) => {
    const room = getRoomBySocketId(socket.id);
    if (!room || !room.roundActive) {
      return;
    }

    const player = room.players.find(entry => entry.id === socket.id);
    if (!player || player.finished) {
      return;
    }

    const typedText = String(text || '').slice(0, room.challenge.length + 20);
    const matchedChars = getMatchedPrefixLength(typedText, room.challenge);
    const progressPercent = Math.min(100, Math.round((matchedChars / room.challenge.length) * 100));
    const hasMistake = typedText.length > 0 && typedText.length > matchedChars;

    if (hasMistake) {
      player.combo = 1;
    }

    const completedWords = getCompletedWordCount(room.challenge.slice(0, matchedChars));
    const newWordCount = completedWords - player.completedWords;

    if (newWordCount > 0) {
      for (let index = 0; index < newWordCount; index += 1) {
        player.combo += 1;
        const pointsEarned = 10 * player.combo;
        player.score += pointsEarned;
        player.roundScore += pointsEarned;
        player.completedWords += 1;
      }
    }

    player.progress = progressPercent;
    if (player.progress >= 100) {
      player.progress = 100;
      handlePlayerFinish(room, player);
    }

    io.to(room.roomCode).emit('playerProgress', {
      roomCode: room.roomCode,
      players: room.players.map(buildPlayerSnapshot)
    });
  });

  socket.on('disconnect', () => {
    handlePlayerDisconnect(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Type Race server running at http://localhost:${PORT}`);
});
