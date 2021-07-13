import { pieces } from '../data/pieces.js';
import { checkForWin, gameOverUi } from './game-over.js';
import { findPieceByPosition, findPieceIndex, getSquaresIndexed } from './helpers.js';
import { main } from './main.js';
import { getPossibleMoves } from './moves.js';
import { changeToBlackTurn, changeTurn } from './turns.js';
import { removeActiveBorder } from './ui.js';


let activePiece = null;

export function setPieces ( squares ) {
    
    // Indexamos las piezas para poder acceder por su posición fácilmente
    const squaresIndexed = getSquaresIndexed( squares );

    // Por cada square con pieza ponemos atributos y clases
    pieces.forEach( piece => {
        squaresIndexed[ piece.square ].classList.add( `piece` );
        squaresIndexed[ piece.square ].classList.add( `piece-${ piece.team }` );
        squaresIndexed[ piece.square ].setAttribute( 'data-occupied', 'true' );

        // Si la pieza está coronada
        if ( piece.castled ) {
            squaresIndexed[ piece.square ].classList.add( `is-castled` );
        }
    });
}

export function setActivePiece ( e ) {
    
    // Quitamos borde amarillo a la piece active pasada, si la hay...
    if ( activePiece ) {
        activePiece.classList.remove( 'active' );
    }
    
    const piece = e.target;

    // Seteamos active piece
    activePiece = piece;

    // Agregamos borde amarillo
    piece.classList.add( 'active' );


}

export function movePiece ( e ) {
    
    // Si hay una pieza seleccionada
    if ( activePiece ) {

        const position = activePiece.dataset.position;
        const landingPosition = e.target.dataset.position;

        // Buscamos pieza a mover
        const pieceToMove = findPieceByPosition( pieces, position );

        // Calculamos posibles movimientos
        const moves = getPossibleMoves( pieceToMove );
            
        // Si el movimiento no es legal retornamos
        if ( !moves.includes( landingPosition ) ) {
            return;
        }

        // La movemos
        pieceToMove.square = landingPosition;

        // Chequeamos por castling
        if ( isCastling( landingPosition ) ) {
            castlePiece( pieceToMove );
        }

        // Chequeamos si está comiendo
        if ( isEating( position, landingPosition ) ) {
            eatPiece( position, landingPosition );

            // Si no puede seguir comiendo cambiamos el turno
            const canEat = !!getPossibleMoves( pieceToMove, { onlyEatingMoves: true } ).length;
            if ( !canEat ) {
                changeTurn();
            }
            
        } else {
            // Si no comió estamos seguros de que tenemos que cambiar el turno
            changeTurn();
        }
            
        // Active piece
        activePiece = null;
        removeActiveBorder();

        // Chequeamos por win
        if ( checkForWin( pieces ) ) {
            console.log('entra')
            // Game over UI
            gameOverUi();

            // Cambiamos turno a negras
            changeToBlackTurn();
            
            // Hacemos un último render
            main();
            return;
        }


        main();
    }
}

function isEating ( position, landingSquare ) {
    // Si la diferencia de row entre position y el landingSquare es 2, está comiendo
    return Math.abs( position[0] - landingSquare[0] ) === 2;
}

function eatPiece ( initialPosition, landingPosition ) {
    // Para saber el square de la pieza a comer haremos un promedio de la row y la column
    // tanto de la position como del landinSquare
    const row = ( +initialPosition[ 0 ] + +landingPosition[ 0 ] ) / 2;
    const column = ( +initialPosition[ 1 ] + +landingPosition[ 1 ] ) / 2;
    const eatenPiecePosition = `${ row }${ column }`;

    const eatenPiece = findPieceByPosition( pieces, eatenPiecePosition );

    // Buscamos index para borrarla con splice a continuación
    // const eatenPieceIdx = pieces.findIndex( p => p.id === eatenPiece.id );
    const eatenPieceIdx = findPieceIndex( pieces, eatenPiece.id );

    pieces.splice( eatenPieceIdx, 1 );
}

function isCastling ( landingPosition ) {
    // Si la row es la última sin importar el turno significa que está coronándose
    return landingPosition[ 0 ] === '7' || landingPosition[ 0 ] === '0';
}

function castlePiece ( pieceToCastle ) {
    
    const pieceIndex = findPieceIndex( pieces, pieceToCastle.id );
    pieces[ pieceIndex ].castled = true;
}
