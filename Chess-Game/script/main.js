import { pieces, setInitialPosition } from './data/pieces.js';
import { filterPiecesByColor } from './helpers/filterPiecesByColor.js';
import { clearBoard } from './ui/clearBoard.js';
import { createNodePieces } from './helpers/createNodePieces.js';
import { addPieceListener } from './helpers/addPieceListener.js';
import { removeBorderSquare } from './ui/removeBorderSquare.js';
import { setPossibleMoves } from './helpers/setPossibleMoves.js';
import { addEmptySquareListener } from './helpers/addEmptySquareListener.js';
import { checkEnPassant } from './enPassant/checkEnPassant.js';
import { eatEnPassant } from './enPassant/eatEnPassant.js';
import { promote } from './pieceAlgorithms/pawn/promote.js';
import { check } from './check&checkMate/check.js';
import { checkForCheckmate } from './check&checkMate/checkForCheckmate.js';
import { isChecking } from './check&checkMate/isChecking.js';
import { isInCheck, setIsInCheck } from './pieceAlgorithms/king/king.js';
import { checkForStalemate } from './stalemate/checkForStalemate.js';
import { finishGame } from './finish-game/finishGame.js';
import { findCheckingPiece } from './check&checkMate/findCheckingPiece.js';


// UI
const play_again = document.getElementById('play_again');    
const turn_text = document.getElementById('turn');


// EXPORTADAS
export const squares = [...document.querySelectorAll('.square')];
export const numbers = [ '1', '2', '3', '4', '5', '6', '7', '8' ];
export const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];
export let enPassant = false;


// BOOLEANAS
let isPieceEaten = false;
let whiteTurn = true;



let turn = 'white';
let promotionFinalSquare = '8';

let activePiece = null;
let possibleMoves;
let nodePieces;



// MAIN FUNCTION // 
export const Main = () => {
    

    // Limpiamos el tablero
    clearBoard();
    
    // Separamos piezas blancas y negras (NO nodo)
    let WHITE_PIECES = filterPiecesByColor( 'white' );
    let BLACK_PIECES = filterPiecesByColor( 'black' );
    
    // Creamos los NODOS de las piezas
    nodePieces = createNodePieces( WHITE_PIECES, BLACK_PIECES );

    // Setear las piezas
    setPieces( nodePieces );
 
    // Agregamos listener a las piezas
    addPieceListener( nodePieces );

    // Agregamos listener a las casillas vacías
    addEmptySquareListener();
}


// SET PIECES //  
export const setPieces = ( pieces ) => {

    pieces.forEach( piece => {
        
        // busco la casilla correcta
        const pieceSquare = squares.find( ({dataset}) => dataset.square === piece.dataset.position );
        
        // luego meto la pieza por la casilla correcta
        pieceSquare.appendChild(piece);
    })
}


// EAT PIECE //
const eatPiece = ( eatenPiece, pieceMoved ) => {

    // creo que este enPassant no es necesario, probar esto despues
    enPassant = false;
    isPieceEaten = true;

    const eatenPieceIndex = pieces.findIndex( piece => piece.id === eatenPiece.id );
    const pieceMovedInArr = pieces.find( piece => piece.id === pieceMoved.id );
    const positionOfEatenPiece = eatenPiece.dataset.position;
    const pieceEaten = pieces.find( piece => piece.position === positionOfEatenPiece );


    const squareOfPieceBeforeMoving = squares.find( ({dataset}) => dataset.square === pieceMovedInArr.position );
    const squareOfPieceAfterMoving = squares.find( ({dataset}) => dataset.square === positionOfEatenPiece );


    // comprobamos si el rey se pone en jaque a sí mismo al comer
    if ( pieceMovedInArr.name === 'king' ) {

        const squareOfEatenPiece = squares.find( ({dataset}) => dataset.square === positionOfEatenPiece );
        
        const lastPosition = pieceMovedInArr.position;
        const squareOfPieceBeforeMoving = squares.find( ({dataset}) => dataset.square === pieceMovedInArr.position );
        pieceMovedInArr.position = positionOfEatenPiece;


        const runIntoCheck = check( turn, pieceMovedInArr, squareOfPieceBeforeMoving, squareOfEatenPiece );
        
        // si el rey come a un casillero donde se pondría en jaque a si mismo
        if ( runIntoCheck ) {

            pieceMovedInArr.position = lastPosition;
            isPieceEaten = false;

            console.log('ILLEGAL SELFCHECK');
            Main();
            return;
        }
    } 



    // borramos la pieza
    pieces.splice( eatenPieceIndex, 1 );


    movePiece( pieceMoved, positionOfEatenPiece );
}


// SET ACTIVE PIECE //
export const setActivePiece = ( {target} ) => {

    // si se clikea una pieza que no es la del turno y activePiece no es nada
    if ( turn !== target.classList[0] && !activePiece ) {
        return;
    }

    // solo se calcula las moves si la pieza clickeada es la del turno
    if ( turn === target.classList[0] ) {
        possibleMoves = setPossibleMoves( target );
    }
    
    // si se clickea una pieza del color diferente del turno que es la comemos
    if ( turn !== target.classList[0] && activePiece ) {

        // aunque si esa pieza no esta dentro de las possibleMoves no hacemos nada
        if ( possibleMoves.includes( target.dataset.position ) ) {

            //Si está en jaque, va a comprobar cual es el CheckingPiece
            //Si el checkingPiece NO ES la pieza que deseamos comer, no podrá comerse la pieza

            if ( isInCheck ) {
                const attackingPieces = pieces.filter( piece => piece.color !== turn );
                const king = pieces.find( ({ name, color }) => name === 'king' && color === turn );
                const positionOfKing = king.position;

                const checkingPiece = findCheckingPiece(attackingPieces, positionOfKing)
               
                if( target.dataset.position !== checkingPiece.position && activePiece.dataset.position !== king.position ) {
                    return;
                }

            }

            eatPiece( target, activePiece );
        }

        return;
    }


    activePiece = target;


    // hice esto por si clickeabas un pieza, la ponías en active y si clickeabas otra había que sacar el borde a la primera que clickeaste
    const previusActiveSquare = squares.find( square => square.classList.contains('active-border') );
    if ( previusActiveSquare ) previusActiveSquare.classList.remove('active-border');
    

    // agrego border al square activo
    const activeSquare = squares.find( square => square.children[0] === target );
    activeSquare.classList.add('active-border');
}


