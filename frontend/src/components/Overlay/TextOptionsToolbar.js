import { useState, useEffect } from "react"

function TextOptionsToolbar(props) {
    const [visible, setVisible] = useState(false)
    const selection = getSelection();
    
    let selectionStart;
    let selectionEnd;

    if (selection.anchorNode) {
        selectionStart = Array.prototype.indexOf.call(selection.anchorNode.parentNode.childNodes, selection.anchorNode)
        selectionEnd = Array.prototype.indexOf.call(selection.anchorNode.parentNode.childNodes, selection.focusNode)
    }
    useEffect(() => {
        if (selectionStart && selectionEnd === selectionStart) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, )

    console.log(visible)
    return (
        <div>
            <button>B</button>
            <button>I</button>
            <button>U</button>
        </div>
    )
}

export default TextOptionsToolbar