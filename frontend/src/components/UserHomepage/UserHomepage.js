import { useSelector } from 'react-redux'
import { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import Headers from './Headers'
import Sidebar from './Sidebar'
import Main from './Main'

const UserHomepage = (props) => {
    const user = useSelector((state) => state.session.user);
    const navigate = useNavigate();
    const [activeElement, setActiveElement] = useState('');
    const [sidebarWidth, setSidebarWidth] = useState(252);
    function handleMouseMove(e) {
        if (e.clientX > 0 && e.clientX < sidebarWidth) {
            setActiveElement('sidebar')
        } else {
            setActiveElement('main')
        }
    }

    function handleDrag(e) {
        e.preventDefault()
        const destination = e.clientX < 240 ? 240 : e.clientX < 300 ? e.clientX : 300
        const distance = destination - sidebarWidth
        // console.log(e)
        if (e.clientX !== 0) {
            setSidebarWidth(sidebarWidth + Math.min(10, distance / 10))
        }
        // console.log("dragging")
    }

    // style={{"width": "300px"}}
    if (user) {
        return (
            <div className='user-homepage' onMouseMove={handleMouseMove}>
                <div className='user-homepage-sidebar' style={{"width": sidebarWidth}}>  
                    <Sidebar active={activeElement === 'sidebar' ? 'true' : 'false'}/>
                </div>
                <div className='user-homepage-divider' draggable="true" onDrag={handleDrag}></div>
                <div className='user-homepage-right'>
                    <div className='user-homepage-headers'>
                        <Headers />
                    </div>
                    <div className='user-homepage-main'>
                        <Main active={activeElement === 'main' ? 'true' : 'false'}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
        <h1>Not logged in</h1>
        )
    }
}

export default UserHomepage