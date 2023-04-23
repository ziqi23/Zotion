import { useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import Headers from './Headers'
import Sidebar from './Sidebar'
import Main from './Main'

const UserHomepage = (props) => {
    const user = useSelector((state) => state.session.user)
    const navigate = useNavigate();
    if (user.id) {
        return (
            <div className='user-homepage'>
                <div className='user-homepage-sidebar'>
                    <Sidebar />
                </div>
                <div className='user-homepage-right'>
                    <div className='user-homepage-headers'>
                        <Headers />
                    </div>
                    <div className='user-homepage-main'>
                        <Main />
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