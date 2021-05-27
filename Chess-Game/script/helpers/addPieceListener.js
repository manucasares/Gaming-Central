import { setActivePiece } from '../main.js';
import { setPossibleMoves } from './setPossibleMoves.js';

export const addPieceListener = ( pieces ) => {
    
    pieces.forEach( piece => {
        piece.addEventListener( 'click', setActivePiece );
    });
}
