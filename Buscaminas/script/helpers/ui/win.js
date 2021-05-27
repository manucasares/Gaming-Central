import { submitScore } from "../../listeners/submitScore.js";

export const win = async( initialTime, main ) => {

    // Nodos
    const end_game_text = document.getElementById( 'end_game_text' );
    const game_over_window = document.getElementById( 'game-over' );
    const submit_score_window = document.getElementById( 'submit_score_window' );

    let timeNode = document.getElementById( 'time' );
    let submit_score = document.getElementById( 'submit_score' );

    // Agregamos los nodos si se han borrado en gameOver.js
    if ( !timeNode || !submit_score ) {

        timeNode = document.createElement( 'span' );
        submit_score = document.createElement( 'span' );

        submit_score.innerText = 'Submit your score'

        timeNode.setAttribute( 'id', 'time' );
        submit_score.setAttribute( 'id', 'submit_score' );

        game_over_window.appendChild( timeNode );
        game_over_window.appendChild( submit_score );
    }

    // Tiempo variables
    const finishTime = new Date().getTime();
    const time = finishTime - initialTime;

    const minutes = ( ( time / 1000 ) / 60 ).toString();
    let seconds = ( ( time / 1000 ) % 60 ).toString().split( '.' )[0];

    
    if ( seconds.length === 1 ) {
        seconds = `0${ seconds }`
    }

    const timeText = `${ minutes.split( '.' )[0] }:${ seconds }`;

    // Cambiamos texto
    end_game_text.innerText = 'You win!';
    timeNode.innerText = `Your time was ${ timeText }`;

    // Mostramos la ventana
    game_over_window.style.display = 'flex';

    // Submit score
    submit_score_window.addEventListener( 'submit', ( e ) => submitScore( e, main, timeText, time ), { once: true } );



    // Guardamos el puntaje en localStorage
}
