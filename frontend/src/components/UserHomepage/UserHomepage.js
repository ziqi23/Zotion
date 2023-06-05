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
    const [displayContent, setDisplayContent] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 600) {
            setDisplayContent(false)
        } else {
            setDisplayContent(true)
        }
        window.addEventListener('resize', handleResize)
        function handleResize(e) {
            console.log(window.innerWidth)
            if (window.innerWidth < 600) {
                setDisplayContent(false)
            } else {
                setDisplayContent(true)
            }
        }
    }, [])



    function handleDrag(e) {
        e.preventDefault()
        const destination = e.clientX < 240 ? 240 : e.clientX < 300 ? e.clientX : 300
        const distance = destination - sidebarWidth
        if (e.clientX !== 0) {
            setSidebarWidth(sidebarWidth + Math.min(10, distance / 10))
        }
    }
    if (user && displayContent) {
        return (
            <div className='user-homepage' >
                {localStorage.getItem('teamspace') ? <AllTeamspacesPanel width={sidebarWidth}/> : 
                    <div className='user-homepage-sidebar' style={{"width": sidebarWidth}}>  
                        <Sidebar />
                    </div>
                }
                <div className='user-homepage-divider' style={{"marginLeft": sidebarWidth}} draggable="true" onDrag={handleDrag}></div>
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
    } else if (!displayContent) {
        return (
            <h1 className='mobile-pop-up'>This application is optimized for desktop users. For the best user experience, please use a desktop or laptop device.</h1>
        )
    } else {
        return null;
    }
}

export default UserHomepage