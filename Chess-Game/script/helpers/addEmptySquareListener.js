import { movePiece, squares } from "../main.js";


export const addEmptySquareListener = () => {

    const emptySquares = squares.filter( square => !square.children.length > 0 );
    const notEmptySquares = squares.filter( square => square.children.length > 0 );


    notEmptySquares.forEach( notEmptySquare => {
        notEmptySquare.removeEventListener( 'click', movePiece );
    })

    emptySquares.forEach( emptySquare => {
        emptySquare.addEventListener( 'click', movePiece );
    })
}