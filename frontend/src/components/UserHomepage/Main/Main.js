import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { modifyPage } from "../../../store/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextOptionsToolbar from "../../Overlay/TextOptionsToolbar";
import BlockOptionsToolbar from "./BlockOptionsToolbar";
import React from "react";

const Main = (props) => {
    const [blockOptionVisible, setBlockOptionVisible] = useState(false);
    const [dragIconVisible, setDragIconVisible] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length);
    const pages = useSelector((state) => state.page);
    const htmlContent = useSelector((state) => state.page[pageId] && state.page[pageId].htmlContent ? 
    state.page[pageId].htmlContent : null);
    // Format journal content stored in the database (string) to array format
    let formattedHtmlContent;
    if (htmlContent) {
        formattedHtmlContent = [];
        htmlContent.forEach((ele) => {
            if (typeof ele === "string") {
                ele = ele.replaceAll("=>", ":");
                formattedHtmlContent.push(JSON.parse(ele));
            } else {
                formattedHtmlContent.push(ele);
            }
        })
    }

    // Pull existing content stored with the journal. If none, create a blank document
    let document = formattedHtmlContent || [
        {type: "div", text: ``, styles: {bold: [], italic: [], underline: []}}
    ]

    // Function passed to sub-component to allow users to change input style, e.g. h1, h2, bullets
    const blockOption = (option) => {
        document[parseInt(localStorage.getItem('blockIdx'))].type = option;
        dispatch(modifyPage({...pages[pageId], htmlContent: document}));
        localStorage.removeItem('blockIdx');
        setBlockOptionVisible(false);
    }

    // Set caret position
    function setCaret(divIndex, charIndex) {
        const ele = window.document.querySelector(`.main-manual-text[data-idx="${divIndex}"]`);
        const range = window.document.createRange();
        const selection = window.getSelection();
        if (ele && typeof ele === 'object') {
            range.selectNode(ele);
            if (charIndex === 0) {
                range.setStart(ele, charIndex);
            } else {
                if (ele.firstChild && ele.firstChild.lastChild) {
                    range.setStart(ele.firstChild.lastChild, charIndex);
                } 
                else if (ele.firstChild) {
                    range.setStart(ele.firstChild, charIndex);
                } 
                else {
                    return;
                }
            }
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            ele.focus();
        }
    }

    // Remove caret position when switching between pages
    useEffect(() => {
        localStorage.removeItem('caretPos')
    }, [pageId])
    
    // Call setCaret on each render
    useEffect(() => {
        let caretPos = localStorage.getItem('caretPos')
        if (caretPos) {
            caretPos = caretPos.split(',').map((ele) => parseInt(ele))
            setCaret(caretPos[0], caretPos[1])
        }
    },)

    // Handle clicks and set caret position accordingly
    function handleClick(e) {
        let index = e.target.getAttribute('data-idx') || e.target.parentElement.getAttribute('data-idx')
        localStorage.setItem('caretPos', `${index},${getSelection().anchorOffset}`)
    }

    // Handle dragging lines of text to re-organize content in pages and journals
    let dragStartId;
    let dragEndId;
    function handleDragStart(e) {
        dragStartId = e.target.getAttribute("data-idx")
        let img = window.document.querySelector(`.main-manual-text[data-idx="${dragStartId}"]`)
        e.dataTransfer.setData("text/plain", dragStartId)
        e.dataTransfer.setDragImage(img, 25, 25)
    }

    function handleDragEnter(e) {
        if (e.currentTarget.id === "main-manual-drop-block") {
            e.preventDefault()
            e.dataTransfer.effectAllowed = "move"
            e.dataTransfer.dropEffect = "move"
        } else if (e.currentTarget.id === "main-manual-drag-block" || e.target.className === "main-manual-text") {
            e.dataTransfer.effectAllowed = "none"
            e.dataTransfer.dropEffect = "none"
        }
    }

    function handleDragOver(e) {
        if (e.currentTarget.id === "main-manual-drop-block") {
            e.preventDefault()
            e.dataTransfer.effectAllowed = "move"
            e.dataTransfer.dropEffect = "move"
            e.currentTarget.style.backgroundColor = "rgb(76, 156, 221, 0.5)"
        } else if (e.currentTarget.id === "main-manual-drag-block" || e.target.className === "main-manual-text") {
            e.dataTransfer.effectAllowed = "none"
            e.dataTransfer.dropEffect = "none"
        }
    }

    function handleDragLeave(e) {
        e.currentTarget.style.backgroundColor = ''
    }

    function handleDrop(e) {
        if (e.target.className === "main-manual-drag-block" || e.target.className === "main-manual-text") {
            e.preventDefault();
        } else {
            e.currentTarget.style.backgroundColor = ''
            dragStartId = parseInt(e.dataTransfer.getData("text/plain"))
            dragEndId = parseInt(e.currentTarget.getAttribute("data-idx"))
            setDragIconVisible(-1)
            if (dragStartId !== dragEndId) {
                document.splice(dragEndId + 1, 0, document[dragStartId])
                if (dragStartId > dragEndId) {
                    document = document.slice(0, dragStartId + 1).concat(document.slice(dragStartId + 2))
                } else {
                    document = document.slice(0, dragStartId).concat(document.slice(dragStartId + 1))
                }
                localStorage.removeItem('caretPos')
                dispatch(modifyPage({...pages[pageId], htmlContent: document}))
            }
        }
    }

    // Detect regular key entries (a-z, 0-9, backspace, enter, space, etc.)
    function isRegularKey(keycode) {
        const validCodes = [8, 32, 106, 107, 109, 110, 111, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222]
        if ((keycode >= 48 && keycode <= 90) || validCodes.includes(keycode)) {
            return true;
        }
        return false;
    }

    // Debounce database hits
    let timeout;
    function debounce(func, delay) {
        return function executedFunction(...args) {
          const later = () => {
            timeout = null;
            func(...args);
          }; 
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
        };
    }

    function updateDocument() {
        dispatch(modifyPage({...pages[pageId], htmlContent: document}));
    }

    function handleNewline(e) {
        if (e.key === "Enter") {
            const textBeforeCursor = e.target.textContent.slice(0, getSelection().anchorOffset)
            const textAfterCursor = e.target.textContent.slice(getSelection().anchorOffset)
            const index = parseInt(e.target.getAttribute('data-idx'))
            document[index].text = textBeforeCursor
                // Create new line on "enter" keypress. If previous line was a bullet point, inherit the same styling
                if (document[index].type === "ol" || document[index].type === "ul") {
                    document.splice(index + 1, 0, {type: `${document[index].type}`, text: `${textAfterCursor}`, styles: {bold: [], italic: [], underline: []}})
                } else {
                    document.splice(index + 1, 0, {type: `div`, text: `${textAfterCursor}`, styles: {bold: [], italic: [], underline: []}})
                }
                debounce(updateDocument, 0)()
                localStorage.setItem('caretPos', `${index + 1},0`)
                // let documentDup = []
                // document.forEach((div) => {
                //     documentDup.push({...div})
                // })
                // // console.log("history:", history)
                // // console.log("history to be changed to ", [...history, documentDup])
                // setHistory(history => ([...history, documentDup]))
                // // setPointer(history.length - 1)
        }
    }
    // Log user keypresses and persist to database
    function handleChange(e) {
        const index = parseInt(e.target.getAttribute('data-idx'))
        if (e.which === 40) { // arrow down
            e.preventDefault();
            let currentCaretPos = localStorage.getItem('caretPos').split(',').map((ele) => parseInt(ele));
            if (document[index + 1]) {
                let length = document[index + 1].text.length
                localStorage.setItem('caretPos', `${currentCaretPos[0] + 1},${currentCaretPos[1] > length ? length : currentCaretPos[1]}`)
                debounce(updateDocument, 0)()
            }
        }
        if (e.which === 38) { // arrow up
            e.preventDefault();
            let currentCaretPos = localStorage.getItem('caretPos').split(',').map((ele) => parseInt(ele));
            if (document[index - 1]) {
                let length = document[index - 1].text.length
                localStorage.setItem('caretPos', `${currentCaretPos[0] - 1},${currentCaretPos[1] > length ? length : currentCaretPos[1]}`)
                debounce(updateDocument, 0)()
            }
        }
        if (e.which === 37) { // arrow left
            e.preventDefault();
            let currentCaretPos = localStorage.getItem('caretPos').split(',').map((ele) => parseInt(ele));
            localStorage.setItem('caretPos', `${currentCaretPos[0]},${currentCaretPos[1] > 0 ? currentCaretPos[1] - 1 : currentCaretPos[1]}`)
            debounce(updateDocument, 0)()
        }
        if (e.which === 39) { // arrow right
            e.preventDefault();
            let currentCaretPos = localStorage.getItem('caretPos').split(',').map((ele) => parseInt(ele));
            let length = document[index].text.length
            localStorage.setItem('caretPos', `${currentCaretPos[0]},${currentCaretPos[1] < length ? currentCaretPos[1] + 1 : currentCaretPos[1]}`)
            debounce(updateDocument, 0)()
        }
        if (!isRegularKey(parseInt(e.which)) || !document[index]) {
            return;
        }
        switch (e.key) {
            case ("Backspace"):
                // If no text but contains styling, backspace removes any styling
                if ((window.getSelection().anchorOffset === 0 || document[index].text.length === 0) && document[index].type !== 'div') {
                    document[index].type = 'div'
                    debounce(updateDocument, 0)()
                // If no text or styling, backspace removes entire row
                } else if (document[index].text.length === 0 && index !== 0 && document[index].type === 'div') {
                    document.splice(index, 1)
                    localStorage.setItem('caretPos', `${index - 1},${document[index - 1].text.length}`)
                    debounce(updateDocument, 0)()
                }
                // If contains text, backspace removes text characters
                else {
                    const anchor = getSelection().anchorOffset
                    const focus = getSelection().focusOffset
                    const selectionStart = anchor < focus ? anchor : focus
                    const selectionEnd = anchor > focus ? anchor : focus
                    if (selectionEnd === 0 && selectionStart === 0 && index >= 1 && document[index].type === 'div') {
                        const prevRowLength = document[index - 1].text.length
                        document[index - 1].text += e.target.textContent
                        document.splice(index, 1)
                        localStorage.setItem('caretPos', `${index - 1},${prevRowLength}`)
                        debounce(updateDocument, 0)()
                    } else {
                        if (selectionStart === selectionEnd) {
                            document[index].text = e.target.textContent.slice(0, selectionStart - 1) + e.target.textContent.slice(selectionEnd);
                            localStorage.setItem('caretPos', `${index},${selectionStart - 1}`)
                        }
                        else {
                            document[index].text = e.target.textContent.slice(0, selectionStart) + e.target.textContent.slice(selectionEnd);
                            localStorage.setItem('caretPos', `${index},${selectionStart}`)
                        }
                        debounce(updateDocument, 1000)()
                    }
                }
                break;
            case ("/"):
                setBlockOptionVisible(true);
                localStorage.setItem('blockIdx', e.target.getAttribute('data-idx'))
                function handleOptionPanelClick(e) {
                    const panel = window.document.getElementById('block-options-toolbar')
                    const rect = panel?.getBoundingClientRect();
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;
                    if (rect && (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom)) {
                        setTimeout(() => setBlockOptionVisible(false), 0)
                        localStorage.setItem('caretPos', `${localStorage.getItem('blockIdx')},0`)
                        localStorage.removeItem('blockIdx')
                        window.document.removeEventListener('mousedown', handleOptionPanelClick)
                    }
                }
                window.document.addEventListener("mousedown", handleOptionPanelClick)
                break;
            default:
                const currentIdx = getSelection().anchorOffset
                document[index].text = e.target.textContent.slice(0, currentIdx) + e.key + e.target.textContent.slice(currentIdx);
                localStorage.setItem('caretPos', `${index},${currentIdx + 1}`)
                debounce(updateDocument, 1000)()
                break;
        }
    }
    
    // useEffect(() => {
    //     let ele = window.document.getElementById('user-homepage-main-textarea')
    //     ele.addEventListener('keydown', handleHistory)
    // }, [])

    // function handleHistory(e) {
    //     // console.log(history)
    //     // e.stopImmediatePropagation()
    //     if (e.keyCode === 90 && (e.ctrlKey || e.metaKey)) {
    //         console.log(history, "history!")
    //         // console.log(pointer)
    //         // if (pointer - 1 >= 0) {
    //         //     setPointer(pointer - 1)
    //         // if (history.length > 1) {
    //         //     setHistory(history.slice(0, history.length - 1))
    //         //     console.log(history)
    //         //     console.log(pages[pageId])
    //         //     dispatch(modifyPage({...pages[pageId], htmlContent: history[history.length - 1]}))
    //         // }
    //         return;
    //         // }
    //     }
    // }

    function CustomTag({type, children, ...props}) {
        return React.createElement(type, props, children)
    }
    
    if (pageId && pageId !== "undefined") {
        return (
        <>
            <div className="main-manual-drop-block" 
                id="main-manual-drop-block" 
                data-idx="-1"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
            </div>
            {document.map((div, idx) => (
                <>
                <div className="main-manual-drag-block"  
                tabIndex={-1}
                onMouseOver={() => setDragIconVisible(idx)}
                onMouseLeave={() => setDragIconVisible(-1)}>
                    <CustomTag type={div.type} 
                    key={idx}
                    data-idx={idx}
                    data-ph="Write something, or press '/' for commands..."
                    contentEditable="true" 
                    suppressContentEditableWarning={true}
                    className="main-manual-text" 
                    onKeyDown={(e) => {
                        handleNewline(e);
                        handleChange(e);
                    }}
                    onClick={handleClick}
                    onDrop={handleDrop}
                    draggable="false">
                        {(div.type === "ul" || div.type === "ol") && (
                            <li>
                                {div.text ? div.text : " "}
                            </li>
                        )}
                        {(div.type !== "ul" && div.type !== "ol") && (
                            <>{div.text}</>
                        )}
                    </CustomTag> 
                    {idx === dragIconVisible && (
                        <div className="main-manual-drag-icon" draggable="true"                 
                        data-idx={idx}
                        onDragStart={handleDragStart}
                        onDrop={()=> {return false}}>
                            <FontAwesomeIcon icon="ellipsis-vertical"></FontAwesomeIcon>
                            <FontAwesomeIcon icon="ellipsis-vertical"></FontAwesomeIcon>
                        </div>
                    )}
                </div>
                <div className="main-manual-drop-block" 
                id="main-manual-drop-block" 
                data-idx={idx}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}></div>
                </>
            ))}
            {blockOptionVisible && (
                <div className="block-options-toolbar" id="block-options-toolbar">
                    <BlockOptionsToolbar blockOption={blockOption}/>
                </div>
            )}
        </>
        )
    } else return <h1 className="main-default-text">&#128075;Welcome to Zotion</h1>
}

export default Main;