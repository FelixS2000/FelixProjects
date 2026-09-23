const socket = io();

const screens = {
  lobby: document.getElementById('lobbyScreen'),
  room: document.getElementById('roomScreen'),
  race: document.getElementById('raceScreen'),
  results: document.getElementById('resultsScreen'),
  final: document.getElementById('finalScreen')
};

const elements = {
  playerName: document.getElementById('playerName'),
  createRoomBtn: document.getElementById('createRoomBtn'),
  roomCodeInput: document.getElementById('roomCodeInput'),
  joinRoomBtn: document.getElementById('joinRoomBtn'),
  statusMessage: document.getElementById('statusMessage'),
  roomCodeDisplay: document.getElementById('roomCodeDisplay'),
  roomPlayers: document.getElementById('roomPlayers'),
  startGameBtn: document.getElementById('startGameBtn'),
  hostHint: document.getElementById('hostHint'),
  roundLabel: document.getElementById('roundLabel'),
  scoreValue: document.getElementById('scoreValue'),
  comboValue: document.getElementById('comboValue'),
  difficultyValue: document.getElementById('difficultyValue'),
  challengeText: document.getElementById('challengeText'),
  typingInput: document.getElementById('typingInput'),
  progressValue: document.getElementById('progressValue'),
  progressFill: document.getElementById('progressFill'),
  livePlayers: document.getElementById('livePlayers'),
  countdownBanner: document.getElementById('countdownBanner'),
  resultsList: document.getElementById('resultsList'),
  nextRoundBtn: document.getElementById('nextRoundBtn'),
  resultsHostMessage: document.getElementById('resultsHostMessage'),
  finalLeaderboard: document.getElementById('finalLeaderboard'),
  playAgainBtn: document.getElementById('playAgainBtn')
};

const state = {
  roomCode: null,
  playerId: null,
  hostId: null,
  currentRoom: null,
  isHost: false,
  inGame: false,
  currentRound: 1,
  totalScore: 0,
  typingLocked: true
};

