import { pieces } from "../data/pieces.js";
import { allPossibleMoves } from "../helpers/allPossibleMoves.js";
import { squares } from "../main.js";



export const check = (
    turn,
    pieceToMoveInArr,
    squareOfPieceBeforeMoving,
    squareOfPieceAfterMoving,
) => {


    // solo si no es rey capturamos el casillero antes de mover,
    // porque la posicion del rey se cambia en main.js linea 200
    // entonces al haberse ya cambiado ni va a ser el casillero antes de moverse obviamente.
    if ( pieceToMoveInArr.name !== 'king' ) {
        squareOfPieceBeforeMoving = squares.find( ({dataset}) => dataset.square === pieceToMoveInArr.position );
    }

    squareOfPieceBeforeMoving.innerHTML = "";


    const filteredPieces = pieces.filter( piece => piece.color !== turn );
        // king position
    const { position } = pieces.find( piece => piece.color === turn && piece.name === 'king' );


    const { isInCheck } = allPossibleMoves( filteredPieces, squareOfPieceAfterMoving, position );

    return isInCheck;
}