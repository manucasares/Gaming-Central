


export const checkMiddleSquares = ( turn, squares  ) => {

    // [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];

    const kingFile = turn === 'white' ? '1' : '8';

    // position E1

    // LEFT SQUARES D1 C1 B1
    // RIGHT SQUARES F1 G1

    const leftSquares = [ `D${ kingFile }`, `C${ kingFile }`, `B${ kingFile }` ];
    const rightSquares = [ `F${ kingFile }`, `G${ kingFile }` ];


    const leftNodeSquares = squares.filter( ({dataset}) => leftSquares.includes( dataset.square ) );
    const rightNodeSquares = squares.filter( ({dataset}) => rightSquares.includes( dataset.square ) );


    const areOccupiedLeftSquares = leftNodeSquares.some( square => square.children[0] );
    const areOccupiedRightSquares = rightNodeSquares.some( square => square.children[0] );

    return [ areOccupiedLeftSquares, areOccupiedRightSquares ];
}