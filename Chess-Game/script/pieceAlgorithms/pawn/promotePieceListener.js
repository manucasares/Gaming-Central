import { Main } from "../../main.js";
import { pieces } from "../../data/pieces.js";


export const promotePieceListener = ( e ) => {

    // buscamos el peon a cambiar
    const pawn = pieces.find( ({ color, position, name }) => {
        return (
            color === 'white' && position[1] === '8' && name === 'pawn'
            ||
            color === 'black' && position[1] === '1' && name === 'pawn'
        )
    })


    const container = document.getElementById(`promotion-${ pawn.color }`);
    const promotion_pieces = [...document.querySelectorAll(`.promotion-${ pawn.color } .promotion-piece`)];


    const pieceInfo = e.target.dataset.piece;

    // separamos color y nombre de la pieza
    const [ color, name ] = pieceInfo.split(' ');

    // cambiamos la pieza
    pawn.name = name;

    // cambiamos la imagen
    pawn.img = `/images/${color[0]}-${name}.png`;

    // ocultamos el ui
    container.classList.remove('show');

    // sacamos eventListener
    promotion_pieces.forEach( piece => piece.removeEventListener( 'click', promotePieceListener ));

    // Ejecutamos funcion main
    Main();
}