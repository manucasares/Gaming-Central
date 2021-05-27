import { pieces } from "../data/pieces.js";


export const filterPiecesByColor = ( color ) => {
    return pieces.filter( piece => piece.color === color);
}