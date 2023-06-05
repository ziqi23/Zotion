import Icon from "../Homepage/Icon"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([''])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault()
        dispatch(login({credential, password}))
            .then(() => navigate('/home'))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json()
                } catch {
                    data = await res.text()
                }
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data])
                else setErrors([res.statusText])
            })
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
                    <h1>Log in</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Username or Email</label>
                        <br></br>
                        <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)}></input>
                        <br></br>
                        <label>Password</label>
                        <br></br>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <br></br>
                        <ul>
                            {errors.map((error, idx) => <div key={idx} className="error-message">{error}</div>)}
                        </ul>
                        <input type="submit" id="login-submit" value="Continue with password"></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login