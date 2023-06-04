import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgProfile } from 'react-icons/cg'
import { BsArrowUpRightSquare } from 'react-icons/bs'
import { FiGithub } from 'react-icons/fi'
import { RiLinkedinLine } from 'react-icons/ri'
import { login, updateUser } from "../../../store/session";
import { TfiPencilAlt } from 'react-icons/tfi'
import { Link } from "react-router-dom";

function SettingPanel(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector(state => state.session.user.username)
    const email = useSelector(state => state.session.user.email)
    const [currentTab, setCurrentTab] = useState("Account");
    const [showChangeEmailPanel, setShowChangeEmailPanel] = useState(false);
    const [showChangePasswordPanel, setShowChangePasswordPanel] = useState(false);
    const [userInputPassword, setUserInputPassword] = useState('');
    const [userCredentialVerified, setUserCredentialVerified] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (showChangeEmailPanel) {
            document.addEventListener('mousedown', closeChangeEmailPanel)

            function closeChangeEmailPanel(e) {
                const panel = document.querySelector('.change-email-panel')
                const rect = panel?.getBoundingClientRect()
                if (e.clientX < rect?.left || e.clientX > rect?.right || e.clientY < rect?.top || e.clientY > rect?.bottom) {
                    setTimeout(setShowChangeEmailPanel(false), 0);
                    document.removeEventListener('mousedown', closeChangeEmailPanel)
                }
            }
        }
        if (showChangePasswordPanel) {
            document.addEventListener('mousedown', closeChangePasswordPanel)

            function closeChangePasswordPanel(e) {
                const panel = document.querySelector('.change-password-panel')
                const rect = panel?.getBoundingClientRect()
                if (e.clientX < rect?.left || e.clientX > rect?.right || e.clientY < rect?.top || e.clientY > rect?.bottom) {
                    setTimeout(setShowChangePasswordPanel(false), 0)
                    document.removeEventListener('mousedown', closeChangePasswordPanel)
                }
            }

        }
    }, [showChangeEmailPanel, showChangePasswordPanel])

    async function checkUserCredentials() {
        const res = await dispatch(login({credential: email, password: userInputPassword}));
        // const data = res.json()
        console.log(res)
        if (res) {
            setUserCredentialVerified(true);
            return true;
        }
        return false;
    }

    function handleSubmitChange(e) {
        e.preventDefault();
        if (e.target.className === 'confirm-email-change' && userCredentialVerified) {
            const res = dispatch(updateUser({credential: newEmail}))
            if (res.error) {
                setErrorMessage(res.error)
            } else {
                setShowChangeEmailPanel(false)
            }
        }

        if (e.target.className === 'confirm-password-change' && newPassword === newPasswordConfirmation) {
            if (checkUserCredentials()) {
                const res = dispatch(updateUser({password: newPassword}))
                if (res.error) {
                    setErrorMessage(res.error)
                } else {
                    setShowChangePasswordPanel(false)
                }
            }
        }
    }

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
                                    <div className="setting-panel-account-email-right" onClick={() => setShowChangeEmailPanel(true)}>
                                        Change email
                                    </div>
                                </div>
                                <div className="setting-panel-account-password">
                                    <div className="setting-panel-account-password-left">
                                        <div className="setting-panel-title">Password</div>
                                        <div className="setting-panel-text">Set a permanent password to login to your account.</div>
                                    </div>
                                    <div className="setting-panel-account-password-right" onClick={() => setShowChangePasswordPanel(true)}>
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
                                        <a target="_blank" href="https://github.com/ziqi23">Connect</a>
                                    </div>
                                </div>
                                <div className="setting-panel-connections-individual">
                                    <RiLinkedinLine />
                                    <div className="setting-panel-connections-description">
                                        Find my profile on Linkedin.
                                    </div>
                                    <div className="setting-panel-connections-button">
                                        <a target="_blank" href="https://www.linkedin.com/in/ziqi-zou/">Connect</a>
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {showChangeEmailPanel && (
                <div className="change-email-panel">
                    <div className="change-email-panel-first-line">
                        Your current email is <b>{email}</b>
                    </div>
                    <div className="change-email-panel-second-line">
                        Please enter your password.
                    </div>
                    <div className="change-email-panel-third-line">
                        <input type="password" placeholder="Password" onChange={(e) => setUserInputPassword(e.target.value)}></input>
                    </div>
                    {!userCredentialVerified && (
                    <div className="confirm-email-change" onClick={checkUserCredentials}>
                        Continue
                    </div>
                    )}
                    {userCredentialVerified && (
                        <>
                        <div className="change-email-panel-second-line">
                            Please enter your new email.
                        </div>
                        <div className="change-email-panel-third-line">
                            <input placeholder="Enter new email" onChange={(e) => setNewEmail(e.target.value)}></input>
                        </div>
                        <div className="confirm-email-change" onClick={handleSubmitChange}>
                            Change email
                        </div>
                        </>
                    )}
                    {errorMessage && (
                        <div>{errorMessage}</div>
                    )}
                </div>
            )}
            {showChangePasswordPanel && (
                <div className="change-password-panel">
                    <div className="change-password-panel-header">
                        <div className="change-password-panel-first-line"><TfiPencilAlt /></div>
                        <div className="change-password-panel-second-line">Change password</div>
                        <div className="change-password-panel-third-line">Use a password at least 6 letters long.</div>
                    </div>
                    <div className="change-password-panel-title-line">Enter your current password</div>
                    <div className="change-email-panel-third-line">
                        <input type="password" placeholder="Current password" onChange={(e) => setUserInputPassword(e.target.value)}></input>
                    </div>
                    <div className="change-password-panel-title-line">Enter a new password</div>
                    <div className="change-email-panel-third-line">
                        <input placeholder="New password"  onChange={(e) => setNewPassword(e.target.value)}></input>
                    </div>
                    <div className="change-password-panel-title-line">Confirm your new password</div>
                    <div className="change-email-panel-third-line">
                        <input placeholder="Confirm password"  onChange={(e) => setNewPasswordConfirmation(e.target.value)}></input>
                    </div>
                    <div className="confirm-password-change" onClick={handleSubmitChange}>Change password</div>
                </div>
            )}
        </div>
    )
}

export default SettingPanel