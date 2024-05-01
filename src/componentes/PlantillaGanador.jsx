
export default function PlantillaGanador(props) {

    /* declaramos la clase para que se oculte. 
    si hay un ganador se quita la opacidad y se muestra el carte */
    let className = "anuncio-ganador-oculto"
    if (props.ganador !== null || props.ganador === false) className = 'anuncio-ganador'

    /* determinamos el texto definitivo */
    const textoDefinitivo = props.ganador === false ? "Empate" : "Gandor: " + props.ganador;

    return (
        <section className={className}>
            <h2>{textoDefinitivo}</h2>
            <h4>Contador de jugadas.</h4>
            {props.children}
        </section>
    )
}