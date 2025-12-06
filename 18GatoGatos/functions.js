document.addEventListener('DOMContentLoaded', () => {
	const reglas = [
		'El juego se juega en un tablero de 3x3 celdas, las cuales contienen subtableros de 3x3.',
		'Dos jugadores se turnan para colocar sus marcas (X y O) en las subceldas del tablero, una vez por turno.',
		'El objetivo es ganar subtableros formando una línea de 3 marcas en dirección horizontal, vertical o diagonal.',
		'El primer jugador que gane 3 subtableros en línea gana el juego.',
	];

	const lista = document.getElementById('lista_reglas');
	if (!lista) return;
	lista.innerHTML = '';
	reglas.forEach((texto) => {
		const li = document.createElement('li');
		li.textContent = texto;
		lista.appendChild(li);
	});
});

const subtablero0 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const subtablero1 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const subtablero2 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const subtablero3 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const subtablero4 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const subtablero5 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const subtablero6 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const subtablero7 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const subtablero8 = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const tablero = [[subtablero0, subtablero1, subtablero2], [subtablero3, subtablero4, subtablero5], [subtablero6, subtablero7, subtablero8]];

function marcarCelda(tableroIndex, fila, columna, jugador) {
	const subtablero = tablero[Math.floor(tableroIndex / 3)][tableroIndex % 3];
	if (subtablero[fila][columna] === '-') {
		subtablero[fila][columna] = jugador;
		const celdaId = `subcelda_${tableroIndex}${fila * 3 + columna}`;
		const celda = document.getElementById(celdaId);
		if (celda) {
			const img = document.createElement('img');
			img.src = jugador === 'x' ? './img/x.png' : './img/o.png';
			img.alt = jugador === 'x' ? 'Cruz' : 'Círculo';
			celda.appendChild(img);
		}
		return true;
	}
	return false;
}

function verificarGanadorSubtablero(subtablero) {
	for (let i = 0; i < 3; i++) {
		if (subtablero[i][0] !== '-' && subtablero[i][0] === subtablero[i][1] && subtablero[i][1] === subtablero[i][2]) {
			return subtablero[i][0];
		}
	}

	for (let j = 0; j < 3; j++) {
		if (subtablero[0][j] !== '-' && subtablero[0][j] === subtablero[1][j] && subtablero[1][j] === subtablero[2][j]) {
			return subtablero[0][j];
		}
	}

	if (subtablero[0][0] !== '-' && subtablero[0][0] === subtablero[1][1] && subtablero[1][1] === subtablero[2][2]) {
		return subtablero[0][0];
	}

	if (subtablero[0][2] !== '-' && subtablero[0][2] === subtablero[1][1] && subtablero[1][1] === subtablero[2][0]) {
		return subtablero[0][2];
	}

	return null;
}

const ganadoresSubtableros = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

function actualizarGanadoresSubtableros() {
	for (let i = 0; i < 9; i++) {
		const filaSubt = Math.floor(i / 3);
		const colSubt = i % 3;
		const subtablero = tablero[filaSubt][colSubt];
		const ganador = verificarGanadorSubtablero(subtablero);
		if (ganador) {
			ganadoresSubtableros[i] = ganador;
		}
	}
}

function verificarGanadorGeneral() {
	//Verificar filas
	for (let i = 0; i < 3; i++) {
		if (ganadoresSubtableros[i * 3] !== '-' &&
			ganadoresSubtableros[i * 3] === ganadoresSubtableros[i * 3 + 1] &&
			ganadoresSubtableros[i * 3 + 1] === ganadoresSubtableros[i * 3 + 2]) {
			return ganadoresSubtableros[i * 3];
		}
	}

	for (let j = 0; j < 3; j++) {
		if (ganadoresSubtableros[j] !== '-' &&
			ganadoresSubtableros[j] === ganadoresSubtableros[j + 3] &&
			ganadoresSubtableros[j + 3] === ganadoresSubtableros[j + 6]) {
			return ganadoresSubtableros[j];
		}
	}

	if (ganadoresSubtableros[0] !== '-' &&
		ganadoresSubtableros[0] === ganadoresSubtableros[4] &&
		ganadoresSubtableros[4] === ganadoresSubtableros[8]) {
		return ganadoresSubtableros[0];
	}

	if (ganadoresSubtableros[2] !== '-' &&
		ganadoresSubtableros[2] === ganadoresSubtableros[4] &&
		ganadoresSubtableros[4] === ganadoresSubtableros[6]) {
		return ganadoresSubtableros[2];
	}

	return null;
}

function marcarSubtableroComoGanado(tableroIndex, ganador) {
	const celdaPadre = document.getElementById(`celda_${tableroIndex}`);
	if (celdaPadre) {
		celdaPadre.classList.add('subtablero-ganado', ganador === 'x' ? 'ganado-x' : 'ganado-o');
		celdaPadre.querySelectorAll('.subcelda').forEach((sub) => sub.classList.add('bloqueado'));
	}
}

function actualizarGanadorDeSubtablero(tableroIndex) {
	const filaSubt = Math.floor(tableroIndex / 3);
	const colSubt = tableroIndex % 3;
	const subtablero = tablero[filaSubt][colSubt];
	const ganador = verificarGanadorSubtablero(subtablero);

	if (ganador && ganadoresSubtableros[tableroIndex] === '-') {
		ganadoresSubtableros[tableroIndex] = ganador;
		marcarSubtableroComoGanado(tableroIndex, ganador);
	}
}

let jugadorActual = 'x';
let puntuacion = { x: 0, o: 0 };
let juegoTerminado = false;
let playerXName = '';
let playerOName = '';
let sessionActive = false;

