import { slots } from "../main.js";

export const fillSlot = ( slot, turnRed ) => {
    
    const column = slot.dataset.position[0];
    
    // Agarramos la columna del slot clickeado
    const columnsSlots = slots.filter( slot => slot.dataset.position[0] === column );

    // Encontrar slot para llenar
    let slotToFill;

    for ( let i = columnsSlots.length - 1; i >= 0; i-- ) {
        
        if ( !columnsSlots[ i ].classList.contains( 'filled' ) ) {
            slotToFill = columnsSlots[ i ];
            break;
        }
    }

    if ( !slotToFill )
        return false;

    // Agregamos clases
    const turn = turnRed ? 'red' : 'blue';
    slotToFill.setAttribute( 'class', `slot filled ${ turn }` )

    return slotToFill.dataset.position;

}
