import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modifyPage } from "../../../store/page";
import Tooltip from "../Util/Tooltip";
import HeaderItem from "./HeaderItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RxSlash } from 'react-icons/rx'

const Headers = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length)
    const pages = useSelector((state) => state.page)
    const teams = useSelector((state) => state.team)
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
        e.stopPropagation();
        e.preventDefault();
        console.log(e.currentTarget)
        switch (e.target.className){
            case ("add-to-favorite"):
                dispatch(modifyPage({...pages[pageId], favorite: !pages[pageId].favorite}))
                break
            default:
                break
        }
    }

    function handleChange(e) {
        e.preventDefault()
        dispatch(modifyPage({...pages[pageId], pageName: e.target.value}))
    }

    function getRoute(page) {
        let route = [];
        if (page.journalId) {
            route = getRoute(pages[page.journalId]);
        }
        if (this === page) {
            route.push(
            <div className="header-page-individual" onClick={handleClick}>
                {[<FontAwesomeIcon icon="file-lines"/>, <h1>{page.pageName}</h1>]}
            </div>);
        } else {
            route.push(
            <div className="header-page-individual" onClick={() => navigate(`/home?pageId=${page.id}`)}>
                {[<FontAwesomeIcon icon="file-lines"/>, <h1>{page.pageName}</h1>]}
            </div>);
            route.push(<RxSlash />);
        }
        return route;
    }

    function getTeam(page) {
        let route = [];
        if (page.teamId) {
            route.push(
            <div className="header-page-individual">
                {[
                <div className="sidebar-icon-teamspace">{teams[page.teamId].teamName[0]}</div>,
                <h1>{teams[page.teamId].teamName}</h1>
                ]}
            </div>);
            route.push(<RxSlash />);
            return route;
        }
        if (page.journalId) {
            return getTeam(pages[page.journalId]);
        }
        return "";
    }

    if (pages[pageId]) {
        return (
            <>
                <div className="header-left">
                    <div className="header-page-name" onClick={handleClick}>
                        {getTeam(pages[pageId])}{pages[pageId].journalId ? getRoute.call(pages[pageId], pages[pageId]) : 
                        <div className="header-page-individual">
                        <FontAwesomeIcon icon="file-lines"/>
                        <h1>{pages[pageId].pageName}</h1>
                        </div>}
                        {updateNameFieldVisible && (
                            <div className="update-page-name">
                                <input type="text" placeholder={pages[pageId].pageName} onChange={handleChange}></input>
                            </div>
                        )}
                    </div>
                </div>
                <div className="header-right">
                    <div className="header-last-edit">
                        {hoursSinceLastUpdate > 24 ? `Edited ${Math.floor(hoursSinceLastUpdate / 24)}d ago` : `Edited ${hoursSinceLastUpdate}h ago`}
                    </div>
                    <div className="header-icons">
                        <HeaderItem props={{name: "share"}} />
                        <HeaderItem props={{name: "comment"}} />
                        <HeaderItem props={{name: "notifications"}} />
                        <HeaderItem props={{name: "favorite"}} />
                        <HeaderItem props={{name: "more"}} />
                    </div>
                </div>
            </>
        )
    } else return null;
}

export default Headers;