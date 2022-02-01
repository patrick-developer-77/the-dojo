import ProjectCard from '../../components/ProjectCard'
import { useCollection } from '../../hooks/useCollection'
import ProjectFilter from './ProjectFilter'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Dashboard.css'

export default function Dashboard() {
	const { user } = useAuthContext()
	const { documents, error } = useCollection('projects')
	const [currentFilter, setCurrentFilter] = useState('active')

	const changeFilter = (newFilter) => {
		setCurrentFilter(newFilter)
	}

	const projects = documents ? documents.filter((document) => {
		switch (currentFilter) {
			case 'all':
				return true
			case 'active':
				return !(document.status === 'archived' || document.status === 'cancelled') ? true : false
			case 'mine':
				let assignedToMe = false
				document.assignedUsersList.forEach((u) => {
					if (user.uid === u.id) {
						assignedToMe = true
					}
				})
				return assignedToMe
			case 'planning':
			case 'waiting':
			case 'programming':
			case 'devqa':
			case 'qa':
			case 'qc':
			case 'prod':
			case 'cancelled':
			case 'archived':
				return document.status.toLowerCase() === currentFilter.toLowerCase()
			default:
				return true
		}
	}) : null

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{error && <p className="error">{error}</p>}
			{documents && (
				<ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />
			)}
			{projects && <ProjectCard projects={projects} />}
		</div>
	)
}
