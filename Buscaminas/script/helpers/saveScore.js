
export const saveScore = ( timeText, time, name ) => {

    // Agarramos los scores del localStorage
    let scores = JSON.parse( localStorage.getItem( 'scores' ) ) || [];

    // Agregamos el score
    scores.push({
        score: timeText,
        name,
        time
    });


    // Ordenamos los scores por puntaje
    scores = scores.sort( ( a, b ) => a.time - b.time );

    // Limitamos los scores a 5
    scores.splice( 5, 1 );

    // Guardamos en localStorage
    localStorage.setItem( 'scores', JSON.stringify( scores ) );
}
