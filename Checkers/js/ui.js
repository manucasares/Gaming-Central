

export function removeActiveBorder   (  ) {
    const active = document.querySelector( '.active' );
    active.classList.remove( 'active' );
}

export function changeTurnUI ( nextTurn ) {
    
    const black = document.querySelector( '#turn .black-turn' ); 
    const red = document.querySelector( '#turn .red-turn' );
    const activeTurn = document.querySelector( '.active-turn' ); 
    
    activeTurn.classList.remove( 'active-turn' );

    if ( nextTurn === 'black' ) {
        black.classList.add( 'active-turn' )
    } else {
        red.classList.add( 'active-turn' )
    }
}