import { enPassant } from "../../main.js";
import { movePawn } from "./movePawn.js";



export const pawn = ( piece, onlyDiagonals ) => {
    
    const { color, position, specialSquarePassant } = piece;
        
    const possibleMoves = movePawn( position, color, onlyDiagonals );

    if ( enPassant ) {
        possibleMoves.push( specialSquarePassant );
    }

    return possibleMoves;
}