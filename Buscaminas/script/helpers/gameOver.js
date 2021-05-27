
export const gameOver = ( cells ) => {

    const game_over_window = document.getElementById( 'game-over' );
    const end_game_text = document.getElementById( 'end_game_text' );
    const time = document.getElementById( 'time' );
    const submit_score = document.getElementById( 'submit_score' );

    // El tiempo no se mostrará ni el submit score
    time?.remove();
    submit_score?.remove();

    // Sacamos listeners
    cells.forEach( cell => cell.style.pointerEvents = 'none' );

    // Mostramos la ventana de game over.
    game_over_window.style.display = 'flex';

    // Cambiamos ventana
    end_game_text.innerText = 'You lose :(';

    // Mostramos todas las cells
    cells.forEach( cell => cell.classList.add( 'show' ) );
}
