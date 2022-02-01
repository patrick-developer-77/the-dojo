import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

// styles
import './Project.css'
import ProjectComments from './ProjectComments'
import ProjectEdit from './ProjectEdit'
import ProjectSummary from './ProjectSummary'

export default function Project() {
	const { id } = useParams()
	const { error, document } = useDocument('projects', id)
	const [isEditing, setIsEditing] = useState(false)

	if (error) {
		return <div className="error">{error}</div>
	}

	if (!document) {
		return <div>Loading...</div>
	}

	console.log()

	return (
		<div className="project-details">
			{isEditing ? <ProjectEdit project={document} setIsEditing={setIsEditing} /> : <ProjectSummary project={document} setIsEditing={setIsEditing} />}
			{!isEditing && document.status !== 'archived' && <ProjectComments project={document} />}
		</div>
	)
}
