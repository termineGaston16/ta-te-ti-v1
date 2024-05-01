export default function Casillero(props) {

    const handleClick = () => {
        if (props.finalizarPartida !== null || props.finalizarPartida === false) return;
        props.actualizarCasillero(props.index);
    }

    return (
        <div className="square" onClick={handleClick}>
            {props.children}
        </div>
    )
}