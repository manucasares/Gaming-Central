import { letters, numbers, squares } from "../main.js";



const moveVertical = ( direction, possibleMoves, position ) => {

    let numberPosition = position[1];
    let letterPosition = position[0];
    let currentSquare;

    // variable que va a cambiar de positivo a negativo para no repetir siempre
    // la misma condicion innecesariamente

    const signChanger = ( direction === 'up' ) ? 1 : -1; 

    do {

        numberPosition = +numberPosition + signChanger 

        // si el numero de la posicion no está en el arreglo de número nos salimos
        if ( !numbers.includes( `${numberPosition}` ) ) {
            break;
        }
        
        // cambiamos la position ANTES así la posición de la pieza no está incluida en possibleMoves
        position = `${letterPosition}${numberPosition}`;
        
        possibleMoves.push(position);
        
        currentSquare = squares.find( ({dataset}) => dataset.square === position );

        if ( !currentSquare ) break;

    } while ( !currentSquare.children[0] );
}


const moveHorizontal = ( direction, possibleMoves, position ) => {

    let letterPosition = position[0];
    let currentSquare;
    
    // variable que va a cambiar de positivo a negativo para no repetir siempre
    // la misma condicion innecesariamente
    const signChanger = ( direction === 'left' ) ? -1 : 1; 


    do {
        
        let letterIndex = letters.findIndex( letter => position[0] === letter );


        let incremOrDecrem = letterIndex + signChanger; 


        letterPosition = letters[ incremOrDecrem ];
              

        // si la letra de la posicion no está en el arreglo de letras nos salimos
        if ( !letters.includes( `${ position[0] }` ) || !letterPosition ) {
            break;
        }
        
        // cambiamos la position ANTES así la posición de la pieza no está incluida en possibleMoves
        position = `${ letterPosition }${ position[1] }`
        
        possibleMoves.push(position);
        
        currentSquare = squares.find( ({dataset}) => dataset.square === position );

        if ( !currentSquare ) break;


    } while ( !currentSquare.children[0] );

}


export const rook = ( piece ) => {
    
    const possibleMoves = [];
    let { position } = piece;

    moveVertical("down", possibleMoves, position );
    moveVertical("up", possibleMoves, position );
    moveHorizontal("left", possibleMoves, position );
    moveHorizontal("right", possibleMoves, position );

    return possibleMoves;
};