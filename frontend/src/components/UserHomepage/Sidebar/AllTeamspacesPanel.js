import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showAll } from "../../../store/team"


function AllTeamspacesPanel({width}) {
    console.log(width)
    const teams = useSelector(state => state.team)
    const dispatch = useDispatch()
    const [data, setData] = useState({})

    useEffect(() => {
        async function getAllTeams() {
            const res = await dispatch(showAll("All"))
                .then((res) => res.json())
            setData(res)
        }
        getAllTeams()
    }, [])

    return (
        <div className="teamspace-panel" id="teamspace-panel" style={{"width": width}}>
            <div className="teamspace-panel-header">
                <div> C </div> 
                <div>All teamspaces</div>
            </div>
            <div className='your-teamspaces'>
                <div className="your-teamspaces-header">Your teamspaces</div>
                <div className="your-teamspaces-container">
                    {Object.values(teams).map(team => {
                        return <div>{team.teamName}</div>
                    })}
                </div>
            </div>
            <div className="more-teamspaces">
                <div className="more-teamspaces-header">More teamspaces</div>
                <div className="more-teamspaces-container">
                    {data ? Object.values(data).map((team) => {
                        return <div>{team.teamName}</div>
                    }) : null}
                </div>
            </div>
        </div>
    )
}

export default AllTeamspacesPanel