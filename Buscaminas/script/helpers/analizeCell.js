export const analizeCell = ( cell, indexed ) => {

    const returnedEmptyCells = [];
    const returnedLimitCells = [];

    const row = Number( cell.dataset.position[ 0 ] );
    const column = Number( cell.dataset.position[ 1 ] );

    // Creamos las direcciones, arriba, arriba-derecha, derecha, etc...
    const directions = [ '-1 0', '-1 1', '0 1', '1 1', '1 0', '1 -1', '0 -1', '-1 -1' ];

    // Analizamos cada dirección
    for ( let i = 0; i < directions.length; i++ ) {
        
        let [ rowDirection, columnDirection ] = directions[ i ].split(' ');

        rowDirection = Number( rowDirection );
        columnDirection = Number(columnDirection );

        const cellAround = indexed[ `${ row + rowDirection }${ column + columnDirection }` ];

        // Si está vacía...
        if ( cellAround?.classList.contains( 'none' ) ) {
            returnedEmptyCells.push( cellAround );
            continue;
        }

        // Si tiene minas alrededor...
        if ( cellAround?.classList.contains( 'has-mines-around' ) ) {
            returnedLimitCells.push( cellAround );
        }
    }

    return { returnedEmptyCells, returnedLimitCells }
}

