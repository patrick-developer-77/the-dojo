import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router'

// styles
import './Create.css'

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

export default function Create() {
	const navigate = useNavigate()
	const { addDocument, response } = useFirestore('projects')
	const { documents } = useCollection('users')
	const [users, setUsers] = useState([])
	const { user } = useAuthContext()

	// form field values
	const [client, setClient] = useState('')
	const [details, setDetails] = useState('')
	const [devStartDate, setDevStartDate] = useState('')
	const [devQADate, setDevQADate] = useState('')
	const [qaDate, setQADate] = useState('')
	const [qcDate, setQCDate] = useState('')
	const [prodDate, setProdDate] = useState('')
	const [status, setStatus] = useState('')
	const [assignedUsers, setAssignedUsers] = useState([])
	const [formError, setFormError] = useState(null)
	const [maestro, setMaestro] = useState('')
	const [billing, setBilling] = useState('')


	useEffect(() => {
		if (documents) {
			const options = documents.map(user => {
				return {value: user, label: user.displayName }
			})
			setUsers(options)
		}
	}, [documents])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setFormError(null)

		if (!status) {
			setFormError('Please select a project status')
			return
		}
		if (assignedUsers.length < 1) {
			setFormError('Please assign the project to at least one user')
			return
		}

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid
		}

		const assignedUsersList = assignedUsers.map(u => {
			return {
				displayName: u.value.displayName,
				photoURL: u.value.photoURL,
				id: u.value.id
			}
		})

		const project = {
			client,
			details,
			status: status.value,
			devStartDate: timestamp.fromDate(new Date(devStartDate)),
			devQADate: timestamp.fromDate(new Date(devQADate)),
			qaDate: timestamp.fromDate(new Date(qaDate)),
			qcDate: timestamp.fromDate(new Date(qcDate)),
			prodDate: timestamp.fromDate(new Date(prodDate)),
			comments: [],
			createdBy,
			assignedUsersList,
			maestro,
			billing
		}

		await addDocument(project)
		if (!response.error) {
			navigate('/')
		}
	}

	return (
		<div className="create-form">
			<h2 className="page-title">Create a new project</h2>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col">
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
							/>
						</label>
						<label>
							<span>Assign to:</span>
							<Select
								onChange={(option) => setAssignedUsers(option)}
								options={users}
								isMulti
								menuPlacement="top"
							/>
						</label>
						<label>
							<span>Set Maestro Number:</span>
							<input
								required
								type="string"
								onChange={(e) => setMaestro(e.target.value)}
								value={maestro}
							/>
						</label>
						<label>
							<span>Set Billing Number:</span>
							<input
								required
								type="string"
								onChange={(e) => setBilling(e.target.value)}
								value={billing}
							/>
						</label>
					</div>
					<div className="col">
						<label>
							<span>Set Dev Start date:</span>
							<input
								required
								type="date"
								onChange={(e) => setDevStartDate(e.target.value)}
								value={devStartDate}
							/>
						</label>
						<label>
							<span>Set Dev QA date:</span>
							<input
								required
								type="date"
								onChange={(e) => setDevQADate(e.target.value)}
								value={devQADate}
							/>
						</label>
						<label>
							<span>Set QA date:</span>
							<input
								required
								type="date"
								onChange={(e) => setQADate(e.target.value)}
								value={qaDate}
							/>
						</label>
						<label>
							<span>Set QC date:</span>
							<input
								required
								type="date"
								onChange={(e) => setQCDate(e.target.value)}
								value={qcDate}
							/>
						</label>
						<label>
							<span>Set Prod date:</span>
							<input
								required
								type="date"
								onChange={(e) => setProdDate(e.target.value)}
								value={prodDate}
							/>
						</label>
					</div>
				</div>
				<button className="btn">Add Project</button>
				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	)
}
