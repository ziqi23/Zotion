import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deletePage } from "../../store/page"
import Tooltip from "./Tooltip"
import { showAssociatedPages } from "../../store/page"
import { addPage } from "../../store/page"
import { useEffect } from "react"

const SidebarItem = ({props}) => {
    const text = props.text
    const pageId = props.pageId
    const type = props.type
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pages = useSelector(state => state.page)
    const [clickableOpen, setClickableOpen] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false) 
    const [carrotDown, setCarrotDown] = useState(false)
    const [embeddedPages, setEmbeddedPages] = useState([])
    useEffect(() => {
        if (pageId) {
            dispatch(showAssociatedPages(pageId))
                .then(res => {
                    setEmbeddedPages(Object.values(res))
                })
        }
    }, [pages])

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
            case ('add-page'):
                dispatch(addPage({journalId: pageId}));
                break
            default:
                break
        }
    }
    function handleCarrotClick(e) {
        e.preventDefault()
        setCarrotDown(!carrotDown)
    }

    function handleShowPage(e) {
        console.log(e)
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
        style={carrotDown ? {"height": "auto"} : {}}
        onContextMenu={handleClick} 
        onClick={handleShowPage} 
        onMouseEnter={() => setTooltipVisible(true)} 
        onMouseLeave={() => setTooltipVisible(false)}>
            
            {props.type === "personal" && (
            <button onClick={handleCarrotClick} style={carrotDown ? {"transform": "rotateZ(90deg)"} : {}}>
                &#62;
            </button>
            )}
            {text}
            {props.type === "personal" && (
                <span className="add-page" onClick={handleClick}>+</span>
            )}

            {carrotDown && (
                <>
                {embeddedPages.length > 0 && (
                    embeddedPages.map((page) => {
                        return <SidebarItem key={page.id} props={{"text": page.pageName, "pageId": page.id, "type": "personal"}}></SidebarItem>
                    })
                )}
                {embeddedPages.length === 0 && (
                    <div>No pages inside</div>
                )}
                
                </>
            )}
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