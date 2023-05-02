import { useDispatch } from "react-redux"
import { addTeam } from "../../../store/team"
import { useState } from "react"


function AddTeamPanel(props) {
    const dispatch = useDispatch()
    const [teamName, setTeamName] = useState('')

    function handleChange(e) {
        setTeamName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(addTeam({teamName}))
    }

    return (
        <div className="add-team-panel" id="add-team-panel">
            <div className="teamspace-short-description">Create a new teamspace</div>
            <div className="teamspace-long-description">Teamspaces are where your team organizes pages, permissions, and members</div>
            
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Icon & name</span>
                    <input type="text" placeholder='Acme Labs' className="teamspace-name-input" onChange={handleChange}></input>
                </label>
                <label>
                    <span>Description</span>
                    <input type="textarea" placeholder="Details about your teamspace" className="teamspace-description-input"></input>
                </label>
                <label>
                    <span>Who is this teamspace for?</span>
                    <div>General</div>
                </label>
                <label>
                    <span>Permissions</span>
                    <div>Open</div>
                </label>
                <input type="submit" className="submit-add-team" value="Add Team"></input>
            </form>
        </div>
    )
}

export default AddTeamPanel