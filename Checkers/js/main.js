import { resetBoard, createBoard } from './board.js';
import { setPieces } from './pieces.js';
import { getTurn } from './turns.js';
import { listeners } from './listeners.js';

// Referencias HTML
const board = document.querySelector( '#board' ); 


const squares = createBoard( board );


export function main () {

    // Obtenemos el turno
    const turn = getTurn();
    
    // Limpiamos el tablero
    resetBoard( squares );

    // Seteamos las piezas
    setPieces( squares );

    // Listeners
    listeners( squares, turn );
}


main();