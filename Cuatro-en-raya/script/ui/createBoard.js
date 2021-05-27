

export const createBoard = () => {

    const board = document.getElementById( 'board' );

    const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ];
    const numbers = [ '6', '5', '4', '3', '2', '1' ];


    numbers.forEach( number => {

        letters.forEach( letter => {

            const slot = document.createElement( 'div' );

            slot.setAttribute( 'class', 'slot' );
            slot.setAttribute( 'data-position', `${ letter }${ number }` );

            board.appendChild( slot );
        } )
    } )
}