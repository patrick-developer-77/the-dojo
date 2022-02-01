import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function ProjectSummary({ project, setIsEditing }) {
	const { deleteDocument, updateDocument } = useFirestore('projects')
	const { user } = useAuthContext()
	const navigate = useNavigate()
	const [isHovered, setIsHovered] = useState(null)

	const archiveProject = () => {
		const confirmation = window.confirm('Are you sure you want to archive this project?')
		if (!confirmation) return
		updateDocument(project.id, { status: 'archived' })
		navigate('/')
	}
	const deleteProject = () => {
		const confirmation = window.confirm('Are you sure you want to delete this project?')
		if (!confirmation) return
		deleteDocument(project.id)
		navigate('/')
	}

	const removeAssignedUser = (id) => {
		if (project.assignedUsersList.length < 2) {
			alert('You must have at least 1 assigned user')
			return
		}
		const usersToKeep = project.assignedUsersList.filter(user => user.id !== id)
		console.log(usersToKeep)
		updateDocument(project.id, { assignedUsersList: usersToKeep })
		alert('user has been removed from project')
	}

	return (
		<div>
			<div className={`project-summary ${project.status.toLowerCase()}`}>
				<div className="status">{project.status.toUpperCase()}</div>
				<p className="maestro"><a href={`https://maestro.alight.com/maestro/editIssue.html?issueId=${project.maestro}`} title={`Open Maestor ticket #${project.maestro}`} target="_blank" rel="noreferrer noopener">{project.maestro}</a></p>
				<h2 className="client">{project.client}</h2>
				<p className="details">{project.details}</p>
				<p className="billing">{project.billing}</p>
				<p className="date devstart">{project.devStartDate.toDate().toDateString()}</p>
				<p className="date devqa">{project.devQADate.toDate().toDateString()}</p>
				<p className="date qa">{project.qaDate.toDate().toDateString()}</p>
				<p className="date qc">{project.qcDate.toDate().toDateString()}</p>
				<p className="date prod">{project.prodDate.toDate().toDateString()}</p>
				<p className="created-by">Created by {project.createdBy.displayName}</p>
				<h4>Assigned to:</h4>
				<div className="assigned-users">
					{project.assignedUsersList.map(user => (
						<div key={user.id} className="wrapper" onMouseEnter={() => setIsHovered(user.id)} onMouseLeave={() => setIsHovered(null)}>
							{isHovered === user.id && <span className="remove-user" onClick={() => removeAssignedUser(user.id)}></span>}
							<Avatar src={user} />
							<span className="display-name" style={{ fontSize: '.675rem'}}>{user.displayName}</span>
						</div>
					))}
				</div>
			</div>
			{project.status !== 'archived' && <button className="btn" onClick={() => setIsEditing(true)}>Edit Project</button>}
			<button className="btn" style={project.status !== 'archived' ? {marginLeft: '1rem'} : {}} onClick={deleteProject}>Delete Project</button>
			{project.status !== 'archived' && <button className="btn" style={{marginLeft: '1rem'}} onClick={archiveProject}>Archive Project</button>}
		</div>
	)
}
