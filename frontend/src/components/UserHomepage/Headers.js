import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modifyPage } from "../../store/page";
import Tooltip from "./Tooltip";
import HeaderItem from "./HeaderItem";

const Headers = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length)
    const pages = useSelector((state) => state.page)
    const [updateNameFieldVisible, setUpdateNameFieldVisible] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false) 
    let hoursSinceLastUpdate

    if (pages[pageId]) {
        const formattedLastModified = pages[pageId].updatedAt
        const modifiedDate = new Date(formattedLastModified)
        const currentDate = new Date()
        hoursSinceLastUpdate = Math.floor((currentDate - modifiedDate) / 3600000)
    }

    function handleClick(e) {
        e.preventDefault();
        switch (e.target.className){
            case ("add-to-favorite"):
                dispatch(modifyPage({...pages[pageId], favorite: !pages[pageId].favorite}))
                break
            case ("header-page-name"):
                setUpdateNameFieldVisible(!updateNameFieldVisible)
                break
            default:
                break
        }
    }

    function handleChange(e) {
        e.preventDefault()
        dispatch(modifyPage({...pages[pageId], pageName: e.target.value}))
    }

    if (pages[pageId]) {
        return (
            <>
                <div className="header-left">
                    <div className="header-page-name" onClick={handleClick}>
                        {pages[pageId].pageName}
                        {updateNameFieldVisible && (
                            <div className="update-page-name">
                                <input type="text" placeholder={pages[pageId].pageName} onChange={handleChange}></input>
                            </div>
                        )}
                    </div>
                </div>
                <div className="header-right">
                    <div className="header-last-edit">
                        Edited {hoursSinceLastUpdate}h ago
                    </div>
                    <div className="header-icons">
                        <HeaderItem props={{name: "share"}} />
                        <HeaderItem props={{name: "comment"}} />
                        <HeaderItem props={{name: "notifications"}} />
                        <div className="header-icon-favorite" onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)}>
                            <button className="add-to-favorite" onClick={handleClick} style={pages[pageId].favorite ? {"backgroundColor": "pink"} : {}}>favorite</button>
                            {tooltipVisible && (
                                <Tooltip props={{"text": "Pin this page in your sidebar", "relativePosition": [0, 30]}}></Tooltip>
                                )}
                        </div>
                        <HeaderItem props={{name: "more"}} />
                    </div>
                </div>
            </>
        )
    } else return null;
}

export default Headers;