import { getSquaresIndexed } from './helpers.js';
import { getTurn } from './turns.js';


export function getPossibleMoves ( piece, options = {} ) {

    const turn = getTurn();
    const squares = [ ...document.querySelectorAll( '.square' ) ];
    const squaresIndexed = getSquaresIndexed( squares );
    const board_direction = ( turn === 'black' ) ? -1 : 1;
    

    const forwardSquares = getForwardMoves( piece, squaresIndexed, board_direction );
    const eatingMoves = getEatingMoves( forwardSquares, turn, squaresIndexed, board_direction, piece.castled );

    // Consideramos la opción de retornar solo las eatingMoves
    const moves = options.onlyEatingMoves ? [ ...eatingMoves ] : [ ...forwardSquares, ...eatingMoves ];
    const cleanedMoves = cleanMoves( moves );
    
    // Pasamos de tener un arr de nodes a un arr de strings
    return cleanedMoves.map( move => move.dataset.position );
}

function getForwardMoves ( piece, squares, board_direction ) {
    
    const [ row, column ] = piece.square;
    
    const left_square = squares[ `${ +row + board_direction }${ +column - 1 }` ];
    const right_square = squares[ `${ +row + board_direction }${ +column + 1 }` ];

    // Si la pieza está coronada, agregamos los squares de atrás también
    if ( piece.castled ) {

        const back_left_square = squares[ `${ +row + -board_direction }${ +column - 1 }` ];     
        const back_right_square = squares[ `${ +row + -board_direction }${ +column + 1 }` ];

        return [
            left_square,
            right_square,
            back_left_square,
            back_right_square
        ];
    }
    
    return [ left_square, right_square ];
}

function getEatingMoves ( forwardSquares, turn, squaresIndexed, board_direction, castled ) {

    const [
        left_square,
        right_square,
        back_left_square,
        back_right_square ] = forwardSquares;
    const opossiteTurn = ( turn === 'black' ) ? 'red' : 'black';
    const possibleMoves = [];

    // Si tiene adelante una pieza del equipo opuesto
    if ( hasOponnentInDirection( left_square, opossiteTurn ) ) {
        const [ row, column ] = left_square.dataset.position;
        possibleMoves.push( squaresIndexed[ `${ +row + board_direction }${ +column - 1 }` ] );
    }

    if ( hasOponnentInDirection( right_square, opossiteTurn ) ) {
        const [ row, column ] = right_square.dataset.position;
        possibleMoves.push( squaresIndexed[ `${ +row + board_direction }${ +column + 1 }` ] );
    }

    // Si la pieza está coronada, agregamos los squares de atrás también
    if ( castled ) {
        // Repetimos la misma lógica que arriba, pero con los back_squares
        if ( hasOponnentInDirection( back_left_square, opossiteTurn ) ) {
            const [ row, column ] = back_left_square.dataset.position;
            possibleMoves.push( squaresIndexed[ `${ +row + -board_direction }${ +column - 1 }` ] );
        }
    
        if ( hasOponnentInDirection( back_right_square, opossiteTurn ) ) {
            const [ row, column ] = back_right_square.dataset.position;
            possibleMoves.push( squaresIndexed[ `${ +row + -board_direction }${ +column + 1 }` ] );
        }     
    }

    return possibleMoves;   
}

function hasOponnentInDirection ( square, opossiteTurn ) {
    return  square?.classList.contains( `piece-${ opossiteTurn }` );
}

// Limpiamos las moves que cuyas casillas de destino estén ocupadas
function cleanMoves ( moves ) {
    return moves.filter( move => move && !move.dataset.occupied )
}


