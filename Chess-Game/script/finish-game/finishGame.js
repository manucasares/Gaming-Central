import { setInitialPosition } from "../data/pieces.js";
import { Main, setInitialValues } from "../main.js";

const checkmate = document.getElementById('checkmate');
const checkmate_text = document.getElementById('checkmate_text');


export const finishGame = ( text ) => {

    checkmate.classList.add('show');
    checkmate_text.innerHTML = `${ text.charAt(0).toUpperCase() }${ text.slice(1) }`;

    play_again.addEventListener( 'click', () => {
                
        setInitialValues();


        checkmate.classList.remove('show');
        setInitialPosition();
        Main();
        return;

    }, true );

}