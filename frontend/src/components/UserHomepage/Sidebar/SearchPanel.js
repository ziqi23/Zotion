import { useDispatch, useSelector } from "react-redux"
import { addTeam } from "../../../store/team"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function SearchPanel(props) {
    const dispatch = useDispatch()
    const [teamName, setTeamName] = useState('')
    const [query, setQuery] = useState('')
    const username = useSelector(state => state.session.user.username)
    const pages = useSelector(state => state.page)
    
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

    function handleChange(e) {
        setTeamName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(addTeam({teamName}))
    }

    console.log(query, !!query)

    return (
        <div className="search-panel" id="search-panel">
            <div className="search-panel-query">
                <FontAwesomeIcon icon="magnifying-glass" />
                <input type="text" placeholder={`Search ${username}'s Notion...`} value={query} onChange={(e) => setQuery(e.target.value)}></input>
            </div>
            {!query && (
            <div className="search-panel-result">
                <div className="search-panel-result-today">
                    <span>Today</span>
                    {Object.values(pagesModifiedToday).map((page) => {
                        return <div>{page.pageName}</div>
                    })}
                </div>
                <div className="search-panel-result-yesterday">
                    <span>Yesterday</span>
                    {Object.values(pagesModifiedYesterday).map((page) => {
                        console.log(page)
                        return <div>{page.pageName}</div>
                    })}
                </div>
                <div className="search-panel-result-past-week">
                    <span>Past Week</span>
                    {Object.values(pagesModifiedPastWeek).map((page) => {
                        return <div>{page.pageName}</div>
                    })}
                </div>
            </div>
            )}
            {query && (
            <div className="dynamic-search-result">
                <div>Searching...</div>
            </div>
            )}
        </div>
    )
}

export default SearchPanel