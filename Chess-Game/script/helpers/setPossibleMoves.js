import { pieces } from "../data/pieces.js";
import { rook } from "../pieceAlgorithms/rook.js";
import { bishop } from "../pieceAlgorithms/bishop.js";
import { knight } from "../pieceAlgorithms/knight.js";
import { pawn } from "../pieceAlgorithms/pawn/pawn.js";
import { king } from "../pieceAlgorithms/king/king.js";





export const setPossibleMoves = ( target ) => {

    const piece = pieces.find( piece => piece.id === target.id );

    switch ( piece.name ) {

        case 'rook':
            
            return rook( piece );

        case 'bishop':

            return bishop( piece );

        case 'queen':

            // la reina no es más que los movimientos de la torre y el alfil combinados
            return [ ...rook( piece ), ...bishop( piece ) ];

        case 'knight':

            return knight( piece );
        
        case 'pawn':

            return pawn( piece );

        case 'king':
            return king( piece );
    }
}