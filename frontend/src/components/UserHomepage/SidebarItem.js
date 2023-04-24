import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deletePage } from "../../store/page"

const SidebarItem = ({props}) => {
    const text = props.text
    const pageId = props.pageId
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [clickableOpen, setClickableOpen] = useState(false)
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

    return (
        <div key={pageId} className="clickable" onContextMenu={handleClick} onClick={handleShowPage}>
            {text}
            {clickableOpen && (
                <div className="clickable-dropdown">
                    <div className="clickable-delete" onClick={handleClick}>Delete Page</div>
                </div>
            )}
        </div>
        
    )
}

export default SidebarItem