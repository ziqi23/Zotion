import { Link } from "react-router-dom"
import logo from "../../assets/Notion_app_logo.png"

const Icon = (props) => {
    function handleClick(e) {
        e.preventDefault();
        <Link to="/"></Link>
    }
    return (
        <>
            <button onClick={(handleClick)}>
                <img src={logo}></img>
            </button>
        </>
    )
}

export default Icon