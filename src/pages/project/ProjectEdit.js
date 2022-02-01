import Select from 'react-select'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'
import { format } from 'date-fns'

const statuses = [
	{ value: 'planning', label: 'Planning' },
	{ value: 'waiting', label: 'Waiting' },
	{ value: 'programming', label: 'Programming' },
	{ value: 'devQA', label: 'DevQA' },
	{ value: 'qa', label: 'QA' },
	{ value: 'qc', label: 'QC' },
	{ value: 'prod', label: 'Prod' },
	{ value: 'cancelled', label: 'Cancelled' },
	{ value: 'archived', label: 'Archived' }
]

export default function ProjectEdit({ project, setIsEditing }) {
	const { updateDocument, response } = useFirestore('projects')
	const { user } = useAuthContext()

	const [users, setUsers] = useState([])

	const [client, setClient] = useState(project.client)
	const [details, setDetails] = useState(project.details)

	const [devStartDate, setDevStartDate] = useState(format(project.devStartDate.toDate(), 'yyyy-MM-dd'))
	const [devQADate, setDevQADate] = useState(format(project.devQADate.toDate(), 'yyyy-MM-dd'))
	const [qaDate, setQADate] = useState(format(project.qaDate.toDate(), 'yyyy-MM-dd'))
	const [qcDate, setQCDate] = useState(format(project.qcDate.toDate(), 'yyyy-MM-dd'))
	const [prodDate, setProdDate] = useState(format(project.prodDate.toDate(), 'yyyy-MM-dd'))
	const [status, setStatus] = useState(project.status)
	const [assignedUsers, setAssignedUsers] = useState(project.assignedUsersList)
	const [maestro, setMaestro] = useState(project.maestro)
	const [billing, setBilling] = useState(project.billing)

	console.log(project.status)

	const saveProject = () => {
		console.log('save project')
		setIsEditing(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log()
		// await updateDocument(project.id, {})
		if (!response.error) {

		}
	}

	return (
		<div>
			<div className="project-edit">
				<form onSubmit={handleSubmit}>
					<label>
						<span>Client name:</span>
						<input
							required
							type="text"
							onChange={(e) => setClient(e.target.value)}
							value={client}
						/>
					</label>
					<label>
						<span>Project details:</span>
						<input
							required
							type="text"
							onChange={(e) => setDetails(e.target.value)}
							value={details}
						/>
					</label>
					<label>
						<span>Project status:</span>
						<Select
							onChange={(option) => setStatus(option)}
							options={statuses}
							menuPlacement="top"
							defaultValue={statuses[2]}
						/>
					</label>
					<label>
						<span>Assigned to:</span>
						<Select
							onChange={(option) => setAssignedUsers(option)}
							options={users}
							isMulti
							menuPlacement="top"
						/>
					</label>
					<label>
						<span>Maestro Number:</span>
						<input
							required
							type="string"
							onChange={(e) => setMaestro(e.target.value)}
							value={maestro}
						/>
					</label>
					<label>
						<span>Billing Number:</span>
						<input
							required
							type="string"
							onChange={(e) => setBilling(e.target.value)}
							value={billing}
						/>
					</label>
					<label>
						<span>Dev Start date:</span>
						<input
							required
							type="date"
							onChange={(e) => setDevStartDate(e.target.value)}
							value={devStartDate}
						/>
					</label>
					<label>
						<span>Dev QA date:</span>
						<input
							required
							type="date"
							onChange={(e) => setDevQADate(e.target.value)}
							value={devQADate}
						/>
					</label>
					<label>
						<span>QA date:</span>
						<input
							required
							type="date"
							onChange={(e) => setQADate(e.target.value)}
							value={qaDate}
						/>
					</label>
					<label>
						<span>QC date:</span>
						<input
							required
							type="date"
							onChange={(e) => setQCDate(e.target.value)}
							value={qcDate}
						/>
					</label>
					<label>
						<span>Prod date:</span>
						<input
							required
							type="date"
							onChange={(e) => setProdDate(e.target.value)}
							value={prodDate}
						/>
					</label>
					{/* <h4>Assigned to:</h4>
					<div className="assigned-users">
						{project.assignedUsersList.map(user => (
							<div key={user.id} className="container" onMouseEnter={() => setIsHovered(user.id)} onMouseLeave={() => setIsHovered(null)}>
								<Avatar src={user} />
								<span className="display-name" style={{ fontSize: '.675rem'}}>{user.displayName}</span>
							</div>
						))}
					</div> */}
					<button className="btn" style={{marginBottom: '1rem'}} type="submit" onClick={saveProject}>Save</button>
					<button className="btn" style={{marginBottom: '1rem', marginLeft: '1rem'}} onClick={() => setIsEditing(false)}>Cancel</button>
				</form>
			</div>
		</div>
	)
}
