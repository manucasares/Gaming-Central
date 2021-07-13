import { getOpossiteTurn, getTurn } from './turns.js';

const game_over = document.querySelector( '#game_over' );
const team = document.querySelector( '#team' ); 
const play_again = document.querySelector( '#play_again' );



export function checkForWin ( pieces ) {
    
    const turn = getTurn();

    // Si ya no hay piezas del team opuesto
    return pieces.filter( piece => piece.team === turn ).length === 0;
}

export function gameOverUi () {
    
    const turn = getOpossiteTurn();

    // Sacamos la capacidad de mover piezas
    takeOutPointerEvents();

    // Mostramos la ventana
    game_over.style.display = 'block';

    // Ponemos el equipo ganador Capitalizado
    team.textContent = turn.charAt(0).toUpperCase() + turn.slice(1);

    // Agregamos event listener para jugar de nuevo
    play_again.addEventListener( 'click', ( e ) => {
        location.reload();
    })
}

function takeOutPointerEvents () {
    const squares = [ ...document.querySelectorAll( '.square' ) ];
    squares.forEach(square => {
        square.style.pointerEvents = 'none';
    });
}