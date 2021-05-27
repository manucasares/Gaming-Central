import { cleanPossibleMoves } from "../helpers/cleanPossibleMoves.js";
import { letters } from "../main.js";



export const knight = ( piece ) => {

    const { position } = piece;
    const letterIndex = letters.findIndex( letter => letter === position[0] );

    let numberPosition = position[1];


    const possibleMoves = [];

    possibleMoves[0] = `${ letters[ letterIndex - 1 ]}${ +numberPosition - 2 }`;
    possibleMoves[1] = `${ letters[ letterIndex + 1 ]}${ +numberPosition - 2 }`;
    possibleMoves[2] = `${ letters[ letterIndex - 2 ]}${ +numberPosition - 1 }`;
    possibleMoves[3] = `${ letters[ letterIndex + 2 ]}${ +numberPosition - 1 }`;
    possibleMoves[4] = `${ letters[ letterIndex - 1 ]}${ +numberPosition + 2 }`;
    possibleMoves[5] = `${ letters[ letterIndex + 1 ]}${ +numberPosition + 2 }`;
    possibleMoves[6] = `${ letters[ letterIndex - 2 ]}${ +numberPosition + 1 }`;
    possibleMoves[7] = `${ letters[ letterIndex + 2 ]}${ +numberPosition + 1 }`;


    return cleanPossibleMoves( possibleMoves );
}