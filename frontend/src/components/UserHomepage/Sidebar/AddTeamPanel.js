import { useDispatch } from "react-redux"
import { addTeam } from "../../../store/team"
import { useState } from "react"


function AddTeamPanel({setAddTeamPanelVisible}) {
    const dispatch = useDispatch()
    const [teamName, setTeamName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    function handleChange(e) {
        setTeamName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        let data;
        dispatch(addTeam({teamName}))
            .then(() => {
                setAddTeamPanelVisible(false)
            })
            .catch(async (res) => {
                try {
                    data = await res.clone().json()
                } catch {
                    data = await res.text()
                }
                if (data?.errors) setErrorMessage('Invalid team name')
            })
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
                {errorMessage && (
                    <div className="setting-panel-error-message">{errorMessage}</div>
                )}
                <label>
                    <span>Description (optional)</span>
                    <textarea rows={3} placeholder="Details about your teamspace" className="teamspace-description-input"></textarea>
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