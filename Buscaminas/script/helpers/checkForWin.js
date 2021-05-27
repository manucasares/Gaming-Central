
export const checkForWin = ( cells ) => {

    // Si todas las cells que no tienen minas tienen 'show' es una win.
    const cellsWithoutMines = [ ...document.querySelectorAll( '.cell:not(.mined)' ) ];

    return cellsWithoutMines.every( cell => cell.classList.contains( 'show' ) );
}
