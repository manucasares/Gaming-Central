import { letters, numbers, squares, enPassant } from "../main.js";
import { bishop } from "../pieceAlgorithms/bishop.js";
import { knight } from "../pieceAlgorithms/knight.js";
import { pawn } from "../pieceAlgorithms/pawn/pawn.js";
import { rook } from "../pieceAlgorithms/rook.js";


export const oppositePossibleMoves = ( filteredPieces, kingFile ) => {

    let possibleMovesT = [];

    let canCastleLeft = true;
    let canCastleRight = true;

    filteredPieces.forEach( piece => {

        switch ( piece.name ) {
            
            case 'bishop':
                possibleMovesT = possibleMovesT.concat( bishop( piece, numbers, letters, squares ));
                break;
            case 'rook':
                possibleMovesT = possibleMovesT.concat( rook( piece, numbers, letters, squares ));
                break;
            case 'queen':
                possibleMovesT = possibleMovesT.concat( [ ...rook( piece, numbers, letters, squares ), ...bishop( piece, numbers, letters, squares ) ] );
                break;
            case 'knight':
                possibleMovesT = possibleMovesT.concat( knight( piece, letters ) );
                break;
            case 'pawn':
                possibleMovesT = possibleMovesT.concat( pawn( piece, letters, squares, enPassant ) );
                break;                  
        }

        
    })
    
    if ( possibleMovesT.includes( `D${ kingFile }`) ) {
        canCastleLeft = false;
    }

    if ( possibleMovesT.includes( `F${ kingFile }`) ) {
        canCastleRight = false;
    }

    return [ canCastleLeft, canCastleRight ];
}