export default function BtnNormal(props){

    const handleClick = () => {
        props.funcionClick();
    }

    return(
        <button className="btn button" onClick={handleClick}>{props.textBtn}</button>
    )
}
