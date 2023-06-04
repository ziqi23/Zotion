import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgProfile } from 'react-icons/cg'
import { BsArrowUpRightSquare } from 'react-icons/bs'
import { FiGithub } from 'react-icons/fi'
import { RiLinkedinLine } from 'react-icons/ri'

function SettingPanel(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector(state => state.session.user.username)
    const email = useSelector(state => state.session.user.email)
    const [currentTab, setCurrentTab] = useState("Account");

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
                    <div className="setting-panel-left-my-account" onClick={() => setCurrentTab('Account')}>
                        <CgProfile />My Account
                    </div>
                    <div className="setting-panel-left-my-connections" onClick={() => setCurrentTab('Connections')}>
                        <BsArrowUpRightSquare />My Connections
                    </div>
                </div>
            </div>
            <div className="setting-panel-right">
                <div className="setting-panel-right-container">
                    <div className="setting-panel-right-details">
                        {currentTab === 'Account' && (
                            <>
                            <div className="setting-panel-account-header">
                                My Profile
                            </div>
                            <div className="setting-panel-profile-details">
                                <div className="setting-panel-account-icon">
                                    {username[0]}
                                </div>
                                <div className="setting-panel-account-profile">
                                    <div className="setting-panel-account-preferred-name">
                                        Preferred Name
                                    </div>
                                    <div className="setting-panel-account-name">
                                        {username}
                                    </div>
                                </div>
                            </div>
                            <div className="setting-panel-account-header">
                                Account Security
                            </div>
                            <div className="setting-panel-account-details">
                                <div className="setting-panel-account-email">
                                    <div className="setting-panel-account-email-left">
                                        <div className="setting-panel-title">Email</div>
                                        <div className="setting-panel-text">{email}</div>
                                    </div>
                                    <div className="setting-panel-account-email-right">
                                        Change email
                                    </div>
                                </div>
                                <div className="setting-panel-account-password">
                                    <div className="setting-panel-account-password-left">
                                        <div className="setting-panel-title">Password</div>
                                        <div className="setting-panel-text">Set a permanent password to login to your account.</div>
                                    </div>
                                    <div className="setting-panel-account-password-right">
                                        Change password
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
                        {currentTab === 'Connections' && (
                            <>
                            <div className="setting-panel-connections-header">
                                Discover new connections
                            </div>
                            <div className="setting-panel-connections-details">
                                <div className="setting-panel-connections-individual">
                                    <FiGithub />
                                    <div className="setting-panel-connections-description">
                                        View my latest projects on Github.
                                    </div>
                                    <div className="setting-panel-connections-button">
                                        Connect
                                    </div>
                                </div>
                                <div className="setting-panel-connections-individual">
                                    <RiLinkedinLine />
                                    <div className="setting-panel-connections-description">
                                        Find my profile on Linkedin.
                                    </div>
                                    <div className="setting-panel-connections-button">
                                        Connect
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SettingPanel