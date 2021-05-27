import { letters, numbers, squares } from "../main.js";


const move = ( direction, possibleMoves, piece ) => {

    let { position } = piece;
    let currentSquare;

    let letterPosition = position[0];
    let numberPosition = position[1];

    const splitDirection = direction.split('-');
    const verticalDirection = splitDirection[0];
    const horizontalDirection = splitDirection[1];

    // siempre que es up sube numero
    // siempre que es down baja numero
    const signChangerVertical = ( verticalDirection === 'up' ) ? 1 : -1;

    // siempre que es left baja letra
    // siempre que es right sube letra
    const signChangerHorizontal = ( horizontalDirection === 'left' ) ?  -1 : 1;

    do {
        
        let letterIndex = letters.findIndex( letter => position[0] === letter );
        
        numberPosition = +numberPosition + signChangerVertical;

        letterPosition = letters[ letterIndex + signChangerHorizontal ]

    
        if ( !numbers.includes( `${numberPosition}` ) ) {
            break;
        }

        // si la letra de la posicion no está en el arreglo de letras nos salimos
        if (  !letterPosition ) {
            break;
        }

        position = `${ letterPosition }${ numberPosition }`;
 
        possibleMoves.push(position);

        currentSquare = squares.find( ({dataset}) => dataset.square === position );
        
        if ( !currentSquare ) break;

    } while ( !currentSquare.children[0] );
}

export const bishop = ( piece ) => {

    const possibleMoves = [];

    move( 'up-left', possibleMoves, piece );
    move( 'up-right', possibleMoves, piece );
    move( 'down-left', possibleMoves, piece );
    move( 'down-right', possibleMoves, piece );

    return possibleMoves;
}