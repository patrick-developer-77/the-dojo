import { Link } from 'react-router-dom'

export default function ProjectList({ projects }) {
	return (
		<div className="project-list">
			<ul>
				{(!projects || projects.length === 0) && <p>No projects yet!</p>}
				{projects && projects.map(project => (
					<li>
						<Link to={`/projects/${project.id}`} key={project.id} className="">
							{project.client}: {project.details}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
