import DesktopActions from "./DesktopActions"
import Icon from "./Icon"
import sketch1 from "../../assets/homepage-visuals/home-collab-sketch.avif"
import demo1 from "../../assets/homepage-visuals/demo-img-one.webp"
import sketch2 from "../../assets/homepage-visuals/wiki-illustration.png"
import demo2 from "../../assets/homepage-visuals/wiki.png"
import sketch3 from "../../assets/homepage-visuals/docs-illustration.png"
import demo3 from "../../assets/homepage-visuals/docs.png"
import sketch4 from "../../assets/homepage-visuals/projects-illustration.png"
import demo4 from "../../assets/homepage-visuals/projects.png"
import sketch5 from '../../assets/homepage-visuals/parade.png'
import animation1 from '../../assets/homepage-visuals/animation.svg'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react";

const Homepage = (props) => {

    const navigate = useNavigate();
    const ref = useRef(null);
    useEffect(() => {
        console.log("1", ref.current)
        const observer = new IntersectionObserver(([e]) => 
            e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
            { threshold: [1] }
        );
        observer.observe(ref.current);
    }, )

    async function handleButtonClick(e) {
        e.preventDefault()
        if (e.target.id === 'signup-button') {
            navigate('/signup')
        }
    }

    return (
        <>
            <div ref={ref} className="homepage-header">
                <div className="homepage-header-border">
                    <div className="homepage-header-inner">
                        <div className="homepage-nav-bar">
                            <div className="homepage-icon">
                                <Icon />
                            </div>
                            <div className="homepage-desktop-actions">
                                <DesktopActions />
                            </div>
                            {/* <div className="homepage-mobile-actions">

                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage-main-content">
                <h1 id="homepage-language">Your wiki, docs, & projects. Together.</h1>
                <h4 id="homepage-language-two">Zotion is the connected workspace where better, faster work happens.</h4>
                <img src={sketch1}></img>
                <img id="homepage-pic" src={demo1}></img>
                <h4 id="homepage-language-three">Finally, all your work in one place</h4>
                <div>
                    <div id="homepage-illustration-one">
                        <div>
                            <h1 id="homepage-illustration-language-one">
                                Wikis
                            </h1>
                            <h1 id="homepage-illustration-language-two">
                                It’s hard to move fast if you can’t find anything. Centralize all your knowledge in Zotion.
                            </h1>
                            <img id="homepage-illustration-sketch" src={sketch2}></img>
                        </div>
                        <div>
                            <img id="homepage-demo-pic" src={demo2}></img>
                        </div>
                    </div>
                    <div id="homepage-illustration-two"> 
                        <div>
                            <h1 id="homepage-illustration-language-one">
                                Docs
                            </h1>
                            <h1 id="homepage-illustration-language-two">
                                Simple. Powerful. Beautiful. Communicate more efficiently with next generation docs.
                            </h1>
                            <img id="homepage-illustration-sketch" src={sketch3}></img>
                        </div>
                        <div>
                            <img id="homepage-demo-pic" src={demo3}></img>
                        </div>
                    </div>
                    <div id="homepage-illustration-three">
                        <div>
                            <h1 id="homepage-illustration-language-one">
                                Projects
                            </h1>
                            <h1 id="homepage-illustration-language-two">
                                Manage any type of project more efficiently. No separate, clunky system.
                            </h1>
                            <img id="homepage-illustration-sketch" src={sketch4}></img>
                        </div>
                        <div>
                            <img id="homepage-demo-pic" src={demo4}></img>
                        </div>
                    </div>
                </div>
                <h1 id="homepage-footer-language-one">Get started for free</h1>
                <h1 id="homepage-footer-language-two">Play around with it first. Pay and add your team later.</h1>
                <button id="signup-button" onClick={handleButtonClick}>Get Zotion free</button>
                <img id="homepage-footer-sketch" src={sketch5}></img>
            </div>
        </>
    )
}

export default Homepage