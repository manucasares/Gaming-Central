
export const placeMines = ( indexed ) => {
    
    // Generamos array de numeros aleatorios 
    const minePositions = [];
    const minesLength = 12;
    let randomNum;
    let isRepeated;

    for ( let i = 0; i < minesLength; i++ ) {
        do {
            randomNum = Math.floor( Math.random() * ( 99 - 0 + 1) ) + 0;
            isRepeated = minePositions.includes( randomNum );
            if ( !isRepeated ) {
                // Le agregamos un cero al principio si tiene un solo dígito
                randomNum = randomNum.toString().length === 1 ? `0${ randomNum }` : randomNum;
                minePositions.push( randomNum );
            }
        }
        while ( isRepeated );
    }

    
    // Colocamos las minas
    minePositions.forEach( position => {
    
        const cell =  indexed[ position ];
        position = position.toString();
        
        // Colcamos el <i></i> en la cell
        const bomb = document.createElement( 'i' );
        bomb.setAttribute( 'class', 'fas fa-bomb' );

        // Agregamos mina
        cell.appendChild( bomb );

        // Agregamos clases
        cell.classList.add( 'mined' );
        cell.classList.remove( 'empty' );
    })
}
