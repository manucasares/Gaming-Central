


export function findPieceByPosition ( pieces, position ) {
    return pieces.find( piece => piece.square === position );
}

export function findPieceIndex ( pieces, id ) {
    return pieces.findIndex( piece => piece.id === id );
}

export const getSquaresIndexed = ( squares ) => {
    return squares.reduce( ( squaresIndexed, square ) => {
        return {
            ...squaresIndexed,
            [ square.dataset.position ]: square
        }
    }) 
}