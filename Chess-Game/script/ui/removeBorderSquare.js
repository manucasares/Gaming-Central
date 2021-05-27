import { squares } from "../main.js";



export const removeBorderSquare = ( lastPosition ) => {
    if ( !lastPosition ){
        return;
    }

   squares.find( ({dataset}) => dataset.square === lastPosition).classList.remove('active-border');
}