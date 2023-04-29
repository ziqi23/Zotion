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
            <form onSubmit={handleSubmit}>
                <label>Teamspace name: 
                    <input type="text" onChange={handleChange}></input>
                </label>
                <input type="submit" className="submit-add-team" value="Add Team"></input>
            </form>
        </div>
    )
}

export default AddTeamPanel