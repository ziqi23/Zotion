import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deletePage } from "../../../store/page"
import Tooltip from "../Util/Tooltip"
import { showAssociatedPages, showAll } from "../../../store/page"
import { showAssociatedPages as showTeamPages } from "../../../store/team"
import { addPage } from "../../../store/page"
import { modifyPage } from "../../../store/page"
import { leaveTeam } from "../../../store/team"
import SearchPanel from "./SearchPanel"
import UpdatePanel from './UpdatePanel'
import SettingPanel from './SettingPanel'
import AllTeamspacesPanel from "./AllTeamspacesPanel"
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SidebarItem = ({props}) => {
    const icon = props.icon || "file-lines"
    const text = props.text || ""
    const pageId = props.pageId
    const teamId = props.teamId
    const type = props.type
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session)
    const pages = useSelector(state => state.page)
    const teams = useSelector(state => state.team)
    const [searchOpen, setSearchOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [settingOpen, setSettingOpen] = useState(false)
    const [leaveTeamPanelOpen, setLeaveTeamPanelOpen] = useState(false)
    const [teamspaceOpen, setTeamspaceOpen] = useState(false)
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
        }, [pages, teams])

    // Handle left and right click actions on the sidebar
    function handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        switch (e.currentTarget.className) {
            case ('clickable'):
                if (pageId) {
                    setClickableOpen(!clickableOpen)
                }
                if (teamId) {
                    setLeaveTeamPanelOpen(!leaveTeamPanelOpen)
                }
                break
            case ('clickable-dropdown-container'):
                if (pageId) {
                    dispatch(deletePage({pageId}))
                    setClickableOpen(!clickableOpen)
                    navigate(`/home`)
                }
                if (teamId) {
                    dispatch(leaveTeam(teamId))
                    setLeaveTeamPanelOpen(!leaveTeamPanelOpen)
                    navigate(`/home`)
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
        if (type === "personal") {
            navigate(`/home?pageId=${pageId}`)
        } else if (type === "default") {
            setTooltipVisible(false)
            switch (text) {
                case "Search":
                    setSearchOpen(true)

                    function handleSearchClick(e) {
                        const results = document.querySelectorAll('.result-item')
                        results.forEach(result => {
                            result.addEventListener('mouseup', handleSearchPanelClick)
                        })
                        document.querySelector('.overlay')?.addEventListener('mouseup', handleOverlayClick)
    
                        function handleOverlayClick(e) {
                            const panel = document.getElementById('search-panel')
                            const rect = panel?.getBoundingClientRect();
                            const mouseX = e.clientX;
                            const mouseY = e.clientY;
                            if (mouseX < rect?.left || mouseX > rect?.right || mouseY < rect?.top || mouseY > rect?.bottom) {
                                setTimeout(() => setSearchOpen(false), 0)
                                document.querySelector('.overlay')?.removeEventListener('mouseup', handleOverlayClick)
                                results.forEach(result => {
                                    result.removeEventListener('mouseup', handleOverlayClick)
                                })
                            }
                        }
    
                        function handleSearchPanelClick(e) {
                            if (e.currentTarget.className === 'result-item') {
                                setTimeout(() => setSearchOpen(false), 0)
                                document.removeEventListener('mouseup', handleSearchPanelClick)
                                results.forEach(result => {
                                    result.removeEventListener('mouseup', handleSearchPanelClick)
                                })
                            }
                        }
                    }
                    document.addEventListener('mousedown', handleSearchClick)
                    break
                case "Updates":
                    setUpdateOpen(true)
                    function handleUpdatePanelClick(e) {
                        const panel = document.getElementById('update-panel')
                        panel.addEventListener("click", handleUpdatePanelClick)
                        const rect = panel.getBoundingClientRect();
                        const mouseX = e.clientX;
                        const mouseY = e.clientY;
                        if ((mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom)) {
                            setTimeout(() => setUpdateOpen(false), 0)
                            document.removeEventListener('click', handleUpdatePanelClick)
                        }
                    }
                    document.addEventListener("click", handleUpdatePanelClick)
                    break
                case "All Teamspaces":
                    setTeamspaceOpen(true)
                    function handleTeamspacePanelClick(e) {
                        const panel = document.getElementById('teamspace-panel')
                        if (panel) {
                            panel.addEventListener("mousedown", handleTeamspacePanelClick)
                        }
                        if (e.target.getAttribute('data-id') !== 'All Teamspaces' && (Array.prototype.includes.call(e.target.classList, 'leave-teamspace-panel') === true || Array.prototype.includes.call(e.target.parentElement.classList, 'leave-teamspace-panel') === true)) {
                            setTimeout(() => setTeamspaceOpen(false), 500)
                            panel.removeEventListener("mousedown", handleTeamspacePanelClick)
                            document.removeEventListener('mousedown', handleTeamspacePanelClick)
                        }
                    }
                    document.addEventListener("mousedown", handleTeamspacePanelClick)
                    break
                case "Settings & Members":
                    setSettingOpen(true)
                    function handleSettingPanelClick(e) {
                        document.querySelector('.overlay')?.addEventListener('mouseup', handleSettingOverlayClick)
                        function handleSettingOverlayClick(e) {
                            const panel = document.getElementById('setting-panel')
                            const rect = panel?.getBoundingClientRect();
                            const mouseX = e.clientX;
                            const mouseY = e.clientY;
                            if (mouseX < rect?.left || mouseX > rect?.right || mouseY < rect?.top || mouseY > rect?.bottom) {
                                setTimeout(() => setSettingOpen(false), 0)
                                document.querySelector('.overlay')?.removeEventListener('mouseup', handleSettingOverlayClick)
                            }
                        }
                    }
                    document.addEventListener("click", handleSettingPanelClick)
                default:
                    break
            }
        }
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
        e.stopPropagation();
        e.currentTarget.style.backgroundColor = ''
        dragStartId = e.dataTransfer.getData("text/plain")
        dragEndId = e.currentTarget.getAttribute("data-id")

        if (e.currentTarget.id === "user-journal-page" && dragStartId !== dragEndId) {
            dispatch(modifyPage({id: dragStartId, journalId: dragEndId, userId: user?.user.id, teamId: null}))
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
        data-id={pageId || teamId || text}
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
            <div className="sidebar-page-name" data-id={text}>{props.type !== 'default' && text.length > 15 ? text.slice(0, 15) + '...' : text}</div>

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
                    <div className="clickable-dropdown-container" onClick={handleClick}>
                    <FontAwesomeIcon icon="trash-can" className="clickable-trash-can" />
                    <div className="clickable-delete">Delete Page</div>
                    </div>
                </div>
            )}

            {leaveTeamPanelOpen && (
                <div className="clickable-dropdown">
                    <div className="clickable-dropdown-container" onClick={handleClick}>
                    <FontAwesomeIcon icon="arrow-right-from-bracket" className="clickable-trash-can" />
                    <div className="clickable-delete">Leave Teamspace</div>
                    </div>
                </div>
            )}

            {/* Logic for conditionally displaying tooltip on mouse hover*/}
            {tooltipVisible && tooltipText && (
            <Tooltip props={{"text": tooltipText, "relativePosition": relativePosition}} />
            )}

            {searchOpen && (
                <SearchPanel setSearchOpen={setSearchOpen} />
            )}

            {updateOpen && (
                <UpdatePanel />
            )}

            {settingOpen && (
                <SettingPanel />   
            )}

            {teamspaceOpen && (
                <AllTeamspacesPanel />
            )}
        </div>
        
    )
}

export default SidebarItem