import { useDispatch, useSelector } from "react-redux"
import { addTeam } from "../../../store/team"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

function SearchPanel(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [result, setResult] = useState([])
    const [hoveredIdx, setHoveredIdx] = useState([])
    const username = useSelector(state => state.session.user.username)
    const pages = useSelector(state => state.page)
    const teams = useSelector(state => state.team)
    
    let pagesByDate = {}
    Object.values(pages).forEach((page) => pagesByDate[page.updatedAt] = page)

    let pagesModifiedToday = {}
    Object.keys(pagesByDate).forEach((date) => {
        let updatedDate = new Date(date);
        if((Date.now() - updatedDate.getTime())/ 3600000 <= 24) {
            pagesModifiedToday[date] = pagesByDate[date]
        }
    })  

    let pagesModifiedYesterday = {}
    Object.keys(pagesByDate).forEach((date) => {
        let updatedDate = new Date(date);
        if((Date.now() - updatedDate.getTime())/ 3600000 > 24 && (Date.now() - updatedDate.getTime())/ 3600000 <= 48) {
            pagesModifiedYesterday[date] = pagesByDate[date]
        }
    })  
    
    let pagesModifiedPastWeek = {}
    Object.keys(pagesByDate).forEach((date) => {
        let updatedDate = new Date(date);
        if((Date.now() - updatedDate.getTime())/ 3600000 > 48 && (Date.now() - updatedDate.getTime())/ 3600000 <= 168) {
            pagesModifiedPastWeek[date] = pagesByDate[date]
        }
    })  

    let searchResults = [];
    async function handleQuery(e) {
        setQuery(e.target.value)

        if (!e.target.value) {
            setResult([])
            return;
        }

        Object.values(pages).forEach((page) => {
            // Search by page name
            if (page.pageName?.includes(e.target.value)) {
                searchResults.push([page.id, page.pageName, -1])
            }

            // Search by content
            page.htmlContent?.forEach((div, idx) => {
                if (typeof div === 'string') {
                    div = JSON.parse(div.replaceAll("=>", ":"))
                }
                if (div.text.includes(e.target.value)) {
                    searchResults.push([page.id, page.pageName, idx])
                }
            })
        })
        setResult(searchResults)
    }

    function handleClick(e, page) {
        if (page.id) {
            navigate(`/home?pageId=${page.id}`)
        } else {
            navigate(`/home?pageId=${page[0]}`)
            if (page[2] !== -1) {
                const ele = window.document.getElementsByClassName("main-manual-drag-block")[page[2]]
                ele?.focus()
            }
        }
    }

    function getHighlightedText(text, highlight) {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <div className="result-item-search-details">{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b className="result-item-details">{part}</b> : part)}</div>;
    }

    function getRoute(page) {
        let route = "";
        if (page.journalId) {
            route += getRoute(pages[page.journalId]);
        }
        route += page.pageName + ' / ';
        return route;
    }

    function getTeam(page) {
        console.log(page)
        if (page.teamId) {
            return teams[page.teamId].teamName + " / ";
        }
        if (page.journalId) {
            return getTeam(pages[page.journalId]);
        }
        return "";
    }
    
    return (
        <>
            <div className="overlay">
            </div>
            <div className="search-panel" id="search-panel">
                <div className="search-panel-query">
                    <FontAwesomeIcon icon="magnifying-glass" />
                    <input type="text" placeholder={`Search ${username}'s Notion...`} value={query} onChange={handleQuery}></input>
                </div>
                {!query && (
                <div className="search-panel-result">
                    <div className="search-panel-result-today">
                        <div className="today-result">Today</div>
                        {Object.values(pagesModifiedToday).map((page, idx) => {
                            return (
                                <div className="result-item" 
                                onClick={(e) => handleClick(e, page)} 
                                onMouseEnter={() => setHoveredIdx(["today", idx])} 
                                onMouseLeave={() => setHoveredIdx([])}>
                                    <div>
                                        {getTeam(page)}{page.journalId ? getRoute(page) : page.pageName + " / "}
                                    </div>
                                    {hoveredIdx[0] === "today" && hoveredIdx[1] === idx ? 
                                    <div>
                                        <FontAwesomeIcon icon="fa-arrow-turn-down" style={{"transform": "rotateZ(90deg)"}}/>
                                    </div> : ""}
                                </div>
                            )
                        })}
                    </div>
                    <div className="search-panel-result-yesterday">
                        <div className="yesterday-result">Yesterday</div>
                        {Object.values(pagesModifiedYesterday).map((page, idx) => {
                            return (
                                <div className="result-item" 
                                onClick={(e) => handleClick(e, page)}
                                onMouseEnter={() => setHoveredIdx(["yesterday", idx])} 
                                onMouseLeave={() => setHoveredIdx([])}>
                                    <div>
                                        {getTeam(page)}{page.journalId ? getRoute(page) : page.pageName + " / "}
                                    </div>
                                    {hoveredIdx[0] === "yesterday" && hoveredIdx[1] === idx ? 
                                    <div>
                                        <FontAwesomeIcon icon="fa-arrow-turn-down" style={{"transform": "rotateZ(90deg)"}}/>
                                    </div> : ""}
                                </div>
                            )
                        })}
                    </div>
                    <div className="search-panel-result-past-week">
                        <div className="past-week-result">Past Week</div>
                        {Object.values(pagesModifiedPastWeek).map((page, idx) => {
                            return (
                                <div className="result-item" 
                                onClick={(e) => handleClick(e, page)}
                                onMouseEnter={() => setHoveredIdx(["lastweek", idx])} 
                                onMouseLeave={() => setHoveredIdx([])}>
                                    <div>
                                        {getTeam(page)}{page.journalId ? getRoute(page) : page.pageName + " / "}
                                    </div>
                                    {hoveredIdx[0] === "lastweek" && hoveredIdx[1] === idx ? 
                                    <div>
                                        <FontAwesomeIcon icon="fa-arrow-turn-down" style={{"transform": "rotateZ(90deg)"}}/>
                                    </div> : ""}
                                </div>
                            )
                        })}
                    </div>
                </div>
                )}
                {result !== [] && (
                <div className="dynamic-search-result">
                    {result.map((pageData) => {
                        if (pageData[2] !== -1) {
                            let text;
                            if (typeof pages[pageData[0]].htmlContent[pageData[2]] === 'string') {
                                text = JSON.parse(pages[pageData[0]].htmlContent[pageData[2]].replaceAll("=>", ":")).text
                            } else {
                                text = pages[pageData[0]].htmlContent[pageData[2]].text
                            }
                            return <div className="result-item" onClick={(e) => handleClick(e, pageData)}>
                                <div className="result-item-details">{pageData[1]}</div> 
                                {getHighlightedText(text, query)}
                            </div>
                        } else {
                            return <div className="result-item" onClick={(e) => handleClick(e, pageData)}>
                                <div className="result-item-details">{pageData[1]}</div>
                            </div>
                        }
                    })}
                </div>
                )}
            </div>
        </>
    )
}

export default SearchPanel