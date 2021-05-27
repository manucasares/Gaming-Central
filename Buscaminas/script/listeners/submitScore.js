import { saveScore } from "../helpers/saveScore.js";
import { playAgain } from "./playAgain.js";

export const submitScore = ( e, main, timeText, time ) => {
    
    e.preventDefault();

    const name = document.querySelector( '#submit_score_window input' ).value;

    saveScore( timeText, time, name );

    // Cerramos ventana y ejecutamos play again
    submit_score_window.style.display = 'none';
    playAgain( main );
}
