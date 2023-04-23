import { useSelector } from "react-redux";
import { useState } from "react";
const Sidebar = (props) => {
    const username = useSelector(state => state.session.user.username)
    const email = useSelector(state => state.session.user.email)
    const [open, setOpen] = useState(false)
    function handleClick(e) {
        console.log(e)
        switch (e.target.className) {
            case ("sidebar-profile"):
                setOpen(!open)
                break
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
                <div className="clickable">
                    Search
                </div>
                <div className="clickable">
                    Updates
                </div>
                <div className="clickable">
                    All teamspaces
                </div>
                <div className="clickable">
                    Settings & members
                </div>
            </div>
            <div className="sidebar-personal">
                <div className="favorites">
                    <h1>Favorites</h1>
                    <div className="clickable">
                        Journal
                    </div>
                    <div className="clickable">
                        Getting Started
                    </div>
                    <div className="clickable">
                        Personal Home
                    </div>
                </div>
                <div className="teamspaces">
                    <h1>Teamspaces</h1>
                    <div className="clickable">
                        Home
                    </div>
                    <div className="clickable">
                        Wiki
                    </div>
                    <div className="clickable">
                        Tasks
                    </div>
                    <div className="clickable">
                        Projects
                    </div>
                </div>
                <div className="private">
                    <h1>Private</h1>
                    <div className="clickable">
                        Reading List
                    </div>
                    <div className="clickable">
                        Tasks
                    </div>
                    <div className="clickable">
                        Journal
                    </div>
                    <div className="clickable">
                        Getting Started
                    </div>
                    <div className="clickable">
                        Personal Home
                    </div>
                </div>
            </div>
            {open && (
                <div className="profile-popup">
                    <div className="user-email">
                        {email}
                    </div>
                    <div className="current-user">

                    </div>
                    <div className="profile-popup-default">
                        <h1>Add another account</h1>
                        <h1>Log out</h1>
                    </div>
                </div>
                )}
        </>
    )
}

export default Sidebar;