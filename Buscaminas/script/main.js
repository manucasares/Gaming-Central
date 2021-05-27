import { createBoard } from "./ui/createBoard.js";
import { placeMines } from "./helpers/mines.js";
import { insertFlag } from "./helpers/flags.js";
import { setNumberOfMinesAround } from "./helpers/setNumberOfMinesAround.js";
import { gameOver } from "./helpers/gameOver.js";
import { expandShownCells } from "./helpers/expandShownCells.js";
import { checkForWin } from "./helpers/checkForWin.js";
import { win } from "./helpers/ui/win.js";
import { playAgain } from "./listeners/playAgain.js";

// Nodos
const game_over_window = document.getElementById( 'game-over' );
const play_again = document.getElementById( 'play_again' );
const submit_score = document.getElementById( 'submit_score' );
const scores_container = document.getElementById( 'scores_container' );


const main = () => {
    
    // Creamos el tablero
    createBoard();
    
    const cells = [ ...document.getElementsByClassName( 'cell' ) ];

    // Indexamos para acceder más fácilmente
    const indexed = cells.reduce( ( acc, el ) => ({
        ...acc,
        [ el.dataset.position ]: el
    }), {} );

    // Colocamos las minas
    placeMines( indexed );

    // Definimos numeros en las cells
    setNumberOfMinesAround( cells, indexed );

    // Contador para inicializar el tiempo e initial time
    let timesClicked = 0;
    let initialTime;
    
    cells.forEach( cell => {
    
        cell.addEventListener( 'click', ( e ) => {
    
            // Inicializamos tiempo
            if ( !timesClicked ) {
                initialTime = new Date().getTime();
                timesClicked++;
            }

            const cell = e.target;
    
            // Si hay bandera retornamos
            if ( cell.lastChild?.classList.contains( 'fa-flag' ) ) {
                return;
            }
    
            // Si hay mina game over
            if ( cell.classList.contains( 'mined' ) ) {
    
                // Le ponemos background rojo a la cell cliqueada
                cell.style.background = 'rgb(255, 31, 31)';
    
                // Game over
                gameOver( cells );
                return;
            }
    
            // Sacamos el listener a la cell
            cell.style.pointerEvents = 'none';
    
            /*
                Si la cell no tiene minas alrededor
                debemos mostrar cells hasta toparnos
                contra una cell que sì tenga minas alrededor
            */
            if ( cell.classList.contains( 'none' ) ) {
                expandShownCells( cell, indexed );
            }
    
            // Mostramos el contenido de la cell
            cell.classList.add( 'show' );

            // Chequeamos por win
            if ( checkForWin( cells ) ) {
                win( initialTime, main );
            }
    
        } );
    
        // Right click - insert flag
        cell.addEventListener( 'contextmenu', insertFlag );
        
    });


}

main();

// Play again 
play_again.addEventListener( 'click', () => playAgain( main ) );


// Abrir Submit score
submit_score.addEventListener( 'click', () => {

    console.log('Entra');

    // Mostramos la ventana
    submit_score_window.style.display = 'flex';

    // Agregamos los scores
    const scores = JSON.parse( localStorage.getItem( 'scores' ) ) || [];

    // Eliminamos primero los scores
    const scoresToDelete = [ ...document.querySelectorAll( '#submit_score_window .scores-container *' ) ];
    scoresToDelete.forEach( score => score.remove() );


    scores.forEach( ({ name, score }, i) => {

        const scoreDiv = document.createElement( 'div' );
        scoreDiv.setAttribute( 'class', 'score-div' );
        scoreDiv.innerHTML = `<p> ${ i + 1 }. ${ name.toLocaleUpperCase() } </p> <p> ${ score } </p>`;

        scores_container.appendChild( scoreDiv );
    })
});



