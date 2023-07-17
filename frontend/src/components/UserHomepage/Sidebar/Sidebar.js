import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { logout } from "../../../store/session"
import { addPage } from "../../../store/page";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as pageActions from '../../../store/page'
import * as teamActions from '../../../store/team'
import SidebarItem from "./SidebarItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from "../Util/Tooltip";
import AddTeamPanel from "./AddTeamPanel";
import { restoreSession } from "../../../store/session";


const Sidebar = ({sidebarWidth}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [active, setActive] = useState('false');
    const [profileOpen, setProfileOpen] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [addTeamPanelVisible, setAddTeamPanelVisible] = useState(false) 
    const [addTeamToolTipVisible, setAddTeamTooltipVisible] = useState(false)
    const [addPageToolTipVisible, setAddPageTooltipVisible] = useState(false)
    const username = useSelector(state => state.session.user.username)
    const email = useSelector(state => state.session.user.email)
    const pages = useSelector(state => state.page)
    const teams = useSelector(state => state.team)

    useEffect(() => {
        dispatch(restoreSession())
        dispatch(teamActions.showAll())
    }, [])

    useEffect(() => {
        dispatch(pageActions.showAll())
    }, [teams])

    function handleMouseMove(e) {
        if (e.clientX > 0 && e.clientX < 240) {
            setActive('true')
        } else {
            setActive('false')
        }
    }
    
    function handleClick(e) {
        e.stopPropagation()
        switch (e.currentTarget.className) {
            case ("sidebar-profile-create-page"):
                dispatch(addPage({journalId: null}));
                break
            case ("sidebar-profile"):
                setProfileOpen(!profileOpen)
                break
            case ("logout"):
                dispatch(logout());
                navigate('/')
                break
            case ("add-page"):
                dispatch(addPage({journalId: null}));
                break
            case ("show-add-team-panel"):
                setAddTeamPanelVisible(true)
                function handlePanelClick(e) {
                    const panel = document.getElementById('add-team-panel')
                    const rect = panel?.getBoundingClientRect();
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;
                    if (mouseX < rect?.left || mouseX > rect?.right || mouseY < rect?.top || mouseY > rect?.bottom) {
                        setTimeout(() => setAddTeamPanelVisible(false), 0)
                        document.removeEventListener('click', handlePanelClick)
                    }
                }
                document.addEventListener("click", handlePanelClick)
                break
            default:
                break
        }
    }
    
    return (
        <div onMouseMove={handleMouseMove}>
            <div className="sidebar-profile" onClick={handleClick}>
                <div className="sidebar-profile-user">
                    <div className="sidebar-profile-user-icon">
                        {username[0]}
                    </div>
                    <div className="sidebar-profile-user-details">
                        {username.length > 8 ? username.slice(0, 8) : username}'s Zotion
                    </div>
                </div>
                <div 
                className="sidebar-profile-create-page"
                onClick={handleClick} 
                onMouseEnter={() => setTooltipVisible(true)} 
                onMouseLeave={() => setTooltipVisible(false)}>
                    <FontAwesomeIcon icon="pen-to-square"></FontAwesomeIcon>
                    {tooltipVisible && (
                        <Tooltip props={{"text": "Create a new page", "relativePosition": [200, 50]}} />
                    )}
                </div>
            </div>
            <div className="sidebar-default">
                <SidebarItem props={{"text": "Search", "type":"default", "icon": "magnifying-glass", sidebarWidth}}></SidebarItem>
                <SidebarItem props={{"text": "Updates", "type":"default", "icon": "clock", sidebarWidth}}></SidebarItem>
                <SidebarItem props={{"text": "All Teamspaces", "type":"default", "icon": "building-user", sidebarWidth}}></SidebarItem>
                <SidebarItem props={{"text": "Settings & Members", "type":"default", "icon": "gear", sidebarWidth}}></SidebarItem>
            </div>
            <div className="sidebar-personal">
                <div className="favorites">
                    <h1>Favorites</h1>
                    {Object.values(pages).map((page) => {
                        if (page.favorite) {
                            return <SidebarItem props={{"text": page.pageName, "pageId": page.id, "type": "personal"}}></SidebarItem>
                        }
                    })}
                </div>
                <div className="teamspaces">
                    <h1>
                        <span>Teamspaces</span>
                        {active === 'true' ? 
                            <span className="show-add-team-panel" onClick={handleClick}
                            onMouseEnter={() => setAddTeamTooltipVisible(true)} 
                            onMouseLeave={() => setAddTeamTooltipVisible(false)}>
                                <FontAwesomeIcon icon="fa-plus"></FontAwesomeIcon>
                            </span> : null}
                            {addTeamToolTipVisible && (
                                <Tooltip props={{"text": "New teamspace", "relativePosition": [250, 0]}} />
                            )}
                    </h1>
                    {Object.values(teams).map((team) => {
                        return <SidebarItem props={{"text": team.teamName, type: "team", teamId: team.id}}></SidebarItem>
                        
                    })}
                </div>
                <div className="private">
                    <h1>
                        <span>Private</span>
                        {active === 'true' ? 
                            <span className="add-page" onClick={handleClick}
                            onMouseEnter={() => setAddPageTooltipVisible(true)} 
                            onMouseLeave={() => setAddPageTooltipVisible(false)}>
                                <FontAwesomeIcon icon="fa-plus"></FontAwesomeIcon>
                            </span> : null}
                            {addPageToolTipVisible && (
                                <Tooltip props={{"text": "Add a page", "relativePosition": [250, 0]}} />
                            )}
                    </h1>
                    {Object.values(pages).map((page) => {
                        if (!page.journalId && !page.teamId) {
                            return <SidebarItem props={{"text": page.pageName, "pageId": page.id, "type": "personal"}}></SidebarItem>
                        } else return null;
                    })}
                </div>
            </div>
            {profileOpen && (
                <div className="profile-popup">
                    <div className="user-email">
                        {email}
                    </div>
                    <div className="current-user">
                        <div className="current-user-icon">
                            <p>{username[0]}</p>
                        </div>
                        <div className="current-user-details" onClick={() => setProfileOpen(false)}>
                            <p>{username}'s Notion</p>
                            <p className="current-user-plan">Free Plan · 1 member</p>
                        </div>
                    </div>
                    <div className="profile-popup-default">
                        <div className="logout" onClick={handleClick}>Log out</div>
                    </div>
                </div>
                )}
            {addTeamPanelVisible && (
                <AddTeamPanel setAddTeamPanelVisible={setAddTeamPanelVisible} />
            )}
        </div>
    )
}

export default Sidebar;