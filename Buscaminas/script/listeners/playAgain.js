
export const playAgain = ( main ) => {

    const game_over_window = document.getElementById( 'game-over' );

    // Cerramos ventana
    game_over_window.style.display = 'none';

    const cells = document.querySelectorAll( '.cell' );
    [ ...cells ].forEach( cell => cell.remove() );

    main();
}
