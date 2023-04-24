import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { logout } from "../../store/session"
import { addPage } from "../../store/page";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as pageActions from '../../store/page'

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
    const [clickableOpen, setClickableOpen] = useState(false)

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
            case ('clickable'):
                setClickableOpen(!clickableOpen)
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
                <div className="clickable" onClick={handleClick}>
                    Search
                </div>
                <div className="clickable" onClick={handleClick}>
                    Updates
                </div>
                <div className="clickable" onClick={handleClick}>
                    All teamspaces
                </div>
                <div className="clickable" onClick={handleClick}>
                    Settings & members
                </div>
            </div>
            <div className="sidebar-personal">
                <div className="favorites">
                    <h1>Favorites</h1>
                    <div className="clickable" onClick={handleClick}>
                        Journal
                    </div>
                    <div className="clickable" onClick={handleClick}>
                        Getting Started
                    </div>
                    <div className="clickable" onClick={handleClick}>
                        Personal Home
                    </div>
                </div>
                <div className="teamspaces">
                    <h1>Teamspaces</h1>
                    <div className="clickable" onClick={handleClick}>
                        Home
                    </div>
                    <div className="clickable" onClick={handleClick}>
                        Wiki
                    </div>
                    <div className="clickable" onClick={handleClick}>
                        Tasks
                    </div>
                    <div className="clickable" onClick={handleClick}>
                        Projects
                    </div>
                </div>
                <div className="private">
                    <h1>
                        <span>Private</span>
                        {active === 'true' ? <span className="addPage" onClick={handleClick}>+</span> : null}
                    </h1>
                    {Object.values(pages).map((page) => {
                        return <div key={`${page.id}`} className="clickable" onClick={handleClick}>
                            {page.pageName}
                        </div>
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
            {clickableOpen && (
                <div className="clickable-dropdown">
                    <div className="clickable-delete">Delete Page</div>
                </div>
            )}
        </>
    )
}

export default Sidebar;