import { pieces } from "../data/pieces.js";
import { letters } from "../main.js";



export const checkEnPassant = ( position, turn ) => {

    const letterIndex = letters.findIndex( letter => letter === position[0] );
    
    const leftSquarePosition = `${ letters[ letterIndex - 1 ] }${ position[1] }`;
    const rightSquarePosition = `${ letters[ letterIndex + 1 ] }${ position[1] }`;


    //  filtramos los peones que sean del color opuesto y esten en los casilleros de al lado
    const pawns = pieces.filter( ({ position, color, name }) => {
        return (
            position === leftSquarePosition || position === rightSquarePosition &&
            color !== turn && name === 'pawn'
        )
    });



    if ( pawns.length ) {

        const signChanger = turn === 'white' ? -1 : 1;

        const squareToLand = `${position[0]}${ +position[1] + signChanger }`;

        pawns.forEach( pawn => pawn.specialSquarePassant = squareToLand );


        return true;

    } else {
        return false;
    }


}