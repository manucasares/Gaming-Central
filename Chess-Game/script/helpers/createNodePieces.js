export const createNodePieces = ( WHITE_PIECES, BLACK_PIECES ) => {
    const whiteNodePieces = [];
    const blackNodePieces = [];

    WHITE_PIECES.forEach( whitePiece => {

        const { img, id, position } = whitePiece;

        const pieceCreated = document.createElement('img');

        pieceCreated.setAttribute( 'src', img );
        pieceCreated.setAttribute( 'id', id );
        pieceCreated.setAttribute( 'data-position', position );

        pieceCreated.classList.add('white');

        whiteNodePieces.push(pieceCreated);
    });

    BLACK_PIECES.forEach( blackPiece => {

        const { img, id, position } = blackPiece;

        const pieceCreated = document.createElement('img');

        pieceCreated.setAttribute( 'src', img );
        pieceCreated.setAttribute( 'id', id );
        pieceCreated.setAttribute( 'data-position', position );

        pieceCreated.classList.add('black');

        blackNodePieces.push(pieceCreated);
    });
    
    return [ ...whiteNodePieces, ...blackNodePieces ];
}