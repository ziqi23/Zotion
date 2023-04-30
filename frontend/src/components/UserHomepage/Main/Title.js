import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { showAll } from "../../../store/page";
import { modifyPage } from "../../../store/page";
import cover1 from "../../../assets/rijksmuseum_avercamp_1608.jpeg"
import cover2 from "../../../assets/rijksmuseum_jansz_1636.jpeg"
import cover3 from "../../../assets/rijksmuseum_jansz_1649.jpeg"
import cover4 from "../../../assets/woodcuts_1.jpeg"
import cover5 from "../../../assets/woodcuts_2.jpeg"
import { useState } from "react";


const Title = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [optionsVisible, setOptionsVisible] = useState(false)
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
    
    function handlePageNameChange(e) {
        dispatch(modifyPage({id: pageId, pageName: e.target.innerHTML}))
    }

    const debounce = (func, wait) => {
        let timeout;
      
        // This is the function that is returned and will be executed many times
        // We spread (...args) to capture any number of parameters we want to pass
        return function executedFunction(...args) {
      
          // The callback function to be executed after 
          // the debounce time has elapsed
          const later = () => {
            // null timeout to indicate the debounce ended
            timeout = null;
            
            // Execute the callback
            func(...args);
          };
          // This will reset the waiting every function execution.
          // This is the step that prevents the function from
          // being executed because it will never reach the 
          // inside of the previous setTimeout  
          clearTimeout(timeout);
          
          // Restart the debounce waiting period.
          // setTimeout returns a truthy value (it differs in web vs Node)
          timeout = setTimeout(later, wait);
        };
    }
    
    return (
        <>
        {pages[pageId]?.pageIcon && (
        <div className="main-title-cover">
            <img src={[cover1, cover2, cover3, cover4, cover5][Math.floor(Math.random() * 5)]} draggable="false"></img>
        </div>
        )}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {optionsVisible && (
            <div className="main-title-options">
                <div className="add-cover">
                    Add cover
                </div>
            </div>
            )}
            {!optionsVisible && (
                <div className="main-title-options">
                </div>
            )}
            {pages[pageId] && (
                <div className="main-title-text" contentEditable="true" suppressContentEditableWarning="true" onInput={debounce(handlePageNameChange, 500)}>
                    {pages[pageId].pageName}
                </div>
            )}
        </div>
        </>
    )
}

export default Title