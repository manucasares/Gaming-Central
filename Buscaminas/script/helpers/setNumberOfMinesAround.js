
export const setNumberOfMinesAround = ( cells, indexed ) => {


    cells.forEach( cell => {

        // Retornamos si tiene bomba
        if ( cell.lastChild ) {
            return;
        }

        const row = Number( cell.dataset.position[ 0 ] );
        const column = Number( cell.dataset.position[ 1 ] );

        const numbersAsString = [ 'none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' ];
        let minesAround = 0;
        let cellsAround = [];

        // Agregamos al array todas las cells de alrededor
        cellsAround.push( indexed[ `${ row - 1 }${ column }` ] ); // arriba
        cellsAround.push( indexed[ `${ row - 1 }${ column + 1 }` ] ); // arriba - derecha
        cellsAround.push( indexed[ `${ row }${ column + 1 }` ] ); // derecha
        cellsAround.push( indexed[ `${ row + 1 }${ column + 1 }` ] ); // abajo - derecha
        cellsAround.push( indexed[ `${ row + 1 }${ column }` ] ); // abajo
        cellsAround.push( indexed[ `${ row + 1 }${ column - 1 }` ] ); // abajo - izquierda
        cellsAround.push( indexed[ `${ row }${ column - 1 }` ] ); // izquierda
        cellsAround.push( indexed[ `${ row - 1 }${ column - 1 }` ] ); // arriba - izquierda

        // Sacamos todos los undefined
        cellsAround = cellsAround.filter( cell => cell );

        // Por cada cell definimos la cantidad de minas que tiene alrededor
        cellsAround.forEach( cell => {
            if ( cell.classList.contains( 'mined' ) ) {
                minesAround++;
            }
        })

        // Agregamos la clase y el texto
        cell.classList.add( `${ numbersAsString[ minesAround ] }` );

        // Si tiene minas alrededor ponemos esta clase
        if ( numbersAsString[ minesAround ] !== 'none' ) {
            cell.classList.add( 'has-mines-around' );
        }

        if ( minesAround ) {
            cell.innerHTML = `<span> ${ minesAround } </span>`;
        }
    
    });
}
