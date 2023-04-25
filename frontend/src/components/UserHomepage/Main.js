import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { modifyPage } from "../../store/page";

const Main = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length)
    const pages = useSelector((state) => state.page)
    const [content, setContent] = useState('')
    
    useEffect(() => {
        if (pages[pageId]) setContent(pages[pageId].htmlContent)
    }, [pageId])

    function handleChange(e) {
        setContent(e.target.value)
        dispatch(modifyPage({id: parseInt(pageId), htmlContent: content}))
    }

    if (content && pages[pageId]) {
        return (
            <input type="textarea" value={content} onChange={handleChange}></input>
        )
    } else return <h1>Welcome to Notion</h1>
}

export default Main;