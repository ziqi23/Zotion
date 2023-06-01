import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function HeaderShare(props) {
    const [text, setText] = useState("Copy")
    function handleClick(e) {
        e.preventDefault()
        setText(<FontAwesomeIcon icon="check" style={{color: "white"}}/>)
        navigator.clipboard.writeText("https://notion-aa-clone.herokuapp.com/")
    }
    return (
        <div className="header-share-panel">
            <div className="header-share-panel-header">Share</div>
            <div className="header-share-panel-container">
                <div>https://notion-aa-clone.herokuapp.com/</div>
                <div onClick={handleClick}>{text}</div>
            </div>
            <div className="header-share-footer">
                <Link to='https://github.com/ziqi23' target="_blank">
                <FaGithub className="social-links" />
                </Link>
                <Link to='https://www.linkedin.com/in/ziqi-zou/' target="_blank">
                <FaLinkedin className="social-links" />
                </Link>
            </div>
        </div>
    )
}

export default HeaderShare