import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { modifyPage } from "../../store/page";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

const Main = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length)
    const htmlContent = useSelector((state) => state.page[pageId] ? [...state.page[pageId].htmlContent] : [{type: "", text: ""}])

    function handleChange(e) {
        switch (e.key) {
            case ("Shift" || "Control" || "Alt" || "Tab"):
                break
            case ("Backspace"):
                document[this].text = document[this].text.slice(0, document[this].text.length - 1)
                break
            case ("Enter"):
                document.push({type: "", text: ""})
                dispatch(modifyPage({id: parseInt(pageId), htmlContent: document}))
                break
            default:
                document[this].text += e.key
                break
        }
    }
    let document = htmlContent || [
        {type: "", text: ""}
    ]

    if (pageId !== "undefined") {
        return (document.map((div, idx) => (
            <div 
            key={idx}
            contentEditable="true" 
            suppressContentEditableWarning={true}
            className="main-manual-text" 
            onKeyDown={handleChange.bind(idx)}>
                {div.text}
            </div>
        )))
    } else return <h1 className="main-default-text">&#128075;Welcome to Notion</h1>


    // const blockNote = useBlockNote({})
    // const editor = blockNote;
    
    // return <BlockNoteView editor={editor} />;
}

export default Main;