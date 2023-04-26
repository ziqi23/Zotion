import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { modifyPage } from "../../store/page";

const Main = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length)
    const htmlContent = useSelector((state) => state.page[pageId] ? state.page[pageId].htmlContent : null)

    function handleChange(e) {
        // dispatch(modifyPage({id: parseInt(pageId), htmlContent: content}))
    }

    if (pageId !== "undefined") {
        return (
            <input className= "main-manual-text" type="textarea" value={htmlContent} onChange={handleChange}></input>
        )
    } else return <h1 className="main-default-text">&#128075;Welcome to Notion</h1>
}

export default Main;