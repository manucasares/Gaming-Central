import { bishop } from "../pieceAlgorithms/bishop.js";
import { king } from "../pieceAlgorithms/king/king.js";
import { knight } from "../pieceAlgorithms/knight.js";
import { pawn } from "../pieceAlgorithms/pawn/pawn.js";
import { rook } from "../pieceAlgorithms/rook.js";

                                                                    
export const allPossibleMoves = (
    filteredPieces,
    squareOfPieceAfterMoving,
    // solo pasar position si se chekea por jaque
    position,
    // parametro para calcular las diagonales del peon solamente
    onlyDiagonals,
    // parametro para NO calcular las moves del rey
    allMovesButKings,
) => {


    let possibleMoves = [];
    let isInCheck = false;


    // removemos y ponemos el nodo porque las funciones de los algoritmos de las piezas analiza en base
    // a los hijos de los squares, y esta es la unica solucion que encontre para cambiar los nodos
    const div = document.createElement( 'div' );
    squareOfPieceAfterMoving.appendChild( div );


    filteredPieces.forEach( piece => {

        switch ( piece.name ) {
            
            case 'bishop':
                possibleMoves = possibleMoves.concat( bishop( piece ));
                break;
            case 'rook':
                possibleMoves = possibleMoves.concat( rook( piece ));
                break;
            case 'queen':
                possibleMoves = possibleMoves.concat( [ ...rook( piece ), ...bishop( piece ) ] );
                break;
            case 'knight':
                possibleMoves = possibleMoves.concat( knight( piece ) );
                break;
            case 'pawn':
                possibleMoves = possibleMoves.concat( pawn( piece, onlyDiagonals ) );
                break;
            case 'king':
                if ( !allMovesButKings ) {
                    possibleMoves = possibleMoves.concat( king( piece ) );
                }
                break;               
        }
                        
        // solo se corta el ciclo si se ha pasado un valor a position
        // y solo se le pasa algo a position cuando estamos chekeando por jaque
        if ( position && possibleMoves.includes( position ) ) {
            squareOfPieceAfterMoving.innerHTML = '';
            isInCheck = true;
            return { isInCheck };
        }
    })
    
    squareOfPieceAfterMoving.innerHTML = '';


    return { isInCheck, possibleMoves };
}