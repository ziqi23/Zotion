import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import Headers from './Header/Headers'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import Title from './Main/Title'
import TextOptionsToolbar from '../Overlay/TextOptionsToolbar'
import AllTeamspacesPanel from './Sidebar/AllTeamspacesPanel'

const UserHomepage = (props) => {
    const user = useSelector((state) => state.session.user);
    const [sidebarWidth, setSidebarWidth] = useState(252);

    function handleDrag(e) {
        e.preventDefault()
        const destination = e.clientX < 240 ? 240 : e.clientX < 300 ? e.clientX : 300
        const distance = destination - sidebarWidth
        if (e.clientX !== 0) {
            setSidebarWidth(sidebarWidth + Math.min(10, distance / 10))
        }
    }

    if (user) {
        return (
            <div className='user-homepage' >
                {localStorage.getItem('teamspace') ? <AllTeamspacesPanel width={sidebarWidth}/> : 
                    <div className='user-homepage-sidebar' style={{"width": sidebarWidth}}>  
                        <Sidebar />
                    </div>
                }
                <div className='user-homepage-sidebar-overlay' style={{"width": sidebarWidth}}></div>
                <div className='user-homepage-divider' draggable="true" onDrag={handleDrag}></div>
                <div className='user-homepage-right'>
                    <div className='user-homepage-headers'>
                        <Headers />
                    </div>
                    <div className='user-homepage-main'>
                        <Title />
                        <div className='user-homepage-main-textarea' id='user-homepage-main-textarea'>
                        <Main />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default UserHomepage