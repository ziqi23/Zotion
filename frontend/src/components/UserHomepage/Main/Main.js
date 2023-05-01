import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { modifyPage } from "../../../store/page";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import TextOptionsToolbar from "../../Overlay/TextOptionsToolbar";
import BlockOptionsToolbar from "./BlockOptionsToolbar";
import "@blocknote/core/style.css";
import React from "react";

const Main = (props) => {
    const [toolbarVisible, setToolbarVisible] = useState(false)
    const [blockOptionVisible, setBlockOptionVisible] = useState(false)
    const dispatch = useDispatch();
    const location = useLocation();
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length)
    const pages = useSelector((state) => state.page)
    const htmlContent = useSelector((state) => state.page[pageId] && state.page[pageId].htmlContent ? 
    state.page[pageId].htmlContent : null)
    // let idxSelected;
    // let charSelected;
    // function handleSelect(e) {
    //     const selection = getSelection();
    //     console.log(selection)
    //     const selectionStartIdx = Array.prototype.indexOf.call(selection.anchorNode.parentNode.childNodes, selection.anchorNode)
    //     const selectionEndIdx = Array.prototype.indexOf.call(selection.anchorNode.parentNode.childNodes, selection.focusNode)

    //     if (selectionStartIdx !== selectionEndIdx) {
    //         idxSelected = e.target.getAttribute('data-idx')
    //         charSelected = [selectionStartIdx, selectionEndIdx].sort()
    //         localStorage.setItem('selection', `${charSelected}`)
    //         setToolbarVisible(true)
    //     } else {
    //         setToolbarVisible(false)
    //     }

    //     console.log(idxSelected, charSelected)
    // }

    // console.log(localStorage.getItem('selection').split(',').map((ele) => parseInt(ele)))

    // function handleToolbarClick(e) {
    //     e.preventDefault()
    //     document[idxSelected].styles.bold.push(charSelected)
    // }

    const blockOption = (option) => {
        console.log(localStorage, option)
        document[parseInt(localStorage.getItem('blockIdx'))].type = option
        dispatch(modifyPage({...pages[pageId], htmlContent: document}))
        localStorage.removeItem('blockIdx')
        setBlockOptionVisible(false)
    }
    function setCaret(divIndex, charIndex) {
        const ele = window.document.getElementById('user-homepage-main-textarea')
        const range = window.document.createRange()
        const selection = window.getSelection()
        if (ele && typeof ele.childNodes[divIndex] === 'object') {
            range.selectNode(ele.childNodes[divIndex])
            if (charIndex === 0) {
                range.setStart(ele.childNodes[divIndex], charIndex)
            } else {
                range.setStart(ele.childNodes[divIndex].firstChild, charIndex)

            }
            range.collapse(true)
            console.log(range)
    
            selection.removeAllRanges()
            selection.addRange(range)
            console.log(window.getSelection())
            ele.childNodes[divIndex].focus()
        }
    }
    useEffect(() => {

        let caretPos = localStorage.getItem('caretPos')
        if (caretPos) {
            caretPos = caretPos.split(',').map((ele) => parseInt(ele))
            setCaret(caretPos[0], caretPos[1])
        }
        localStorage.removeItem('caretPos')

    },)

    function handleChange(e) {
        console.log(e)
        const index = parseInt(e.target.getAttribute('data-idx'))
        switch (e.key) {
            case ("Shift" || "Control" || "Alt" || "Tab" || "Meta" || "ArrowLeft" || "ArrowRight" || "ArrowUp" || "ArrowDown"):
                break
            case ("Backspace"):
                if (document[index].text.length === 0 && document[index].type !== 'div') {
                    document[index].type = 'div'
                    dispatch(modifyPage({...pages[pageId], htmlContent: document}))
                } else if (document[index].text.length === 0 && index !== 0) {
                    document.splice(index, 1)
                    localStorage.setItem('caretPos', `${index - 1}, ${document[index - 1].text.length}`)
                    dispatch(modifyPage({...pages[pageId], htmlContent: document}))
                }
                else {
                    const currentIdx = getSelection().anchorOffset
                    if (currentIdx === 0) break
                    let currentText = document[index].text
                    currentText = currentText.split('')
                    currentText.splice(currentIdx - 1, 1)
                    document[index].text = currentText.join('')
                    // document[index].text = document[index].text.slice(0, document[index].text.length - 1)
                    localStorage.setItem('caretPos', `${index},${currentIdx - 1}`)
                    dispatch(modifyPage({...pages[pageId], htmlContent: document}))
                }
                break
            case ("Enter"):
                if (document[index].type === "ol" || document[index].type === "ul") {
                    document.splice(index + 1, 0, {type: `${document[index].type}`, text: "", styles: {bold: [], italic: [], underline: []}})
                } else {
                    document.splice(index + 1, 0, {type: `div`, text: "", styles: {bold: [], italic: [], underline: []}})
                }
                dispatch(modifyPage({...pages[pageId], htmlContent: document}))
                localStorage.setItem('caretPos', `${index + 1},0`)
                break
            case ("/"):
                setBlockOptionVisible(true);
                localStorage.setItem('blockIdx', e.target.getAttribute('data-idx'))

                function handlePanelClick(e) {
                    const panel = window.document.getElementById('block-options-toolbar')
                    const rect = panel?.getBoundingClientRect();
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;
                    if (rect && (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom)) {
                        setTimeout(() => setBlockOptionVisible(false), 0)
                        localStorage.removeItem('blockIdx')
                        window.document.removeEventListener('mousedown', handlePanelClick)
                    }
                }

                window.document.addEventListener("mousedown", handlePanelClick)
                break;
            default:
                const currentIdx = getSelection().anchorOffset
                let currentText = document[index].text
                currentText = currentText.split('')
                currentText.splice(currentIdx, 0, e.key)
                document[index].text = currentText.join('')
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
                data-ph="Write something, or press '/' for commands..."
                contentEditable="true" 
                suppressContentEditableWarning={true}
                className="main-manual-text" 
                onKeyDown={handleChange}>
                {/* // onSelect={handleSelect}> */}
                    {/* {div.text.split('').map((char, idx)=>{
                        let selection = localStorage.getItem('selection').split(',').map((ele) => parseInt(ele))
                        if (idx >= selection[0] && idx <= selection[1]) {
                            return <span style={{backgroundColor: "blue"}}>{char}</span>
                        } else { */}
                    {(div.type === "ul" || div.type === "ol") && (
                        <li>{div.text}</li>
                    )}
                    {(div.type !== "ul" && div.type !== "ol") && (
                        <>{div.text}</>
                    )}
                </CustomTag> 
            ))}
            {toolbarVisible && (
                <div>
                    <TextOptionsToolbar />
                </div>
            )}
            {blockOptionVisible && (
                <div className="block-options-toolbar" id="block-options-toolbar">
                    <BlockOptionsToolbar blockOption={blockOption}/>
                </div>
            )}
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