// MOVE PIECE
export const movePiece = ( e, squareOfEatenPiece ) => {

    if ( !activePiece ){
        return;
    }


    const landingSquare = isPieceEaten ? squareOfEatenPiece : e.target.dataset.square;
    

    const legalMove = possibleMoves.some( move => move === landingSquare );
    

    if ( !legalMove ) {
        console.log('ILLEGAL MOVE');
        return;
    }


    // buscamos la pieza a mover en el array de objetos (pieces)
    const pieceToMoveInArr = pieces.find( ({id}) => activePiece.id === id );
    const { name, specialSquarePassant } = pieceToMoveInArr;
  
    // variable con la posicion antes de ser cambiada
    let lastPosition;
    let squareOfPieceBeforeMoving;
    lastPosition = pieceToMoveInArr.position;


    // CHECK //

    if ( name === 'king' ) {

        squareOfPieceBeforeMoving = squares.find( ({dataset}) => dataset.square === pieceToMoveInArr.position );
        pieceToMoveInArr.position = landingSquare;


        // CASTLING (mover torre)

        const lastPositionLetterIndex = letters.findIndex( letter => letter === lastPosition[0] );
        const landingSquareLetterIndex = letters.findIndex( letter => letter === landingSquare[0] );

        if ( Math.abs( lastPositionLetterIndex - landingSquareLetterIndex ) === 2 ) {

            // Posicion de la torre antes de que se mueva
            const letterPosition = landingSquare[0] === 'C' ? 'A' : 'H';
            const numberPosition = turn === 'white' ? '1' : '8';
            
            const rook = pieces.find( ({ position }) => position === `${ letterPosition }${numberPosition}` );

            // Posicion de la torre después de que se mueva
            const newRookPosition = `${ letterPosition === 'A' ? 'D' : 'F' }${ numberPosition }`;

            rook.position = newRookPosition
        }
    }


    const squareOfPieceAfterMoving = squares.find( ({dataset}) => dataset.square === landingSquare );

    // CHECKEAMOS SI NOS PONEMOS EN JAQUE A NOSOTROS MISMOS

    const isInCheck = check( turn, pieceToMoveInArr, squareOfPieceBeforeMoving, squareOfPieceAfterMoving );

    if ( isInCheck ) {

        // volvemos a poner la pieza donde estaba y retornamos
        console.log('ILLEGAL MOVE IN CHECK');
        pieceToMoveInArr.position = lastPosition;
        Main();
        return;
    }
    
    // cambio las posiciones del objeto
    pieceToMoveInArr.position = landingSquare;

    
    // EN PASSANT //
    if ( enPassant && landingSquare === specialSquarePassant ) {

        eatEnPassant( landingSquare, turn );
    } 

    enPassant = false;
    

    if ( name === 'pawn' ) {

        // PROMOTION //
        if ( landingSquare[1] === promotionFinalSquare ) {
            promote( turn, pieceToMoveInArr );
        }

        const { position } = pieceToMoveInArr;
        
            // esto dice: "si el peon movio 2 casilleros hacia adelante"
        if ( Math.abs( +position[1] - +lastPosition[1] ) === 2 ) {

            enPassant = checkEnPassant( position, turn ) ;
        }
    }
    // ================= //


    // CHEKEAMOS QUE AL MOVER SE ESTÉ HACIENDO JAQUE
    if ( isChecking( turn, squareOfPieceAfterMoving ) ) {
        // se lo mandamos a king.js
        setIsInCheck( true );
        // CHECKMATE
        if ( checkForCheckmate( turn, enPassant, squareOfPieceAfterMoving ) ) {

            finishGame( `${ turn } wins!` );
            
        }

    } else {
        setIsInCheck( false );
        checkForStalemate( turn, squareOfPieceAfterMoving );
    }


    if ( isPieceEaten ) {
        // cambio las posiciones del nodo
        e.dataset.position = landingSquare;
    }


    if ( name === 'king' || name === 'rook' ) {
        pieceToMoveInArr.hasMoved = true;
    }

    // removemos el borde al mover la pieza
    removeBorderSquare( lastPosition );

    // cambiamos pieceEaten en false
    isPieceEaten = false;

    // seteamos la activePiece en null
    activePiece = null;
    
    // cambiamos el turno
    whiteTurn = !whiteTurn;

    // cambiamos el turn string y el promotionFinalSquare
    if ( whiteTurn ) {
        turn = 'white';
        promotionFinalSquare = '8';
    } else {
        turn = 'black';
        promotionFinalSquare = '1';
    }

    // cambio el ui del turno
    turn_text.innerHTML = `TURN: ${ turn }`;
    
    // ejecutamos funcion main (repetir ciclo)
    Main();
}


export const setInitialValues = () => {

    whiteTurn = true;
    turn = 'white';
    turn_text.innerHTML = `TURN: white`;
}


Main();