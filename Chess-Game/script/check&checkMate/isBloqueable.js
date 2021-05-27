import { letters } from "../main.js";



export const isBloqueable = ( checkingPiecePosition, defendingPossibleMoves, kingPosition ) => {


    const letterCheckingPosition = checkingPiecePosition[0];
    let numberCheckingPosition = checkingPiecePosition[1];

    const letterKingPosition = kingPosition[0];
    const numberKingPosition = kingPosition[1];

    let checkingLetterIndex = letters.findIndex( letter => letter === letterCheckingPosition );
    const kingLetterIndex = letters.findIndex( letter => letter === letterKingPosition );

    let letterSignChanger;
    let numberSignChanger;

    const middleSquares = [];


    // HORIZONTAL
    if ( numberCheckingPosition === numberKingPosition ) {

        // si es para la derecha hay que ir sumando y sino restando
        letterSignChanger = checkingLetterIndex < kingLetterIndex ? 1 : -1;

        do {

            checkingLetterIndex += letterSignChanger;
            
            const middleSquare = `${ letters[ checkingLetterIndex ] }${ numberKingPosition }`;

            middleSquares.unshift(middleSquare);

        } while ( middleSquares[0] !== kingPosition );
    }


    // VERTICAL
    else if ( letterCheckingPosition === letterKingPosition ) {
        
        // si es para arriba hay que ir sumando y sino restando
        numberSignChanger = numberCheckingPosition < numberKingPosition ? 1 : -1;

        do {

            numberCheckingPosition = +numberCheckingPosition + numberSignChanger;
            
            const middleSquare = `${ letters[ checkingLetterIndex ] }${ numberCheckingPosition }`;

            middleSquares.unshift(middleSquare);

        } while ( middleSquares[0] !== kingPosition );
    }


    // DIAGONALES
    else {

        letterSignChanger = checkingLetterIndex < kingLetterIndex ? 1 : -1;
        numberSignChanger = numberCheckingPosition < numberKingPosition ? 1 : -1;

        do {

            checkingLetterIndex += letterSignChanger;
            numberCheckingPosition = +numberCheckingPosition + numberSignChanger;
            
            const middleSquare = `${ letters[ checkingLetterIndex ] }${ numberCheckingPosition }`;

            middleSquares.unshift(middleSquare);

        } while ( middleSquares[0] !== kingPosition );
    }

    // sacamos el primer elemento del array porque siempre es la posición del rey.
    middleSquares.shift();

    return defendingPossibleMoves.some( move => middleSquares.includes(move) );
}