import { Link, NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import './Sidebar.css'
import DashboardIcon from '../assets/grid_view_black_24dp.svg'
import AddIcon from '../assets/add_black_24dp.svg'

export default function Sidebar() {
	const { user } = useAuthContext()
	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">
					<Link to="/user-info">
						<Avatar src={user} />
						<p>Hey {user.displayName}</p>
					</Link>
				</div>
				<nav className="links">
					<ul>
						<li>
							<NavLink to="/">
								<img src={DashboardIcon} alt="dashboard icon" />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/create">
								<img src={AddIcon} alt="add project icon" />
								<span>New Project</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}
