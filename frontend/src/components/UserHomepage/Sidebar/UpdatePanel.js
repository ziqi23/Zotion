import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function UpdatePanel(props) {
    return (
        <div className="update-panel" id="update-panel">
            <div className="update-panel-header">
                <div>Inbox</div>
            </div>
            <div className="update-panel-main">
                <FontAwesomeIcon icon='map' className='update-panel-icon' />
                <div>You're all caught up</div>
                <div>When someone @mentions you, replies to your comments, or invites you to a page, you'll be notified here.</div>
            </div>
        </div>
    )
}

export default UpdatePanel