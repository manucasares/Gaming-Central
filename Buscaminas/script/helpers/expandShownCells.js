import { analizeCell } from "./analizeCell.js";


export const expandShownCells = ( cell, indexed ) => {
    
    /*
        Tres arrays:
         1 - Que contenga las cells vacias - Loopeamos este
         2 - Que contenga las cells analizadas
         3 - Que contenga los límites, o sea las cells que tienen al menos una mina alrededor
    */

    const emptyCells = [];
    const limitCells = [];
    const analizedCells = [ cell ];

    // Analizamos la cell cliqueada
    const { returnedEmptyCells, returnedLimitCells } = analizeCell( cell, indexed );

    // Agregamos las cells vacías y las cells límite
    returnedEmptyCells.forEach( cell => emptyCells.push( cell ) );
    returnedLimitCells.forEach( cell => limitCells.push( cell ) );

    // Analizamos cada cell
    while ( emptyCells.length ) {

        emptyCells.forEach( ( cell, i ) => {
    
            // Siempre la eliminamos del array
            emptyCells.splice( i, 1 );
    
            // Si ya la hemos analizado retornamos
            if ( analizedCells.includes( cell ) ) {
                return;
            }
    
            // La metemos al array de analizadas
            analizedCells.push( cell );

            // Analizamos 
            const { returnedEmptyCells, returnedLimitCells } = analizeCell( cell, indexed );
            
            // Agregamos los valores devueltos a los arrays
            returnedEmptyCells.forEach( cell => emptyCells.push( cell ) );
            returnedLimitCells.forEach( cell => limitCells.push( cell ) );
            
            // Mostramos las cells
            emptyCells.forEach( cell => cell.classList.add( 'show' ) );
            limitCells.forEach( cell => cell.classList.add( 'show' ) );        
       
        });
    }
}
