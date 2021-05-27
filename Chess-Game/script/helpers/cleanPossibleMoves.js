

export const cleanPossibleMoves = ( possibleMoves ) => {

    const possibleMovesCleaned = [];

    const regex = new RegExp( /(undefined|-|0|9)/ , 'gi' );

    possibleMoves.forEach( move => {
        if ( move.search(regex) === -1 ) {
            possibleMovesCleaned.push(move);
        };
    })

    return possibleMovesCleaned;
}