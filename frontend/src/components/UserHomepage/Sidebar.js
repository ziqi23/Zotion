import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { logout } from "../../store/session"
import { addPage } from "../../store/page";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as pageActions from '../../store/page'
import SidebarItem from "./SidebarItem";

const Sidebar = ({active}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector(state => state.session.user.username)
    const email = useSelector(state => state.session.user.email)
    const pages = useSelector(state => state.page)
    // console.log(active)
    useEffect(() => {
        dispatch(pageActions.showAll())
    }, [])
    
    const [profileOpen, setProfileOpen] = useState(false)

    function handleClick(e) {
        console.log(e)
        switch (e.target.className) {
            case ("sidebar-profile"):
                setProfileOpen(!profileOpen)
                break
            case ("logout"):
                dispatch(logout());
                navigate('/')
                break
            case ("addPage"):
                dispatch(addPage());
            default:
                break
        }
    }
    return (
        <>
            <div className="sidebar-profile" onClick={handleClick}>
                {username}'s Notion
            </div>
            <div className="sidebar-default">
                <SidebarItem props={{"text": "Search"}}></SidebarItem>
                <SidebarItem props={{"text": "Updates"}}></SidebarItem>
                <SidebarItem props={{"text": "All Teamspaces"}}></SidebarItem>
                <SidebarItem props={{"text": "Settings & Members"}}></SidebarItem>
            </div>
            <div className="sidebar-personal">
                <div className="favorites">
                    <h1>Favorites</h1>
                    {Object.values(pages).map((page) => {
                        if (page.favorite) {
                            return <SidebarItem props={{"text": page.pageName}}></SidebarItem>
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
                        {active === 'true' ? <span className="addPage" onClick={handleClick}>+</span> : null}
                    </h1>
                    {Object.values(pages).map((page) => {
                        return <SidebarItem props={{"text": page.pageName, "pageId": page.id}}></SidebarItem>
                    })}
                </div>
            </div>
            {profileOpen && (
                <div className="profile-popup">
                    <div className="user-email">
                        {email}
                    </div>
                    <div className="current-user">

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