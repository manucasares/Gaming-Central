
export const createBoard = () => {

    const rows = [ ...Array( 10 ).keys() ];
    const columns = [ ...Array( 10 ).keys() ];

    const board = document.getElementById( 'board' );

    rows.forEach( row => {

        columns.forEach( column => {

            const cell = document.createElement( 'div' );

            cell.setAttribute( 'class', 'cell empty' );
            cell.setAttribute( 'data-position', `${ row }${ column }` );
            cell.setAttribute( 'oncontextmenu', "return false;" );

            board.appendChild( cell );
        } )
    } )
}
