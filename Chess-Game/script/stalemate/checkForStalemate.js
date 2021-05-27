import { pieces } from "../data/pieces.js";
import { finishGame } from "../finish-game/finishGame.js";
import { allPossibleMoves } from "../helpers/allPossibleMoves.js";
import { king } from "../pieceAlgorithms/king/king.js";


export const checkForStalemate = ( turn, squareOfPieceAfterMoving ) => {

    // 1- que el rey defendiendo no tenga safeSquares
    // 2- limpiar movimientos cuyas casillas finales tengan piezas del mismo color


    const attackingPieces = pieces.filter( piece => piece.color === turn );
    const defendingPieces = pieces.filter( piece => piece.color !== turn );

    const { possibleMoves: attackingPossibleMoves } = allPossibleMoves( attackingPieces, squareOfPieceAfterMoving, false, true );
    const { possibleMoves: defendingPossibleMoves } = allPossibleMoves( defendingPieces, squareOfPieceAfterMoving, false, false, true );


    // 1) que el rey defendiendo no tenga safeSquares
    
    const oppositeKing = pieces.find( ({ name, color }) => name === 'king' && color !== turn );
    const kingMoves = king( oppositeKing );
    const safeSquares = kingMoves.filter( move => !attackingPossibleMoves.includes(move) );


    // si hay safeSquares ya retornamos
    if ( safeSquares.length ) {
        return;
    }

    // 2- limpiar movimientos cuyas casillas finales tengan piezas del mismo color

    const squaresOccupiedByDefender = defendingPieces.map( piece => piece.position );

    const areLegalMoves = defendingPossibleMoves.some( move => !squaresOccupiedByDefender.includes( move ) );

    if ( !areLegalMoves ) {

        finishGame( 'Draw!' );
    }   
}