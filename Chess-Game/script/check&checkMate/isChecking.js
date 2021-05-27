

import { pieces } from "../data/pieces.js";
import { allPossibleMoves } from "../helpers/allPossibleMoves.js";





export const isChecking = ( turn, squareOfPieceAfterMoving ) => {

    const { position } = pieces.find( ({ color, name }) => color !== turn && name === 'king' ); 

    const attackingPieces = pieces.filter( piece => piece.color === turn );

    const { possibleMoves } = allPossibleMoves( attackingPieces, squareOfPieceAfterMoving );

    // check
    if ( possibleMoves.includes( position ) ) {

        return true;
    }
}