function setStatus(message, isError = false) {
  elements.statusMessage.textContent = message || '';
  elements.statusMessage.style.color = isError ? '#fbbf24' : '#67e8f9';
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle('active', key === name);
    screen.classList.toggle('hidden', key !== name);
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderRoomPlayers(players, hostId) {
  if (!players || !players.length) {
    elements.roomPlayers.innerHTML = '<p>No players yet.</p>';
    return;
  }

  elements.roomPlayers.innerHTML = players
    .map((player) => {
      const isHost = player.id === hostId;
      const hostBadge = isHost ? '<span class="host-tag">Host</span>' : '';
      return `
        <div class="player-card">
          <div class="player-meta">
            <span>${escapeHtml(player.name)}</span>
            ${hostBadge}
          </div>
        </div>
      `;
    })
    .join('');
}

function renderLivePlayers(players) {
  if (!players) {
    elements.livePlayers.innerHTML = '';
    return;
  }

  elements.livePlayers.innerHTML = players
    .map((player) => {
      const progress = Math.min(100, Math.max(0, Number(player.progress) || 0));
      const isFinished = !!player.finished;
      const status = isFinished ? 'Finished' : `${progress}%`;
      const combo = Number(player.combo) || 1;
      const score = Number(player.score) || 0;

      return `
        <div class="live-player-item">
          <div class="live-player-head">
            <span class="live-player-name">${escapeHtml(player.name)}</span>
            <span class="status-pill">${status}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="live-player-stats">
            <span>${score} pts</span>
            <span>${combo}x</span>
          </div>
        </div>
      `;
    })
    .join('');
}

function updateLobby(room) {
  state.currentRoom = room;
  state.roomCode = room.roomCode;
  state.hostId = room.hostId;
  state.isHost = room.hostId === state.playerId;

  elements.roomCodeDisplay.textContent = room.roomCode;
  renderRoomPlayers(room.players, room.hostId);
  elements.startGameBtn.disabled = !state.isHost || room.players.length < 2;
  elements.hostHint.textContent = state.isHost ? 'You are the host.' : 'Waiting for the host...';
  showScreen('room');
}

function resetTypingInput() {
  elements.typingInput.value = '';
  elements.typingInput.disabled = true;
  elements.typingInput.placeholder = 'Start typing when the countdown ends...';
  state.typingLocked = true;
}

function setRaceScreen(room) {
  state.currentRound = room.currentRound || 1;
  elements.roundLabel.textContent = `Round ${state.currentRound}/${room.maxRounds || 3}`;
  elements.scoreValue.textContent = String(state.totalScore || 0);
  elements.comboValue.textContent = `${Number(state.currentCombo || 1)}x`;
  elements.difficultyValue.textContent = room.difficulty ? room.difficulty.charAt(0).toUpperCase() + room.difficulty.slice(1) : 'Easy';
  elements.challengeText.textContent = room.challenge || '';
  elements.progressValue.textContent = '0%';
  elements.progressFill.style.width = '0%';
  renderLivePlayers(room.players || []);
  resetTypingInput();
  showScreen('race');
}

function renderResults(results, currentRound, isHost) {
  if (!results || !results.length) {
    elements.resultsList.innerHTML = '<li>No results available.</li>';
    return;
  }

  elements.resultsList.innerHTML = results
    .map((entry, index) => `
      <li>${index + 1}. ${escapeHtml(entry.name)} — ${Number(entry.totalScore || entry.score || 0)} pts</li>
    `)
    .join('');

  const nextRoundVisible = currentRound < 3 && isHost;
  elements.nextRoundBtn.classList.toggle('hidden', !nextRoundVisible);
  elements.resultsHostMessage.textContent = isHost
    ? 'Waiting for the host to start the next round.'
    : 'Waiting for the host...';

  if (currentRound < 3 && isHost) {
    elements.resultsHostMessage.textContent = 'Press NEXT ROUND to continue.';
  }

  showScreen('results');
}

function renderFinalLeaderboard(leaderboard) {
  elements.finalLeaderboard.innerHTML = leaderboard
    .map((entry) => `<li>${entry.position}. ${escapeHtml(entry.name)} — ${Number(entry.totalScore || 0)} pts</li>`)
    .join('');
  showScreen('final');
}

function handleCreateRoom() {
  const name = elements.playerName.value.trim();
  if (!name) {
    setStatus('Please enter your name.', true);
    return;
  }

  socket.emit('createRoom', { name });
}

function handleJoinRoom() {
  const name = elements.playerName.value.trim();
  const roomCode = elements.roomCodeInput.value.trim();

  if (!name) {
    setStatus('Please enter your name.', true);
    return;
  }

  if (!roomCode) {
    setStatus('Please enter a room code.', true);
    return;
  }

  socket.emit('joinRoom', { name, roomCode });
}

function handleTyping() {
  if (state.typingLocked) {
    return;
  }

  const text = elements.typingInput.value;
  socket.emit('typing', { text });
}

socket.on('connect', () => {
  setStatus('Connected to the server.');
});

socket.on('disconnect', () => {
  setStatus('Connection lost. Please refresh or reconnect.', true);
});

socket.on('errorMessage', ({ message }) => {
  setStatus(message, true);
});

socket.on('roomCreated', ({ roomCode, room, player }) => {
  state.roomCode = roomCode;
  state.playerId = player.id;
  state.isHost = true;
  elements.roomCodeInput.value = roomCode;
  setStatus('Room created successfully.');
  updateLobby(room);
});

socket.on('joinedRoom', ({ roomCode, room, player }) => {
  state.roomCode = roomCode;
  state.playerId = player.id;
  state.isHost = false;
  setStatus('Joined room successfully.');
  updateLobby(room);
});

socket.on('roomUpdate', (room) => {
  if (!room || !state.roomCode) {
    return;
  }

  const localPlayer = room.players.find((player) => player.id === state.playerId);
  if (localPlayer) {
    state.totalScore = Number(localPlayer.score) || 0;
    state.currentCombo = Number(localPlayer.combo) || 1;
  }

  if (room.roundStatus === 'lobby') {
    updateLobby(room);
    return;
  }

  if (room.gameStarted || room.roundStatus === 'preparing' || room.roundStatus === 'active') {
    setRaceScreen(room);
    return;
  }

  if (room.roundStatus === 'results') {
    renderResults(room.roundResults || [], room.currentRound, state.isHost);
  }

  renderRoomPlayers(room.players, room.hostId);
  renderLivePlayers(room.players || []);
});

socket.on('roundPreparing', ({ currentRound, difficulty, challenge }) => {
  state.currentRound = currentRound;
  elements.roundLabel.textContent = `Round ${currentRound}/${3}`;
  elements.difficultyValue.textContent = difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Easy';
  elements.challengeText.textContent = challenge || '';
  elements.countdownBanner.textContent = 'Ready';
  elements.typingInput.disabled = true;
  state.typingLocked = true;
  showScreen('race');
});

socket.on('countdown', ({ value, currentRound, difficulty, challenge }) => {
  state.currentRound = currentRound;
  elements.roundLabel.textContent = `Round ${currentRound}/3`;
  elements.difficultyValue.textContent = difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Easy';
  elements.challengeText.textContent = challenge || '';
  elements.countdownBanner.textContent = value === 'GO!' ? 'GO!' : String(value);
});

socket.on('raceStart', ({ currentRound, difficulty, challenge }) => {
  state.currentRound = currentRound;
  elements.roundLabel.textContent = `Round ${currentRound}/3`;
  elements.difficultyValue.textContent = difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Easy';
  elements.challengeText.textContent = challenge || '';
  elements.countdownBanner.textContent = 'GO!';
  elements.typingInput.disabled = false;
  elements.typingInput.focus();
  state.typingLocked = false;
  setStatus('Race started!');
});

socket.on('playerProgress', ({ players }) => {
  const localPlayer = players.find((player) => player.id === state.playerId);
  if (localPlayer) {
    const score = Number(localPlayer.score) || 0;
    const combo = Number(localPlayer.combo) || 1;
    state.totalScore = score;
    state.currentCombo = combo;
    elements.scoreValue.textContent = String(score);
    elements.comboValue.textContent = `${combo}x`;
    elements.progressValue.textContent = `${Math.min(100, Math.max(0, Number(localPlayer.progress) || 0))}%`;
    elements.progressFill.style.width = `${Math.min(100, Math.max(0, Number(localPlayer.progress) || 0))}%`;
  }

  renderLivePlayers(players);
});

socket.on('roundResults', ({ currentRound, results }) => {
  state.currentRound = currentRound;
  const localPlayer = results.find((player) => player.id === state.playerId);
  if (localPlayer) {
    state.totalScore = Number(localPlayer.totalScore || 0);
    elements.scoreValue.textContent = String(state.totalScore);
  }

  elements.countdownBanner.textContent = 'Round complete';
  elements.typingInput.disabled = true;
  state.typingLocked = true;
  renderResults(results, currentRound, state.isHost);
});

socket.on('newHost', ({ hostId }) => {
  state.hostId = hostId;
  state.isHost = hostId === state.playerId;
  setStatus(state.isHost ? 'You are now the host.' : 'A new host has joined the room.');
});

socket.on('gameComplete', ({ leaderboard }) => {
  state.currentRound = 3;
  renderFinalLeaderboard(leaderboard);
  elements.countdownBanner.textContent = 'Complete';
  elements.typingInput.disabled = true;
  state.typingLocked = true;
});

socket.on('connectionStatus', ({ connected, message }) => {
  if (connected) {
    setStatus(message || 'Connected.');
  }
});

elements.createRoomBtn.addEventListener('click', handleCreateRoom);
elements.joinRoomBtn.addEventListener('click', handleJoinRoom);
elements.startGameBtn.addEventListener('click', () => {
  socket.emit('startGame');
});
elements.nextRoundBtn.addEventListener('click', () => {
  socket.emit('nextRound');
});
elements.typingInput.addEventListener('input', handleTyping);
elements.playAgainBtn.addEventListener('click', () => {
  window.location.reload();
});

elements.roomCodeInput.addEventListener('input', () => {
  elements.roomCodeInput.value = elements.roomCodeInput.value.toUpperCase().slice(0, 4);
});

showScreen('lobby');
resetTypingInput();
