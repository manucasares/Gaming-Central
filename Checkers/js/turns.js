import { changeTurnUI } from './ui.js';


export function getTurn () {
    const turnElement = document.querySelector( '#turn' ); 
    let turn = turnElement.dataset.turn;
    return turn;
}

export function getOpossiteTurn () {
    const opossiteTurn = getTurn() === 'black' ? 'red': 'black';
    return opossiteTurn;
}

export function changeTurn () {

    const turn = getTurn();

    const nextTurn = turn === 'black' ? 'red' : 'black';

    document.querySelector( '#turn' ).dataset.turn = nextTurn;
    changeTurnUI( nextTurn );
}

export function changeToBlackTurn () {
    document.querySelector( '#turn' ).dataset.turn = 'black';
    document.querySelector( '.black-turn' ).classList.add( 'active-turn' );
    document.querySelector( '.red-turn' ).classList.remove( 'active-turn' );
}