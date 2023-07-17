import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
const DesktopActions = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    async function handleButtonClick(e) {
        e.preventDefault()
        switch (e.target.id) {
            case "login-button":
                navigate('/login')
                break
            case "demo-login-button":
                dispatch(login({credential: "Ziqi", password: "123456"}))
                navigate('home')
                break
            case "signup-button":
                navigate('/signup')
                break;
        }
    }
    return (
        <>
            <div className="homepage-nav-bar-left" style={{visibility: "hidden"}}>
                {/* <button id="product-button" onClick={handleButtonClick}>Product</button>
                <button id="download-button" onClick={handleButtonClick}>Download</button>
                <button id="solutions-button" onClick={handleButtonClick}>Solutions</button>
                <button id="resources-button" onClick={handleButtonClick}>Resources</button>
                <button id="pricing-button" onClick={handleButtonClick}>Pricing</button> */}
            </div>
            <div className="homepage-nav-bar-right">
                <button id="demo-login-button" onClick={handleButtonClick}>Demo login</button>
                <div className="button-divider"></div>
                <button id="login-button" onClick={handleButtonClick}>Log in</button>
                <button id="signup-button" onClick={handleButtonClick}>Get Zotion free</button>
            </div>
        </>
    )
}

export default DesktopActions