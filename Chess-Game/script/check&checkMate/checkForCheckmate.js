import { pieces } from "../data/pieces.js";
import { king } from "../pieceAlgorithms/king/king.js";
import { allPossibleMoves } from "../helpers/allPossibleMoves.js";
import { isCheckingPieceEatable } from "./isCheckingPieceEatable.js";
import { isBloqueable } from "./isBloqueable.js";


export const checkForCheckmate = ( turn, enPassant, squareOfPieceAfterMoving ) => {
    // hay 3 maneras de impedir un checkmate

    // 1- moviendo el rey a una casilla segura.
    // 2- comiendo la pieza que te hace el jaque.
    // 3- bloqueando la pieza que te hace el jaque.

    const attackingPieces = pieces.filter( piece => piece.color === turn );
    const defendingPieces = pieces.filter( piece => piece.color !== turn );
    
    const { possibleMoves: attackingPossibleMoves } = allPossibleMoves( attackingPieces, squareOfPieceAfterMoving, false, true );
    const { possibleMoves: defendingPossibleMoves } = allPossibleMoves( defendingPieces, squareOfPieceAfterMoving, false, false, true );


        // dentro de los safeSquares está si el rey puede comer o no
        // a la pieza que le hace jaque
    // ================================================ //
        // 1- moviendo el rey a una casilla segura.

    // kingPosition
    const oppositeKing = pieces.find( ({ name, color }) => name === 'king' && color !== turn );
    const kingMoves = king( oppositeKing );
    const safeSquares = kingMoves.filter( move => !attackingPossibleMoves.includes(move) );
   
    if ( safeSquares.length ) {
        return;
    }
    

    // ================================================ //


    // Si es double check y no hay safeSquares es jaquemate automaticamente
    
    const regexKingPosition = new RegExp( oppositeKing.position, 'gi' );
    if ( attackingPossibleMoves.join(' ').match( regexKingPosition ).length === 2 ) {

        return true;
    }
    

    // ================================================ //

        // 2- comiendo la pieza que hace el jaque.

    // esta constante la hago porque no quiero que se modifiquen las kingMoves
    // al pasar la misma referencia a isCheckingPieceEatable.js
    const kingMovesCopy = kingMoves.slice();


    const [ isEatable, checkingPiece ] = isCheckingPieceEatable( attackingPossibleMoves, attackingPieces, defendingPossibleMoves, oppositeKing, kingMovesCopy );


    if ( isEatable ) {
        return;
    }


    // ================================================ //

        // 3- bloqueando la pieza que te hace el jaque.

    const { position: checkingPiecePosition, name } = checkingPiece;
    const { position: kingPosition } = oppositeKing;


    // si la checking piece esta dentro de las kingMoves significa que no es bloqueable y que es checkmate
    // el caballo tampoco es bloqueable así que sería jaquemate automáticamente
    if ( kingMoves.includes( checkingPiecePosition ) || name === 'knight' ) {
        return true;
    }
    

    if ( isBloqueable( checkingPiecePosition, defendingPossibleMoves, kingPosition ) ) {
        // es bloqueable
        return;
    }

    return true;
}