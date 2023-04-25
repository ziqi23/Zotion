import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deletePage } from "../../store/page"
import Tooltip from "./Tooltip"

const SidebarItem = ({props}) => {
    const text = props.text
    const pageId = props.pageId
    const type = props.type
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pages = useSelector(state => state.page)
    const [clickableOpen, setClickableOpen] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false) 
    function handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        switch (e.currentTarget.className) {
            case ('clickable'):
                setClickableOpen(!clickableOpen)
                break
            case ('clickable-delete'):
                if (pageId) {
                    dispatch(deletePage({pageId}))
                    setClickableOpen(!clickableOpen)
                }
                break
            default:
                break
        }
    }

    function handleShowPage(e) {
        e.preventDefault();
        navigate(`/home?pageId=${pageId}`)
    }
    let tooltipText;
    let relativePosition = [200, 0];
    if (type === "default") {
        switch (text) {
            case ("Search"):
                tooltipText = "Search and quickly jump to a page"
                break
            case ("Updates"):
                tooltipText = "Updates for all pages in this workspace"
                break
            case ("All Teamspaces"):
                tooltipText = "Browse all teamspaces"
                break
            
        }
    }

    return (
        <div 
        key={pageId} 
        className="clickable" 
        onContextMenu={handleClick} 
        onClick={handleShowPage} 
        onMouseEnter={() => setTooltipVisible(true)} 
        onMouseLeave={() => setTooltipVisible(false)}>
            {text}
            {clickableOpen && (
                <div className="clickable-dropdown">
                    <div className="clickable-delete" onClick={handleClick}>Delete Page</div>
                </div>
            )}
            {tooltipVisible && tooltipText && (
            <Tooltip props={{"text": tooltipText, "relativePosition": relativePosition}} />
            )}
        </div>
        
    )
}

export default SidebarItem