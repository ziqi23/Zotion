import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { showAll } from "../../../store/page";
import { modifyPage } from "../../../store/page";
import { useState } from "react";


const Title = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [addCoverVisible, setAddCoverVisible] = useState(false)
    const query = location.search;
    const pageId = query.slice(query.search("=") + 1, query.length)
    const pages = useSelector((state) => state.page)

    useEffect(() => {
        dispatch(showAll())
    }, [])

    function handleMouseEnter(e) {
        e.preventDefault()
        setOptionsVisible(true)
    }

    function handleMouseLeave(e) {
        e.preventDefault()
        setOptionsVisible(false)
    }

    function setCaret() {
        const ele = window.document.querySelector(`.main-title-text`);
        const range = window.document.createRange();
        const selection = window.getSelection();
        range.selectNode(ele);
        if (ele.firstChild) {
            range.setStart(ele, 1);
        } else {
            range.setStart(ele, 0);
        }
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        ele.focus();
    }
    
    function handlePageNameChange(e) {
        const title = e.target.textContent.length > 30 ? e.target.textContent.slice(0, 30) : e.target.textContent
        dispatch(modifyPage({id: pageId, pageName: title}))
        setCaret();
    }

    function handleEnter(e) {
        if (e.which === 13) {
            e.preventDefault();
            debounce(handlePageNameChange, 0)(e)
        }
    }
    function handleAddCover(e) {
        setAddCoverVisible(true)

        function handleClick(e) {
            const panel = window.document.getElementsByClassName('add-cover-panel')[0]
            const rect = panel?.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            if (rect && (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom)) {
                setTimeout(() => setAddCoverVisible(false), 0)
                document.removeEventListener('mousedown', handleClick)
            }
        }
        document.addEventListener("mousedown", handleClick)
    }

    function handleChooseCover(e) {
        dispatch(modifyPage({id: pageId, pageIcon: e.currentTarget.getAttribute('data-url')}))
        setAddCoverVisible(false)
    }

    let timeout;
    const debounce = (func, delay) => {
        return function executedFunction(...args) {
          const later = () => {
            timeout = null;
            func(...args);
          }; 
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
        };
    }

    return (
        <>
        {pages[pageId]?.pageIcon && pages[pageId].pageIcon !== "Placeholder" && (
        <div className="main-title-cover">
            <img src={`./assets/${pages[pageId].pageIcon}.jpeg`} draggable="false"></img>
        </div>
        )}
        {pages[pageId]?.pageIcon && pages[pageId].pageIcon === "Placeholder" && (
        <div className="main-title-cover">
            <img src={`./assets/rijksmuseum_milkmaid.jpeg`} draggable="false"></img>
        </div>
        )}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {pageId && optionsVisible && (
            <div className="main-title-options">
                <div className="add-cover" onClick={handleAddCover}>
                    Change cover
                </div>
            </div>
            )}
            {!optionsVisible && (
                <div className="main-title-options">
                </div>
            )}
            {pages[pageId] && (
                <div className="main-title-text" contentEditable="true" suppressContentEditableWarning="true" onKeyDown={handleEnter} onInput={debounce(handlePageNameChange, 500)}>
                    {pages[pageId].pageName}
                </div>
            )}
            {addCoverVisible && (
                <div className="add-cover-panel">
                    <div className="individual-cover">
                        <img data-url="rijksmuseum_avercamp_1608" src='./assets/rijksmuseum_avercamp_1608.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="rijksmuseum_claesz_1628" src='./assets/rijksmuseum_claesz_1628.jpeg' draggable="false" onClick={handleChooseCover}></img>
                        </div>
                    <div className="individual-cover">
                        <img data-url="rijksmuseum_jan_lievens_1627" src='./assets/rijksmuseum_jan_lievens_1627.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="rijksmuseum_mignons_1660" src='./assets/rijksmuseum_mignons_1660.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="rijksmuseum_rembrandt_1642" src='./assets/rijksmuseum_rembrandt_1642.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="rijksmuseum_milkmaid" src='./assets/rijksmuseum_milkmaid.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="woodcuts_1" src='./assets/woodcuts_1.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="woodcuts_2" src='./assets/woodcuts_2.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="woodcuts_5" src='./assets/woodcuts_5.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="woodcuts_6" src='./assets/woodcuts_6.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="woodcuts_13" src='./assets/woodcuts_13.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                    <div className="individual-cover">
                        <img data-url="woodcuts_14" src='./assets/woodcuts_14.jpeg' draggable="false" onClick={handleChooseCover}></img>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default Title