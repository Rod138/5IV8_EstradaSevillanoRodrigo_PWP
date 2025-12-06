const firebaseConfig = {
    apiKey: "AIzaSyBdU6_ddhDrhiZEeaLtu8o-TB9uqISwI8A",
    authDomain: "pweb-e87d0.firebaseapp.com",
    projectId: "pweb-e87d0",
    storageBucket: "pweb-e87d0.firebasestorage.app",
    messagingSenderId: "323176004456",
    appId: "1:323176004456:web:67bd68fdcf0b99e25f34dd"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const sessionsRef = database.ref('sessions');
const leaderboardRef = database.ref('leaderboard');

let currentSessionId = null;

function generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function createNewSession(playerXName, playerOName) {
    currentSessionId = generateSessionId();
    const sessionData = {
        player_x_name: playerXName || 'Jugador X',
        player_o_name: playerOName || 'Jugador O',
        score_x: 0,
        score_o: 0,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        games: []
    };

    sessionsRef.child(currentSessionId).set(sessionData)
        .then(() => {
            console.log('Nueva sesión creada:', currentSessionId);
        })
        .catch((error) => {
            console.error('Error al crear sesión:', error);
        });

    return currentSessionId;
}

function updateScoreInFirebase(scoreX, scoreO) {
    if (!currentSessionId) {
        console.warn('No hay sesión activa');
        return;
    }

    sessionsRef.child(currentSessionId).update({
        score_x: scoreX,
        score_o: scoreO
    }).catch((error) => {
        console.error('Error al actualizar score:', error);
    });
}

function saveGameToFirebase(winner) {
    if (!currentSessionId) return;

    const gameData = {
        winner: winner,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    sessionsRef.child(currentSessionId).child('games').push(gameData)
        .catch((error) => {
            console.error('Error al guardar juego:', error);
        });
}

function updateLeaderboard(playerName, result) {
    if (!playerName || playerName === 'Jugador X' || playerName === 'Jugador O') return;

    const playerRef = leaderboardRef.child(playerName.replace(/[.#$[\]]/g, '_'));

    playerRef.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            playerRef.update({
                wins: (data.wins || 0) + (result === 'win' ? 1 : 0),
                losses: (data.losses || 0) + (result === 'loss' ? 1 : 0),
                totalGames: (data.totalGames || 0) + 1,
                lastPlayed: firebase.database.ServerValue.TIMESTAMP
            });
        } else {
            playerRef.set({
                name: playerName,
                wins: result === 'win' ? 1 : 0,
                losses: result === 'loss' ? 1 : 0,
                totalGames: 1,
                lastPlayed: firebase.database.ServerValue.TIMESTAMP
            });
        }
    });
}

function loadLeaderboard() {
    const leaderboardContent = document.getElementById('leaderboard-content');
    if (!leaderboardContent) return;

    leaderboardRef.orderByChild('wins').limitToLast(10).once('value', (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            leaderboardContent.innerHTML = '<p>No hay datos disponibles</p>';
            return;
        }

        const players = Object.values(data).sort((a, b) => b.wins - a.wins);

        let html = '<table class="leaderboard-table"><thead><tr><th>#</th><th>Jugador</th><th>Victorias</th><th>Derrotas</th><th>Total</th></tr></thead><tbody>';

        players.forEach((player, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${player.name}</td>
                    <td class="wins">${player.wins}</td>
                    <td class="losses">${player.losses}</td>
                    <td>${player.totalGames}</td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        leaderboardContent.innerHTML = html;
    }).catch((error) => {
        console.error('Error al cargar leaderboard:', error);
        leaderboardContent.innerHTML = '<p>Error al cargar datos</p>';
    });
}

function clearHistory() {
    if (confirm('¿Estás seguro de que quieres limpiar todo el historial? Esta acción no se puede deshacer.')) {
        Promise.all([
            sessionsRef.remove(),
            leaderboardRef.remove()
        ]).then(() => {
            alert('Historial limpiado exitosamente');
            loadLeaderboard();
        }).catch((error) => {
            console.error('Error al limpiar historial:', error);
            alert('Error al limpiar el historial');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboard();

    setInterval(loadLeaderboard, 10000);

    const btnLimpiar = document.getElementById('btn_limpiar_historial');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', clearHistory);
    }
});
