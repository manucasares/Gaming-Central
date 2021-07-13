
export function createBoard ( board ) {
    
    // Rows
    for ( let r = 0; r < 8; r++ ) {
        // Columns
        for ( let c = 0; c < 8; c++ ) {

            const square = document.createElement( 'div' );

            square.setAttribute( 'data-position', `${ r }${ c }` );
            square.classList.add( 'square' );

            // La suma de row+column define el color de la casilla/square
            if ( ( r + c ) % 2 === 0 ) {
                // Negras
                square.classList.add( 'black' );
            } else {
                // Rojas
                square.classList.add( 'red' );
            }
            
            board.appendChild( square );
        }
    }

    return [ ...document.querySelectorAll( '.square' ) ];
}

export function resetBoard ( squares ) {
    
    squares.forEach( square => {
        square.classList.remove( 'piece' )
        square.classList.remove( 'piece-black' )
        square.classList.remove( 'piece-red' )
        square.removeAttribute( 'data-occupied' );
    });
}
