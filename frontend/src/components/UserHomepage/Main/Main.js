import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { modifyPage } from "../../../store/page";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import TextOptionsToolbar from "../../Overlay/TextOptionsToolbar";
import "@blocknote/core/style.css";
import React from "react";

const Main = (props) => {
    // const [toolbarVisible, setToolbarVisible] = useState(false)
    const dispatch = useDispatch();
    const location = useLocation();
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length)
    const pages = useSelector((state) => state.page)
    const htmlContent = useSelector((state) => state.page[pageId] && state.page[pageId].htmlContent ? 
    state.page[pageId].htmlContent : null)
    let idxSelected;
    let charSelected;
    function handleSelect(e) {
        // console.log(e)
        const selection = getSelection();
        // console.log(selection)
        // console.log(selection.anchorNode.parentElement.childNodes)
        // console.log(Array.prototype.indexOf.call(selection.anchorNode.parentNode.childNodes, selection.anchorNode))
        // console.log(Array.prototype.indexOf.call(selection.anchorNode.parentNode.childNodes, selection.focusNode))
        if (selection.baseOffset !== selection.focusOffset) {
            idxSelected = e.target.getAttribute('data-idx')
            charSelected = [selection.baseOffset, selection.focusOffset].sort()
            // setToolbarVisible(true)
        } else {
            // setToolbarVisible(false)
        }

        console.log(idxSelected, charSelected)
    }

    function handleToolbarClick(e) {
        e.preventDefault()
        document[idxSelected].styles.bold.push(charSelected)
    }

    function handleChange(e) {
        const index = e.target.getAttribute('data-idx')
        switch (e.key) {
            case ("Shift" || "Control" || "Alt" || "Tab" || "Meta"):
                break
            case ("Backspace"):
                document[index].text = document[index].text.slice(0, document[index].text.length - 1)
                break
            case ("Enter"):
                document.push({type: "div", text: "", styles: {bold: [], italic: [], underline: []}})
                console.log(pages[pageId])
                dispatch(modifyPage({...pages[pageId], htmlContent: document}))
                break
            default:
                document[index].text += e.key
                break
        }
    }
    let formattedHtmlContent;
    if (htmlContent) {
        formattedHtmlContent = []
        htmlContent.forEach((ele) => {
            if (typeof ele === "string") {
                ele = ele.replaceAll("=>", ":")
                formattedHtmlContent.push(JSON.parse(ele))
            } else {
                formattedHtmlContent.push(ele)
            }
        })
    }
    let document = formattedHtmlContent || [
        {type: "h1", text: `${pages[pageId] ? pages[pageId].pageName : ''}`, styles: {bold: [], italic: [], underline: []}},
        {type: "div", text: ``, styles: {bold: [], italic: [], underline: []}}
    ]

    function CustomTag({type, children, ...props}) {
        return React.createElement(type, props, children)
    }
    
    if (pageId !== "undefined") {
        return (
        <>
            {document.map((div, idx) => (
                <CustomTag type={div.type} 
                key={idx}
                data-idx={idx}
                data-ph="Write something..."
                contentEditable="true" 
                suppressContentEditableWarning={true}
                className="main-manual-text" 
                onKeyDown={handleChange}
                onSelect={handleSelect}>
                    {div.text.split('').map((char, idx)=>{
                        return <>{char}</>
                    })}
                </CustomTag> 
            ))}
            {/* {toolbarVisible && (
                <div>
                    <TextOptionsToolbar />
                </div>
            )} */}
        </>
        )
    } else return <h1 className="main-default-text">&#128075;Welcome to Notion</h1>

    // const editor = useBlockNote({})
    // console.log(editor)
    // if (editor) {
    //     return <BlockNoteView editor={editor} />;
    // } else return null
}

export default Main;