function cambiarTurno() {
	jugadorActual = jugadorActual === 'x' ? 'o' : 'x';
	actualizarTurno();
}

function actualizarTurno() {
	const turnoDiv = document.getElementById('turno');
	if (turnoDiv) {
		turnoDiv.textContent = jugadorActual === 'x' ? 'Jugador X' : 'Jugador O';
		turnoDiv.style.color = jugadorActual === 'x' ? '#FF6B6B' : '#4ECDC4';
	}
}

function actualizarMarcador() {
	const scoreboardDiv = document.getElementById('scoreboard');
	if (scoreboardDiv) {
		const xName = playerXName || 'X';
		const oName = playerOName || 'O';
		scoreboardDiv.textContent = `${xName}: ${puntuacion.x} | ${oName}: ${puntuacion.o}`;
		scoreboardDiv.style.color = '#F5F5F5';
		scoreboardDiv.style.fontWeight = 'bold';
	}

	if (sessionActive && typeof updateScoreInFirebase === 'function') {
		updateScoreInFirebase(puntuacion.x, puntuacion.o);
	}
}

function handleCeldaClick(event) {
	if (juegoTerminado) {
		alert('¡El juego ha terminado!');
		return;
	}

	const celda = event.target.closest('.subcelda');
	if (!celda) return;

	const id = celda.id.replace('subcelda_', '');
	const tableroIndex = parseInt(id.charAt(0), 10);
	const cellIndex = parseInt(id.slice(1), 10);
	const fila = Math.floor(cellIndex / 3);
	const columna = cellIndex % 3;

	if (Number.isNaN(tableroIndex) || Number.isNaN(cellIndex)) return;

	if (marcarCelda(tableroIndex, fila, columna, jugadorActual)) {
		actualizarGanadorDeSubtablero(tableroIndex);

		const ganador = verificarGanadorGeneral();
		if (ganador) {
			puntuacion[ganador]++;
			actualizarMarcador();
			juegoTerminado = true;

			if (sessionActive && typeof saveGameToFirebase === 'function') {
				saveGameToFirebase(ganador);
			}

			if (sessionActive && typeof updateLeaderboard === 'function') {
				const winnerName = ganador === 'x' ? playerXName : playerOName;
				const loserName = ganador === 'x' ? playerOName : playerXName;
				if (winnerName) updateLeaderboard(winnerName, 'win');
				if (loserName) updateLeaderboard(loserName, 'loss');
			}

			setTimeout(() => {
				const winnerName = ganador === 'x' ? (playerXName || 'Jugador X') : (playerOName || 'Jugador O');
				alert(`¡${winnerName} ha ganado el juego!`);
				if (typeof loadLeaderboard === 'function') {
					loadLeaderboard();
				}
			}, 300);
			return;
		}

		cambiarTurno();
	} else {
		alert('Esa celda ya está ocupada');
	}
}

function reiniciarJuego() {
	for (let i = 0; i < 9; i++) {
		const filaSubt = Math.floor(i / 3);
		const colSubt = i % 3;
		const subtablero = tablero[filaSubt][colSubt];
		for (let f = 0; f < 3; f++) {
			for (let c = 0; c < 3; c++) {
				subtablero[f][c] = '-';
			}
		}
	}

	for (let i = 0; i < ganadoresSubtableros.length; i++) {
		ganadoresSubtableros[i] = '-';
	}

	jugadorActual = 'x';
	juegoTerminado = false;

	const subceldas = document.querySelectorAll('.subcelda');
	subceldas.forEach(subcelda => {
		subcelda.innerHTML = '';
		subcelda.classList.remove('bloqueado');
	});

	const celdas = document.querySelectorAll('.celda');
	celdas.forEach((celda) => {
		celda.classList.remove('subtablero-ganado', 'ganado-x', 'ganado-o');
	});

	actualizarTurno();
}

function iniciarJuego() {
	actualizarMarcador();
	actualizarTurno();

	const subceldas = document.querySelectorAll('.subcelda');
	subceldas.forEach(subcelda => {
		subcelda.addEventListener('click', handleCeldaClick);
	});

	const btnReiniciar = document.getElementById('btn_reiniciar');
	if (btnReiniciar) {
		btnReiniciar.addEventListener('click', reiniciarJuego);
	}

	const btnNuevaSesion = document.getElementById('btn_nueva_sesion');
	if (btnNuevaSesion) {
		btnNuevaSesion.addEventListener('click', iniciarNuevaSesion);
	}
}

function iniciarNuevaSesion() {
	const inputPlayerX = document.getElementById('player_x');
	const inputPlayerO = document.getElementById('player_o');

	playerXName = inputPlayerX ? inputPlayerX.value.trim() : '';
	playerOName = inputPlayerO ? inputPlayerO.value.trim() : '';

	if (!playerXName || !playerOName) {
		alert('Por favor, ingresa los nombres de ambos jugadores');
		return;
	}

	if (playerXName === playerOName) {
		alert('Los nombres de los jugadores deben ser diferentes');
		return;
	}

	if (typeof createNewSession === 'function') {
		createNewSession(playerXName, playerOName);
		sessionActive = true;

		puntuacion = { x: 0, o: 0 };
		actualizarMarcador();
		reiniciarJuego();

		alert(`Nueva sesión iniciada: ${playerXName} vs ${playerOName}`);

		if (inputPlayerX) inputPlayerX.disabled = true;
		if (inputPlayerO) inputPlayerO.disabled = true;
	} else {
		alert('Error: Firebase no está configurado correctamente');
	}
}

document.addEventListener('DOMContentLoaded', iniciarJuego);
