
import { pieces } from '../data/pieces.js';


export const eatEnPassant = ( landingSquare, turn ) => {


    const signChanger = turn === 'white' ? -1 : 1;

    const squareOfEatenPiece = `${ landingSquare[0] }${ +landingSquare[1] + signChanger }`;
    

    const pieceToEatIndex = pieces.findIndex( piece => piece.position === squareOfEatenPiece);


    pieces.splice( pieceToEatIndex, 1 );





}