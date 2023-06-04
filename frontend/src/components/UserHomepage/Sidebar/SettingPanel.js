import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SettingPanel(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector(state => state.session.user.username)
    const email = useSelector(state => state.session.user.email)

    return (
        <div className="setting-panel">
            <div className="overlay"></div>
            <div className="setting-panel-left">
                <div className="setting-panel-left-container">
                    <div className="setting-panel-left-header">Account</div>
                    <div className="setting-panel-left-profile">
                        <div className="setting-panel-left-profile-pic">{username[0]}</div>
                        <div className="setting-panel-left-profile-details">
                            <div className="setting-panel-left-profile-name">{username}</div>
                            <div className="setting-panel-left-profile-email">{email}</div>
                        </div>
                    </div>
                    <div className="setting-panel-left-my-account">My Account</div>
                    <div className="setting-panel-left-my-connections">My Connections</div>
                </div>
            </div>
            <div className="setting-panel-right">
                <div className="setting-panel-right-container">
                    <div className="setting-panel-right-details">

                    </div>
                </div>

            </div>
        </div>
    )
}

export default SettingPanel