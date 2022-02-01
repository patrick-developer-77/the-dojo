import Avatar from "../../components/Avatar";
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useDocument } from '../../hooks/useDocument'
import ProjectList from '../../components/ProjectList'

export default function UserInfo() {
	const { user } = useAuthContext()
	const { error, documents } = useCollection('projects')

	const projects = documents ? documents.filter(document => {
		document.assignedUsersList.forEach(document => console.log(document.id))
		return document.assignedUsersList.forEach(u => user.uid === u.id)
	}) : null

	return (
		<div>
			{error && <div className="error">{error}</div>}

			<h2 className="page-title">User information</h2>
			<Avatar src={user} />
			<h4>{user.displayName}</h4>
			<p>Users Projects:</p>
			{/* <p>Full Name: {user && user.map(user => user.id === user.uid ? <>{user.firstName} {user.lastName}</> : '')}</p> */}
			<ProjectList projects={projects} />
			{/* {users && users.map(user => user.id === user.uid ? <div>Full Name: {user.firstName} {user.lastName}</div> : '')}
			{users && users.map(user => {
				console.log(user.id)
				console.log(user.uid)
				if (user.id === user.uid) {
					return <span>Full Name: {user.firstName} {user.lastName}</span>
				}
			})} */}
			<button>Edit</button>
		</div>
	)
}
