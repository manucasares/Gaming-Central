
export const insertFlag = ( e ) => {

    e.preventDefault();
    const cellClicked = e.target;

    // Seleccionamos la posible bandera con un selector de CSS por el atributo data-position
    const existingFlag = document.querySelector( `.board [data-position="${ cellClicked.dataset.position }"] .fa-flag` );
    
    // Si ya tiene bandera se la sacamos
    if ( existingFlag ) {
        cellClicked.removeChild( existingFlag );
        return false;
    }

    // Creamos bandera
    const flag = document.createElement( 'i' );
    flag.setAttribute( 'class', 'fas fa-flag' );

    // Insertamos la bandera
    cellClicked.appendChild( flag );

    return false;
}
