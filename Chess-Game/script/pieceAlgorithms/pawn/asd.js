export const moveBlackPawn = ( position ) => {

    const possibleMoves = [];
    const initialFile = '7';

    let letterPosition = position[0];
    let numberPosition = position[1];
    const letterIndex = letters.findIndex( letter => letter === letterPosition );

    let diagonalLeft;
    let diagonalRight;

    let forwardSquareOccupied = false;
    const forwardPosition = `${ letterPosition }${ +numberPosition - 1 }`;

    const forwardSquare = squares.find( ({dataset}) => dataset.square === forwardPosition );

    // definimos diagonales
    diagonalLeft = `${ letters[ letterIndex - 1 ] }${ +numberPosition - 1 }`;
    diagonalRight = `${ letters[ letterIndex + 1 ] }${ +numberPosition - 1 }`;
    

    // un paso
    if ( forwardSquare && !forwardSquare.children[0] ) {
        possibleMoves.push( `${ letterPosition }${ +numberPosition - 1 }` );
    } else {
        forwardSquareOccupied = true;
    }


    const diagonals = [ diagonalLeft, diagonalRight ];

    diagonals.forEach( diagonal => {

        const diagonalSquare = squares.find( ({dataset}) => dataset.square === diagonal );

        if ( !diagonalSquare ) {
            return;
        }

        // si hay una pieza significa que puede comer en diagonal
        if ( diagonalSquare.children[0] ) {
            possibleMoves.push(diagonal);
        }
    });

    // dos pasos
    if (  !forwardSquareOccupied && numberPosition === initialFile ) {

        const twoStepsPosition = `${ letterPosition }${ +numberPosition - 2 }`;

        const twoStepsSquare = squares.find( ({dataset}) => dataset.square === twoStepsPosition );

        // si la casilla de 2 pasos adelante no esta ocupada
        if ( !twoStepsSquare.children[0] ) {
            possibleMoves.push( `${ letterPosition }${ +numberPosition - 2 }` );
        }
    }

    return possibleMoves;
}