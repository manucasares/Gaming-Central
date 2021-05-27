import { pieces } from "../data/pieces.js";


export const checkForRook = ( direction, turn ) => {

    const letterPosition = direction === 'left' ? 'A' : 'H';
    const numberPosition = turn === 'white' ? '1' : '8';

    
    const rook =
        pieces.find( ({ position, hasMoved }) => position === `${ letterPosition }${numberPosition}` && !hasMoved )

    if ( !rook ) {
        return false;
    }

    return true;
}