import { combosGanadores } from "./constans"

/* verificar ganador */
export const verificarGanador = (tableroAChequear) => {

    /* obtenemos todos los combos ganadores y los revisamos con el tablero actual 
    y no hay coincidencia se retorna null*/
    for (const combo of combosGanadores) {
        const [a, b, c] = combo;

        if (tableroAChequear[a]
            && tableroAChequear[a] === tableroAChequear[b]
            && tableroAChequear[a] === tableroAChequear[c]) {
            return tableroAChequear[a];
        }
    }

    return null;
}

/* verificar enpate */
export const verificarEmpate = (tableroAChequear) => {
    /* veririficamos que todos estén ocupados */
    return tableroAChequear.every((casillero) => casillero !== null)
}