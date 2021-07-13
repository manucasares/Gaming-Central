import { setActivePiece, movePiece } from './pieces.js';

export function listeners ( squares, turn ) {
    
    // Remove
    removeListeners( squares );

    // Add
    addPieceListeners( squares, turn );
    addSquareListener( squares );
}

function removeListeners ( squares ) {
    squares.forEach( square => {
        square.removeEventListener( 'click', setActivePiece );
        square.removeEventListener( 'click', movePiece );
    });
}


function addPieceListeners ( squares, turn ) {
    
    const occupiedSquares = squares.filter( square => square.dataset.occupied );
    const turnOccupiedSquares = occupiedSquares.filter( square => square.classList.contains( `piece-${ turn }` ) );

    turnOccupiedSquares.forEach( square => {
        square.addEventListener( 'click', setActivePiece )
    });
}

function addSquareListener ( squares ) {
    const emptySquares = squares.filter( square => !square.dataset.occupied );

    emptySquares.forEach( square => {
        square.addEventListener( 'click', movePiece );
    });
}