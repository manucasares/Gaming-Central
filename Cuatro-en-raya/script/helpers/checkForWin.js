import { indexed } from "../main.js";

export const checkForWin = ( slotFilledPos, turn ) => {

    turn = turn.split(`'`)[0].toLowerCase();

    const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ];
    const numbers = [ '1', '2', '3', '4', '5', '6' ];

    const letterPos = slotFilledPos[0];
    const numberPos = slotFilledPos[1];

    const letterIndex = letters.findIndex( letter => letter === letterPos );
    const numberIndex = numbers.findIndex( number => number === numberPos );

    let numberI = numberIndex;
    let letterI = letterIndex
    let sameColorSlots = 0;


    // Horizontal
    
        // Left
    while ( indexed[ `${ letters[ letterI - 1 ] }${ numberPos }` ]?.classList.contains( turn ) ) {
        sameColorSlots++;
        letterI--;
    }

    letterI = letterIndex;

        // Right
    while ( indexed[ `${ letters[ letterI + 1 ] }${ numberPos }` ]?.classList.contains( turn ) ) {
        sameColorSlots++;
        letterI++;
    }

    letterI = letterIndex;


    if ( sameColorSlots >= 3 )
        return true;


    // Down

    sameColorSlots = 0;


    while ( indexed[ `${ letterPos }${ numbers[ numberI - 1 ] }` ]?.classList.contains( turn ) ) {
        sameColorSlots++;
        numberI--;
    }

    if ( sameColorSlots >= 3 )
        return true;

        
    // Diagonal
    numberI = numberIndex;
    sameColorSlots = 0;


        // Down and left

    while ( indexed[ `${ letters[ letterI - 1 ] }${ numbers[ numberI - 1 ] }` ]?.classList.contains( turn ) ) {
        sameColorSlots++;
        letterI--;
        numberI--;
    }
        
    numberI = numberIndex;
    letterI = letterIndex

        // Right and up

    while ( indexed[ `${ letters[ letterI + 1 ] }${ numbers[ numberI + 1 ] }` ]?.classList.contains( turn ) ) {
        sameColorSlots++;
        letterI++;
        numberI++;
    }


    if ( sameColorSlots >= 3 )
        return true;

        // ========= // 

    sameColorSlots = 0;    
    numberI = numberIndex;
    letterI = letterIndex

        // Up and left

    while ( indexed[ `${ letters[ letterI - 1 ] }${ numbers[ numberI + 1 ] }` ]?.classList.contains( turn ) ) {
        sameColorSlots++;
        letterI--;
        numberI++;
    }


        // Right and down

    letterI = letterIndex;
    numberI = numberIndex;

    while ( indexed[ `${ letters[ letterI + 1 ] }${ numbers[ numberI - 1 ] }` ]?.classList.contains( turn ) ) {
        sameColorSlots++;
        letterI++;
        numberI--;
    }
        

    if ( sameColorSlots >= 3 )
        return true;

}

