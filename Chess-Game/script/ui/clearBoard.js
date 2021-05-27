import { squares } from "../main.js"

export const clearBoard = () => {
    squares.forEach( square => square.innerHTML = '' )
}