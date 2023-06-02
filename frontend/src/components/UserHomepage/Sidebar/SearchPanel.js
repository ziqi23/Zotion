import { useDispatch, useSelector } from "react-redux"
import { addTeam } from "../../../store/team"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import { RxSlash } from 'react-icons/rx'
import { BsDash } from 'react-icons/bs'

function SearchPanel({setSearchOpen}) {
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

    let allPages = Object.keys(pagesModifiedToday).concat(Object.keys(pagesModifiedYesterday).concat(Object.keys(pagesModifiedPastWeek)))
    let totalNumberOfPages = allPages.length;

    let searchResults = [];
    async function handleQuery(e) {
        setQuery(e.target.value)

        if (!e.target.value) {
            setResult([])
            return;
        }

        Object.values(pages).forEach((page) => {
            // Search by page name
            if (page.pageName?.toLowerCase().includes(e.target.value.toLowerCase())) {
                searchResults.push([page.id, page.pageName, -1])
            }

            // Search by content
            page.htmlContent?.forEach((div, idx) => {
                if (typeof div === 'string') {
                    div = JSON.parse(div.replaceAll("=>", ":"))
                }
                if (div.text.toLowerCase().includes(e.target.value.toLowerCase())) {
                    searchResults.push([page.id, page.pageName, idx])
                }
            })
        })
        setResult(searchResults)
    }

    function handleClick(e, page) {
        if (page.id) {
            navigate(`/home?pageId=${page.id}`)
            setTimeout(() => setSearchOpen(false), 0)
        } else {
            navigate(`/home?pageId=${page[0]}`)
            setTimeout(() => setSearchOpen(false), 0)
            if (page[2] !== -1) {
                const ele = window.document.getElementsByClassName("main-manual-drag-block")[page[2]]
                ele?.focus()
            }
        }
    }

    function getHighlightedText(text, highlight) {
        const parts = text.split(new RegExp(`(${highlight})`, 'i'));
        return <div className="result-item-search-details">{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b className="result-item-details">{part}</b> : part)}</div>;
    }

    function getRoute(page) {
        let route = [];
        if (page.journalId) {
            route = getRoute(pages[page.journalId]);
        }
        if (this !== page) {
            route.push(<FontAwesomeIcon icon="file-lines"/>);
            route.push(<h1>{page.pageName}</h1>);
            route.push(<RxSlash />);
        } else {
            route.splice(-1);
        }
        return route;
    }

    function getTeam(page) {
        let route = [];
        if (page.teamId) {
            route.push(<div className="sidebar-icon-teamspace">{teams[page.teamId].teamName[0]}</div>);
            route.push(<h1>{teams[page.teamId].teamName}</h1>);
            route.push(<RxSlash />);
            return route;
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
                                onMouseDown={(e) => handleClick(e, page)} 
                                onMouseEnter={() => setHoveredIdx(["today", idx])} 
                                onMouseLeave={() => setHoveredIdx([])}>
                                    <div className="result-item-text">
                                        <>
                                        <FontAwesomeIcon icon="file-lines"/>
                                        <h1>{page.pageName}</h1>
                                        </>
                                        {(!!getTeam(page) || !!getRoute.call(page, page).length) && (
                                            <div className='result-item-route'>
                                            <BsDash />
                                            {getTeam(page)}{getRoute.call(page, page)}
                                            </div>
                                        )}
                                    </div>
                                    {hoveredIdx[0] === "today" && hoveredIdx[1] === idx ? 
                                    <div>
                                        <FontAwesomeIcon className="search-arrow" icon="fa-arrow-turn-down" style={{"transform": "rotateZ(90deg)"}}/>
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
                                    <div className="result-item-text">
                                        <>
                                        <FontAwesomeIcon icon="file-lines"/>
                                        <h1>{page.pageName}</h1>
                                        </>
                                        {(!!getTeam(page) || !!getRoute.call(page, page).length) && (
                                            <div className='result-item-route'>
                                            <BsDash />
                                            {getTeam(page)}{getRoute.call(page, page)}
                                            </div>
                                        )}
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
                                    <div className="result-item-text">
                                        <>
                                        <FontAwesomeIcon icon="file-lines"/>
                                        <h1>{page.pageName}</h1>
                                        </>
                                        {(!!getTeam(page) || !!getRoute.call(page, page).length) && (
                                            <div className='result-item-route'>
                                            <BsDash />
                                            {getTeam(page)}{getRoute.call(page, page)}
                                            </div>
                                        )}
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
                            return (
                            <div className="dynamic-result-item" onMouseDown={(e) => handleClick(e, pageData)}>
                                <div className="dynamic-result-item-icon">
                                    <FontAwesomeIcon icon="file-lines"/>
                                </div>
                                <div className="dynamic-result-item-text">
                                    {pageData[1]}
                                    {getHighlightedText(text, query)}
                                </div> 
                            </div>
                            )
                        } else {
                            return <div className="dynamic-result-item" onClick={(e) => handleClick(e, pageData)}>
                                <div className="dynamic-result-item-icon">
                                    <FontAwesomeIcon icon="file-lines"/>
                                </div>
                                <div className="dynamic-result-item-text">
                                    {pages[pageData[0]].pageName}
                                    {(!!getTeam(pages[pageData[0]]) || !!getRoute.call(pages[pageData[0]], pages[pageData[0]]).length) && (
                                        <div className='dynamic-result-item-route'>
                                            {getTeam(pages[pageData[0]])}{getRoute.call(pages[pageData[0]], pages[pageData[0]])}
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                    })}
                </div>
                )}
                <div className="search-panel-footer">
                    {query ? result.length : totalNumberOfPages} {((query && result.length === 1) || (!query && totalNumberOfPages === 1)) ? "Result" : "Results"}
                </div>
            </div>
        </>
    )
}

export default SearchPanel