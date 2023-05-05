import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
        </div>
    )
}

export default HeaderShare