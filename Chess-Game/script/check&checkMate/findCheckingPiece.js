import { bishop } from "../pieceAlgorithms/bishop.js";
import { king } from "../pieceAlgorithms/king/king.js";
import { knight } from "../pieceAlgorithms/knight.js";
import { pawn } from "../pieceAlgorithms/pawn/pawn.js";
import { rook } from "../pieceAlgorithms/rook.js";


export const findCheckingPiece = ( attackingPieces, position ) => {
    
    let checkingPiece;
    
    attackingPieces.forEach( piece => {
        
        let possibleMoves = [];

        switch ( piece.name ) {
            
            case 'bishop':
                possibleMoves = bishop( piece );
                break;
            case 'rook':
                possibleMoves = rook( piece );
                break;
            case 'queen':
                possibleMoves = [ ...rook( piece ), ...bishop( piece ) ] ;
                break;
            case 'knight':
                possibleMoves = knight( piece ) ;
                break;
            case 'pawn':
                possibleMoves = pawn( piece ) ;
                break;
            case 'king':
                possibleMoves = king( piece ) ;
                break;            
        }
      
        
        if ( possibleMoves.includes(position) ) {
            checkingPiece = piece;
            return;
        }
    });
    
    return checkingPiece;
}