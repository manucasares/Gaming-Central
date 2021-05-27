import { letters, squares } from "../../main.js";
import { cleanPossibleMoves } from "../../helpers/cleanPossibleMoves.js";
import { oppositePossibleMoves } from "../../castling/oppositePossibleMoves.js";
import { checkForRook } from "../../castling/checkForRook.js";
import { checkMiddleSquares } from "../../castling/checkMiddleSquares.js";
import { pieces } from "../../data/pieces.js";


// CASTLING //
export let isInCheck = false;


export const setIsInCheck = ( newState ) => {
   isInCheck = newState; 
}


export const king = ( piece ) => {

    const { position, color, hasMoved } = piece;

    const kingFile = color === 'white' ? '1' : '8';

    
    let numberPosition = position[1];
    const letterIndex = letters.findIndex( letter => letter === position[0] );

    const possibleMoves = [];
    
    possibleMoves[0] = `${ letters[ letterIndex - 1 ] }${ +numberPosition + 1 }`;
    possibleMoves[1] = `${ letters[ letterIndex ] }${ +numberPosition + 1 }`;
    possibleMoves[2] = `${ letters[ letterIndex + 1 ] }${ +numberPosition + 1 }`;
    possibleMoves[3] = `${ letters[ letterIndex + 1] }${ numberPosition }`;

    possibleMoves[4] = `${ letters[ letterIndex + 1 ] }${ +numberPosition - 1 }`;
    possibleMoves[5] = `${ letters[ letterIndex ] }${ +numberPosition - 1 }`;
    possibleMoves[6] = `${ letters[ letterIndex - 1 ]}${ +numberPosition - 1 }`;
    possibleMoves[7] = `${ letters[ letterIndex - 1 ]}${ +numberPosition }`;


    let cleanedPossibleMoves = cleanPossibleMoves( possibleMoves );
    

    // Limpiamos las casillas que tengan una pieza del mismo color
    // buscamos las casillas con piezas de ese color
    let squaresOccupiedByAllies = squares.filter( square => square.children[0]?.classList[0] === color );
    squaresOccupiedByAllies = squaresOccupiedByAllies.map( ({dataset}) => dataset.square );
    cleanedPossibleMoves = cleanedPossibleMoves.filter( move => !squaresOccupiedByAllies.includes(move) );


    // =================== CASTLING =================== //

    
    // si ya se movió el rey o está en jaque, retornamos
    if ( hasMoved || isInCheck ) {
        return cleanedPossibleMoves;
    }


    const [ areLeftSquaresOccupied, areRightSquaresOccupied] = checkMiddleSquares( color, squares );


    // calculamos allPossibleMoves
    if ( areLeftSquaresOccupied && areRightSquaresOccupied ) {
        return cleanedPossibleMoves;
    }


    // No se puede hacer enrroque A TRAVÉS de jaque, por eso hacemos esto
    const oppositePieces = pieces.filter( piece => piece.color !== color );
    const [ canCastleLeft, canCastleRight ] = oppositePossibleMoves( oppositePieces, kingFile );

        
    if ( !areLeftSquaresOccupied && canCastleLeft ) {

        if ( checkForRook( 'left', color ) ) {

            cleanedPossibleMoves.push( `C${ kingFile }` );

        } 
    }

    if ( !areRightSquaresOccupied && canCastleRight ) {

        if ( checkForRook( 'right', color ) ) {

            cleanedPossibleMoves.push( `G${ kingFile }` );

        } 
    }

    // ===================        =================== //

    return cleanedPossibleMoves;
}