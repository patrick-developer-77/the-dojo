import { Link } from 'react-router-dom'

// styles
import './ProjectCard.css'

export default function ProjectCard({ projects }) {
	return (
		<div className="project-card">
			{projects.length === 0 && <p>No projects yet!</p>}
			{projects.map(project => (
				<Link to={`/projects/${project.id}`} key={project.id} className={`card ${project.status.toLowerCase()}`}>
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<h4>{project.client}</h4>
						<p><strong>{project.status.toUpperCase()}</strong></p>
					</div>
					<p style={{marginBottom: '.5rem'}}>{project.details}</p>
					<p>Due by {project.prodDate.toDate().toDateString()}</p>
					<div className="assigned-to">
						<ul>
							{project.assignedUsersList.map(user => (
								<li key={user.photoURL}>
									{/* <Avatar src={user} /> */}
									<p style={{fontSize: '13px', fontWeight: '300'}}>{user.displayName}</p>
								</li>
							))}
						</ul>
					</div>
				</Link>
			))}
		</div>
	)
}
