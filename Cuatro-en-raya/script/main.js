import { createBoard } from "./ui/createBoard.js";
import { checkForWin } from "./helpers/checkForWin.js";
import { fillSlot } from "./helpers/fillSlot.js";
import { playAgain } from "./helpers/playAgain.js";


// Creamos el tablero
createBoard();

// Nodos
export const slots = [ ...document.getElementsByClassName( 'slot' ) ];
const turn = document.getElementById( 'turn' );
const winner_window = document.getElementById( 'winner_window' );
const winner_player = document.getElementById( 'winner_player' );
const play_again = document.getElementById( 'play_again' );

// Variables
let turnRed = true;
turn.innerHTML = `Red's turn`;



// Indexamos los slots así accedemos más fácilmente
export const indexed = slots.reduce( ( acc, el ) => ({
    ...acc,
    [ el.dataset.position ] : el
}), {} );

// Agregamos event listener al play_again btn
play_again.addEventListener( 'click', playAgain );


// Agregamos listener a los slots
slots.forEach( slot => slot.addEventListener( 'click', ( e ) => {

    // Llenamos el slot
    const slotFilledPos = fillSlot( e.target, turnRed );

    if ( !slotFilledPos ) {
        return;
    }

    // Chequeamos por win
    const win = checkForWin( slotFilledPos, turn.textContent );

    if ( win ) {
        winner_window.classList.add( 'show' );
        winner_player.innerHTML = `${ turnRed ? 'Red' : 'Blue' } won!`;

        // Sacamos event listeners a los slots
        slots.forEach( slot => slot.classList.add( 'game_finished' ) );

        // Cambiamos el turno a rojo
        turnRed = true;
        turn.innerHTML = `Red's turn`
        
        return;
    }

    // Cambiamos turno
    turnRed = !turnRed;
    turn.innerHTML = `${ turnRed ? 'Red' : 'Blue' }'s turn`

}));


