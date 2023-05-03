import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deletePage } from "../../../store/page"
import Tooltip from "../Util/Tooltip"
import { showAssociatedPages, showAll } from "../../../store/page"
import { showAssociatedPages as showTeamPages } from "../../../store/team"
import { addPage } from "../../../store/page"
import { modifyPage } from "../../../store/page"
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SidebarItem = ({props}) => {
    const icon = props.icon || "file-lines"
    const text = props.text
    const pageId = props.pageId
    const teamId = props.teamId
    const type = props.type
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pages = useSelector(state => state.page)
    const teams = useSelector(state => state.team)
    const [clickableOpen, setClickableOpen] = useState(false) // Used to track whether "Delete Page" pop-up is visible
    const [tooltipVisible, setTooltipVisible] = useState(false) // Used to track whether tooltip is visible
    const [addPageTooltipVisible, setAddPageTooltipVisible] = useState(false) // Used to track whether "Add Page" tooltip is visible
    const [carrotDown, setCarrotDown] = useState(false) // Used to track whether carrot button has been pressed
    const [embeddedPages, setEmbeddedPages] = useState([]) // Used to track embedded content to be displayed on carrot button press

    useEffect(() => {
        if (pageId) {
            dispatch(showAssociatedPages(pageId))
                .then(res => {
                    setEmbeddedPages(Object.values(res))
                })
        } else if (teamId) {
            dispatch(showTeamPages(teamId))
                .then(res => {
                    setEmbeddedPages(Object.values(res))
                })
            }
        // dispatch(showAll())
        }, [pages, teams])

    useEffect(() => {
        dispatch(showAll())
    }, [teams])

    // Handle left and right click actions on the sidebar
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
                setCarrotDown(true)
                if (teamId) {
                    dispatch(addPage({teamId: teamId}))
                } else {
                    dispatch(addPage({journalId: pageId}));
                }
                break
            default:
                break
        }
    }

    // Toggle carrot position on user mouse click
    function handleCarrotClick(e) {
        e.preventDefault()
        setCarrotDown(!carrotDown)
    }

    // Append pageId to URL when user clicks on a page
    function handleShowPage(e) {
        e.stopPropagation();
        e.preventDefault();
        navigate(`/home?pageId=${pageId}`)
    }

    // Handle another sidebar item hovered over
    let dragStartId;
    let dragEndId;

    function handleDragStart(e) {
        dragStartId = e.target.getAttribute("data-id")
        e.dataTransfer.setData("text/plain", dragStartId)
    }

    function handleDragEnter(e) {
        if (e.currentTarget.id === "user-journal-page" || e.currentTarget.id === "user-team-page") {
            e.preventDefault()
            e.dataTransfer.effectAllowed = "move"
            e.dataTransfer.dropEffect = "move"
        }
    }

    function handleDragOver(e) {
        if (e.currentTarget.id === "user-journal-page" || e.currentTarget.id === "user-team-page") {
            e.preventDefault()
            e.dataTransfer.effectAllowed = "move"
            e.dataTransfer.dropEffect = "move"
            e.currentTarget.style.backgroundColor = "rgb(143, 142, 137, 0.3)"
        }
    }

    function handleDragLeave(e) {
        e.currentTarget.style.backgroundColor = ''
    }

    function handleDrop(e) {
        e.currentTarget.style.backgroundColor = ''
        dragStartId = (e.dataTransfer.getData("text/plain"))
        dragEndId = e.currentTarget.getAttribute("data-id")

        if (e.currentTarget.id === "user-journal-page" && dragStartId !== dragEndId) {
            dispatch(modifyPage({id: dragStartId, journalId: dragEndId, teamId: null}))
        } else if (e.currentTarget.id === "user-team-page") {
            dispatch(modifyPage({id: dragStartId, teamId: dragEndId, journalId: null}))
        }
    }

    // Setup tooltip text and display position relative to DOM element
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
        id={pageId ? "user-journal-page" : teamId ? "user-team-page" : ""}
        data-id={pageId || teamId}
        draggable="true"
        style={carrotDown ? {"height": "auto"} : {}}
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onContextMenu={handleClick} 
        onClick={handleShowPage} 
        onMouseEnter={() => setTooltipVisible(true)} 
        onMouseLeave={() => setTooltipVisible(false)}>
            
            {/* Add > Button */}
            {(props.type === "personal") && (
            <>
            <div className="sidebar-icon-carrot-holder" onClick={handleCarrotClick} style={carrotDown ? {"transform": "rotateZ(90deg)"} : {}}>
                <FontAwesomeIcon icon={`fa-chevron-right`} className="sidebar-icon-carrot"></FontAwesomeIcon>
            </div>
            </>

            // Add customized icons based on sidebar item
            )}
            {(props.type === "personal" || props.type === "default") && (
                <FontAwesomeIcon icon={`fa-${icon}`} className="sidebar-icon"></FontAwesomeIcon>
            )} 
            {(props.type === "team") && (
                <div className="sidebar-icon-teamspace">
                    {teams[teamId].teamName[0]}
                </div>
            )}

            {/* Add text field */}
            <div className="sidebar-page-name">{text}</div>

            {/* Add > for teamspaces which come after text */}
            {(props.type === "team") && (
            <div className="sidebar-icon-carrot-team-holder" onClick={handleCarrotClick} style={carrotDown ? {"transform": "rotateZ(90deg)"} : {}}>
                {tooltipVisible && (
                    <FontAwesomeIcon icon={`fa-chevron-right`} className="sidebar-icon-carrot-team"></FontAwesomeIcon>
                )}
            </div>
            )}

            {/* Add icon for creating a new page within a team */}
            {props.type === "team" && (  
                <div className="add-page" onClick={handleClick} 
                onMouseEnter={() => setAddPageTooltipVisible(true)} 
                onMouseLeave={() => setAddPageTooltipVisible(false)}>
                    {tooltipVisible && (
                        <FontAwesomeIcon icon={`fa-plus`}></FontAwesomeIcon>
                    )}
                    {addPageTooltipVisible && (
                        <Tooltip props={{"text": "Quickly add a page inside", "relativePosition": [250, 0]}} />
                    )}
                </div>
            )}

            {/* Add icon for creating a new page within a page */}
            {props.type === "personal" && (  
                <div className="add-page" onClick={handleClick} 
                onMouseEnter={() => setAddPageTooltipVisible(true)} 
                onMouseLeave={() => setAddPageTooltipVisible(false)}>
                    {tooltipVisible && (
                        <FontAwesomeIcon icon={`fa-plus`}></FontAwesomeIcon>
                    )}
                    {addPageTooltipVisible && (
                        <Tooltip props={{"text": "Quickly add a page inside", "relativePosition": [250, 0]}} />
                    )}
                </div>
            )}

            {/* Logic for showing embedded content when user clicks on carrot */}
            {carrotDown && (
                <>
                {embeddedPages.length > 0 && (
                    embeddedPages.map((page) => {
                        return <SidebarItem key={page.id} props={{"text": page.pageName, "pageId": page.id, "type": "personal"}}></SidebarItem>
                    })
                )}
                {embeddedPages.length === 0 && (
                    <div className="no-pages-inside">No pages inside</div>
                )}
                </>
            )}

            {/* Logic for displaying option to delete page on user right click */}
            {clickableOpen && (
                <div className="clickable-dropdown">
                    <div className="clickable-delete" onClick={handleClick}>Delete Page</div>
                </div>
            )}

            {/* Logic for conditionally displaying tooltip on mouse hover*/}
            {tooltipVisible && tooltipText && (
            <Tooltip props={{"text": tooltipText, "relativePosition": relativePosition}} />
            )}
        </div>
        
    )
}

export default SidebarItem