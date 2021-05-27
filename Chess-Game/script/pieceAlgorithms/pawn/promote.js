import { promotePieceListener } from "./promotePieceListener.js";



export const promote = ( turn ) => {

    // container dependiendo del turno
    const promotion_containers = document.getElementById(`promotion-${turn}`);

    // piezas dependiendo del turno
    const promotion_pieces = [...document.querySelectorAll(`.promotion-${turn} .promotion-piece`)];

    // lo mostramos
    promotion_containers.classList.add('show');
    
    // agregamos eventListener
    promotion_pieces.forEach( piece => {
        piece.addEventListener( 'click', promotePieceListener );       
    });
}

