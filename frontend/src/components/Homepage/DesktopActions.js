import { Link } from "react-router-dom"


const DesktopActions = (props) => {
    function handleButtonClick(e) {
        e.preventDefault()
        switch (e.target.id) {
            case "login-button":
                <Link to="/login"></Link>
                break
            case "demo-login-button":
                <Link to="/login"></Link>
                break
            case "signup-button":
                <Link to="/signup"></Link>
                break
        }
    }
    return (
        <>
            <div className="homepage-nav-bar-left">
                <button id="product-button" onClick={handleButtonClick}>Product</button>
                <button id="download-button" onClick={handleButtonClick}>Download</button>
                <button id="solutions-button" onClick={handleButtonClick}>Solutions</button>
                <button id="resources-button" onClick={handleButtonClick}>Resources</button>
                <button id="pricing-button" onClick={handleButtonClick}>Pricing</button>
            </div>
            <div className="homepage-nav-bar-right">
                <button id="demo-login-button" onClick={handleButtonClick}>Demo login</button>
                <button id="login-button" onClick={handleButtonClick}>Log in</button>
                <button id="signup-button" onClick={handleButtonClick}>Get Notion free</button>
            </div>
        </>
    )
}

export default DesktopActions