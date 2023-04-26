import { useState } from "react";
import Tooltip from "./Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { modifyPage } from "../../store/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const HeaderItem = ({props}) => {
    const identifier = props.name
    const location = useLocation();
    const dispatch = useDispatch();
    const query = location.search
    const pageId = query.slice(query.search("=") + 1, query.length)
    const pages = useSelector((state) => state.page)
    const [tooltipVisible, setTooltipVisible] = useState(false)

    function handleClick(e) {
        e.preventDefault()
        switch (e.currentTarget.className) {
            case ("header-icon-favorite"):
                console.log("here")
                dispatch(modifyPage({...pages[pageId], favorite: !pages[pageId].favorite}))
                break
            default:
                break
        }
    }

    let text;
    let icon;
    switch (identifier) {
        case ("share"):
            text = "Share or publish to the web"
            icon = "Share"
            break
        case ("comment"):
            text = "View all comments"
            icon = <FontAwesomeIcon icon="comment-dots"></FontAwesomeIcon>
            break
        case ("notifications"):
            text = "View all updates"
            icon = <FontAwesomeIcon icon="clock"></FontAwesomeIcon>
            break
        case ("favorite"):
            text = "Pin this page in your sidebar"
            icon = <FontAwesomeIcon icon="star"></FontAwesomeIcon>
            break
        case ("more"):
            text = "Style, export, and more..."
            icon = <FontAwesomeIcon icon="ellipsis"></FontAwesomeIcon>
            break
        default:
            break
    }
    return (
        <div 
         className={`header-icon-${identifier}`}
         onMouseEnter={() => setTooltipVisible(true)}
         onMouseLeave={() => setTooltipVisible(false)}
         onClick={handleClick}
         style={pages[pageId].favorite && identifier === "favorite" ? {"color": "pink"} : {}}>
            {icon}
            {tooltipVisible && (
                <Tooltip props={{"text": text, "relativePosition": [0, 30]}}></Tooltip>
            )}
        </div>
    )
}

export default HeaderItem