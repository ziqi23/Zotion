import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUserToTeam, showAll } from "../../../store/team"
import SidebarItem from "./SidebarItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function AllTeamspacesPanel() {
    const teams = useSelector(state => state.team)
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const [joinPanelVisible, setJoinPanelVisible] = useState(-1)
    const [joinPanelBlockVisible, setJoinPanelBlockVisible] = useState(-1)

    useEffect(() => {
        async function getAllTeams() {
            const res = await dispatch(showAll("All"))
                .then((res) => res.json())
            setData(res)
        }
        getAllTeams()
    }, [teams])

    function handleLeavePanel(e) {
        let ele = document.getElementById('teamspace-panel')
        ele.style.animation = "0.25s 1 forwards slideout"
    }

    function handleClick(e) {
        dispatch(addUserToTeam(this))
        setJoinPanelBlockVisible(-1)
    }

    return (
        <div className="teamspace-panel" id="teamspace-panel">
            <div className="teamspace-panel-header" >
                <FontAwesomeIcon icon="arrow-left" className="leave-teamspace-panel" onClick={handleLeavePanel}/> 
                <div>All teamspaces</div>
            </div>
            <div className='your-teamspaces'>
                <div className="your-teamspaces-header">Your teamspaces</div>
                <div className="your-teamspaces-container">
                    {Object.values(teams).map(team => {
                        return <SidebarItem props={{"text": team.teamName, type: "team", teamId: team.id}}></SidebarItem>
                    })}
                </div>
            </div>
            <div className="more-teamspaces">
                <div className="more-teamspaces-header">More teamspaces</div>
                <div className="more-teamspaces-container">
                    {data ? Object.values(data).map((team) => {
                        return (
                        <div className="more-teamspaces-item" onMouseEnter={() => setJoinPanelVisible(team.id)} onMouseLeave={() => setJoinPanelVisible(-1)}>
                            <div className="sidebar-icon-teamspace">
                                {team.teamName[0]}
                            </div>
                            <div>
                                {team.teamName}
                            </div>
                            {joinPanelVisible === team.id && (
                            <div className="more-teamspaces-icon" onClick={() => setJoinPanelBlockVisible(team.id)}>
                                <FontAwesomeIcon icon="ellipsis" />
                            </div>
                            )}
                            {joinPanelBlockVisible === team.id && (
                            <div className="clickable-dropdown" onClick={handleClick.bind(team.id)}>
                                <div className="clickable-dropdown-container">
                                    <FontAwesomeIcon icon="plus" className="clickable-trash-can" />
                                    <div className="clickable-delete">Join Teamspace</div>
                                </div>
                            </div>
                            )}
                        </div>
                        )
                    }) : null}
                </div>
            </div>
        </div>
    )
}

export default AllTeamspacesPanel