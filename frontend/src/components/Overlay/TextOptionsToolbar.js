import { useState, useEffect } from "react"

function TextOptionsToolbar(props) {
    // const [visible, setVisible] = useState(false)
    // const selection = getSelection();
    
    // let selectionStart;
    // let selectionEnd;
    // document.addEventListener('select', () => console.log("selected"))

    // function handleSelect(e) {
    //     console.log("Here", selection)

    //     if (selection.anchorNode) {
    //         selectionStart = Array.prototype.indexOf.call(selection.anchorNode.parentNode.childNodes, selection.anchorNode)
    //         selectionEnd = Array.prototype.indexOf.call(selection.anchorNode.parentNode.childNodes, selection.focusNode)
    //     }
    // }
    // console.log(selectionStart, selectionEnd)
    // useEffect(() => {
    //     console.log("in useEffect")
    //     if (selectionStart && selectionEnd !== selectionStart) {
    //         setVisible(true)
    //     } else {
    //         setVisible(false)
    //     }
    // }, [selectionStart, selectionEnd])

    // console.log(visible)
    return (
        <div>
            <button>B</button>
            <button>I</button>
            <button>U</button>
        </div>
    )
}

export default TextOptionsToolbar