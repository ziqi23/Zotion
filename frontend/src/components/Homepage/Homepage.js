import DesktopActions from "./DesktopActions"
import Icon from "./Icon"
import sketch from "../../assets/home-collab-sketch.avif"
import demo1 from "../../assets/demo-img-one.webp"
import { useEffect } from "react"

const Homepage = (props) => {
    return (
        <>
            <div className="homepage-header">
                <div className="homepage-header-inner">
                    <div className="homepage-nav-bar">
                        <div className="homepage-icon">
                            <Icon />
                        </div>
                        <div className="homepage-desktop-actions">
                            <DesktopActions />
                        </div>
                        <div className="homepage-mobile-actions">

                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage-main-content">
                <h1 id="homepage-language">Your wiki, docs, & projects. Together.</h1>
                <h4 id="homepage-language-two">Notion is the connected workspace where better, faster work happens.</h4>
                <img src={sketch}></img>
                <img src={demo1}></img>
            </div>
        </>
    )
}

export default Homepage