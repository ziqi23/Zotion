import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { modifyPage } from "../../store/page";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import TextOptionsToolbar from "./TextOptionsToolbar";
import "@blocknote/core/style.css";

const Main = (props) => {
    const [toolbarVisible, setToolbarVisible] = useState(false)
    const dispatch = useDispatch();
    const location = useLocation();
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length)
    const pages = useSelector((state) => state.page)
    const htmlContent = useSelector((state) => state.page[pageId] && state.page[pageId].htmlContent ? 
    [...state.page[pageId].htmlContent] : [{type: "", text: "", styles: {bold: [], italic: [], underline: []}}])
    
    function handleSelect(e) {
        const selection = getSelection();
        if (selection.baseOffset !== selection.focusOffset) {
            setToolbarVisible(true)
        } else {
            setToolbarVisible(false)
        }
    }

    function handleChange(e) {
        console.log(e)
        const index = e.target.getAttribute('data-idx')
        switch (e.key) {
            case ("Shift" || "Control" || "Alt" || "Tab" || "Meta"):
                break
            case ("Backspace"):
                document[index].text = document[index].text.slice(0, document[index].text.length - 1)
                break
            case ("Enter"):
                document.push({type: "", text: ""})
                dispatch(modifyPage({...pages[pageId], htmlContent: document}))
                break
            default:
                document[index].text += e.key
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
            data-idx={idx}
            data-ph="Write something..."
            contentEditable="true" 
            suppressContentEditableWarning={true}
            className="main-manual-text" 
            onKeyDown={handleChange}
            onSelect={handleSelect}>
                {div.text}
                {toolbarVisible && (
                    <TextOptionsToolbar />
                )}
            </div>
        )))
    } else return <h1 className="main-default-text">&#128075;Welcome to Notion</h1>

    // const editor = useBlockNote({})
    // console.log(editor)
    // if (editor) {
    //     return <BlockNoteView editor={editor} />;
    // } else return null
}

export default Main;