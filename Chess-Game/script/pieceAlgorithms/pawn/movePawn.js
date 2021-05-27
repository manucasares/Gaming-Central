import { letters, squares } from '../../main.js';


                            // onlyDiagonals nos sirve para chekear por safeSquares en checkForCheckmate.js
export const movePawn = ( position, color, onlyDiagonals ) => {

    const possibleMoves = [];

    const initialFile = ( color === 'white' ) ? '2' : '7';
    const signChanger = ( color === 'white' ) ? 1 : -1;


    let letterPosition = position[0];
    let numberPosition = position[1];
    const letterIndex = letters.findIndex( letter => letter === letterPosition );


    let diagonalLeft;
    let diagonalRight;


    let forwardSquareOccupied = false;
    const forwardPosition = `${ letterPosition }${ +numberPosition + signChanger }`;

    
    const forwardSquare = squares.find( ({dataset}) => dataset.square === forwardPosition );
    
    // definimos diagonales
    diagonalLeft = `${ letters[ letterIndex - 1 ] }${ +numberPosition + signChanger }`;
    diagonalRight = `${ letters[ letterIndex + 1 ] }${ +numberPosition + signChanger }`;

    // un paso
    // si la casilla de adelante no tiene hijos, puede mover adelante
    if ( forwardSquare && !forwardSquare.children[0] && !onlyDiagonals ) {
        possibleMoves.push( `${ letterPosition }${ +numberPosition + signChanger }` );
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
        if ( diagonalSquare.children[0] || onlyDiagonals ) {
            possibleMoves.push( diagonal );
        }
    });


    // dos pasos
    if ( !forwardSquareOccupied && numberPosition === initialFile && !onlyDiagonals ) {

        const twoStepsPosition = `${ letterPosition }${ +numberPosition + ( signChanger * 2 ) }`;

        const twoStepsSquare = squares.find( ({dataset}) => dataset.square === twoStepsPosition );

        // si la casilla de 2 pasos adelante no esta ocupada
        if ( !twoStepsSquare.children[0] ) {
            possibleMoves.push( `${ letterPosition }${ +numberPosition + ( signChanger * 2 ) }` );
        }
    }

    return possibleMoves;
}