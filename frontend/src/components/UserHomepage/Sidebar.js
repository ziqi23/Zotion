import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { logout } from "../../store/session"
import { addPage } from "../../store/page";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as pageActions from '../../store/page'
import SidebarItem from "./SidebarItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from "./Tooltip";


const Sidebar = ({active}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector(state => state.session.user.username)
    const [tooltipVisible, setTooltipVisible] = useState(false) 
    const email = useSelector(state => state.session.user.email)
    const pages = useSelector(state => state.page)
    // console.log(active)
    useEffect(() => {
        dispatch(pageActions.showAll())
    }, [])
    
    const [profileOpen, setProfileOpen] = useState(false)

    function handleClick(e) {
        console.log(e)
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
            default:
                break
        }
    }
    return (
        <>
            <div className="sidebar-profile" onClick={handleClick}>
                <div className="sidebar-profile-user">
                    <div className="sidebar-profile-user-icon">
                        {username[0]}
                    </div>
                    <div className="sidebar-profile-user-details">
                        {username}'s Notion
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
                <SidebarItem props={{"text": "Search", "type":"default", "icon": "magnifying-glass"}}></SidebarItem>
                <SidebarItem props={{"text": "Updates", "type":"default", "icon": "clock"}}></SidebarItem>
                <SidebarItem props={{"text": "All Teamspaces", "type":"default", "icon": "building-user"}}></SidebarItem>
                <SidebarItem props={{"text": "Settings & Members", "type":"default", "icon": "gear"}}></SidebarItem>
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
                    <h1>Teamspaces</h1>
                    <SidebarItem props={{"text": "Home"}}></SidebarItem>
                    <SidebarItem props={{"text": "Wiki"}}></SidebarItem>
                    <SidebarItem props={{"text": "Tasks"}}></SidebarItem>
                    <SidebarItem props={{"text": "Projects"}}></SidebarItem>
                </div>
                <div className="private">
                    <h1>
                        <span>Private</span>
                        {active === 'true' ? 
                            <span className="add-page" onClick={handleClick}>
                                <FontAwesomeIcon icon="fa-plus"></FontAwesomeIcon>
                            </span> : null}
                    </h1>
                    {Object.values(pages).map((page) => {
                        if (!page.journalId) {
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
                        <div className="current-user-details">
                            <p>{username}'s Notion</p>
                            <p className="current-user-plan">Free Plan · 1 member</p>
                        </div>
                    </div>
                    <div className="profile-popup-default">
                        <div>Add another account</div>
                        <div className="logout" onClick={handleClick}>Log out</div>
                    </div>
                </div>
                )}
        </>
    )
}

export default Sidebar;