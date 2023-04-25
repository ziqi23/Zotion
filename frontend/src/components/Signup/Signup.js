import Icon from "../Homepage/Icon"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { login, signUpUser } from "../../store/session"
import { csrfFetch } from "../../store/csrf"
import { useNavigate } from "react-router-dom"

const Signup = (props) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signUpErrors, setSignUpErrors] = useState([''])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function isEmail(credential) {
    //     return credential.match(/^\S+@\S+\.\S+$/)
    // }

    async function handleSubmit(e) {
        e.preventDefault()

        dispatch(signUpUser({username, email, password}))
            .then((res => {
                navigate('/home')
            }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json()
                } catch {
                    data = await res.text()
                }
                if (data?.errors) setSignUpErrors(data.errors)
                else if (data) setSignUpErrors([data])
                else setSignUpErrors([res.statusText])
        })            

        // let username, email
        // if (isEmail(credential)) {
        //     email = credential
        //     csrfFetch('/api/users', {
        //         method: 'POST',
        //         body: JSON.stringify({email, password}),
        //         'Content-Type': 'application/json'
        //     })
        // } else {
        //     username = credential
        //     csrfFetch('/api/users', {
        //         method: 'POST',
        //         body: JSON.stringify({username, password}),
        //         'Content-Type': 'application/json'
        //     })
        // }
    }

    return (
        <>
            <div className="homepage-header">
                <div className="homepage-header-inner">
                    <div className="homepage-nav-bar">
                        <div className="homepage-icon">
                            <Icon />
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-main">
                <div className="login-field">
                    <h1>Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <br></br>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        <br></br>
                        <label>Email</label>
                        <br></br>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <label>Password</label>
                        <br></br>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <br></br>
                        <ul>
                            {signUpErrors.map((error, idx) => <div key={idx} className="error-message">{error}</div>)}
                        </ul>
                        <input type="submit" id="login-submit" value="Continue with password"></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup