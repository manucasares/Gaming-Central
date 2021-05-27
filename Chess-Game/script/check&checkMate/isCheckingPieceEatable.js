import { findCheckingPiece } from "../check&checkMate/findCheckingPiece.js";



export const isCheckingPieceEatable = (
    attackingPossibleMoves,
    attackingPieces,
    defendingPossibleMoves,
    oppositeKing,
    kingMoves
    ) => {


    let checkingPiece = findCheckingPiece( attackingPieces, oppositeKing.position );
    const { position: checkingPiecePosition } = checkingPiece;

    let isEatable = false;


    // si hay mas de una pieza que puede comer a la checkingPiece

    const checkingPosRegex = new RegExp( checkingPiecePosition , 'gi' );

    if ( defendingPossibleMoves.join('').match(checkingPosRegex)?.length > 1 ) {
        
        console.log('puede ser comida por una pieza !== al rey');
        isEatable = true;
        return [ isEatable ];
    }


    // Sacamos de defendingPossibleMoves los kingMoves


    
    // defendingPossibleMoves.filter( ( move, i ) => {

    //     if ( kingMoves.includes( move ) ) {
    //         const kingMoveIndex = kingMoves.findIndex( kingMove => kingMove === move );
    //         kingMoves.splice( kingMoveIndex, 1 );
    //         defendingPossibleMoves.splice( i, 1 );
    //     }
    // })

    kingMoves = kingMoves.filter( ( move ) => {
        
        if ( attackingPossibleMoves.includes(move) ) {

            return;
        }
        return move;
    });


    if ( !kingMoves.length ) {
        return [ isEatable, checkingPiece ];
    }


    if ( defendingPossibleMoves.includes( checkingPiecePosition ) ) {
        console.log('puede ser comida');
        isEatable = true;
        return [ isEatable ];
    }

    return [ isEatable, checkingPiece ];
}