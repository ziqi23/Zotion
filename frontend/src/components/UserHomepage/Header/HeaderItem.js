import { useEffect, useState } from "react";
import Tooltip from "../Util/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { modifyPage } from "../../../store/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderMore from "./HeaderMore";
import UpdatePanel from "../Sidebar/UpdatePanel";
import HeaderShare from "./HeaderShare";


const HeaderItem = ({props}) => {
    const identifier = props.name
    const location = useLocation();
    const dispatch = useDispatch();
    const query = location.search
    const pageId = query.slice(query.search("=") + 1, query.length)
    const pages = useSelector((state) => state.page)
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [shareVisible, setShareVisible] = useState(false)
    const [commentVisible, setCommentVisible] = useState(false)
    const [notificationVisible, setNotificationVisible] = useState(false)
    const [moreVisible, setMoreVisible] = useState(false)

    function handleClick(e) {
        e.preventDefault()
        switch (e.currentTarget.className) {
            case ("header-icon-favorite"):
                console.log("here")
                dispatch(modifyPage({...pages[pageId], favorite: !pages[pageId].favorite}))
                setTooltipVisible(false)
                break
            case ("header-icon-share"):
                setTooltipVisible(false)
                setShareVisible(!shareVisible)
                break
            case ("header-icon-comment"):
                setTooltipVisible(false)
                setCommentVisible(!commentVisible)
                break
            case ("header-icon-notifications"):
                setTooltipVisible(false)
                setNotificationVisible(!notificationVisible)
                break
            case ("header-icon-more"):
                setTooltipVisible(false)
                setMoreVisible(!moreVisible)
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
        <>
        <div 
         className={`header-icon-${identifier}`}
         onMouseEnter={() => setTooltipVisible(true)}
         onMouseLeave={() => setTooltipVisible(false)}
         onClick={handleClick}
         style={pages[pageId].favorite && identifier === "favorite" ? {"color": "pink"} : {}}>
            {icon}
            {tooltipVisible && identifier !== "favorite" && identifier !== "more" && (
                <Tooltip props={{"text": text, "relativePosition": [-100, 30]}}></Tooltip>
            )}
            {tooltipVisible && identifier === "favorite" && (
                <Tooltip props={{"text": text, "relativePosition": [-125, 30]}}></Tooltip>
            )}
            {tooltipVisible && identifier === "more" && (
                <Tooltip props={{"text": text, "relativePosition": [-150, 30]}}></Tooltip>
            )}
        </div>
        {shareVisible && (
            <HeaderShare />
        )}
        {commentVisible && (
            <div className="header-comment-panel"><UpdatePanel /></div>
        )}
        {notificationVisible && (
            <div className="header-notification-panel"><UpdatePanel /></div>
        )}
        {moreVisible && (
            <HeaderMore />
        )}
        </>

    )
}

export default HeaderItem