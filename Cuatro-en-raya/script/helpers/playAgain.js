import { slots } from "../main.js"

const winner_window = document.getElementById( 'winner_window' );

export const playAgain = () => {
    slots.forEach( slot => {
        slot.classList.remove( 'game_finished' );
        slot.setAttribute( 'class', 'slot' );
    } );

    winner_window.classList.remove( 'show' );

}
