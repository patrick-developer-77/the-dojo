import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

// styles & images
import "./Navbar.css";
import Kanban from '../assets/view_kanban_black_18dp.svg'
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
	const { logout, isPending } = useLogout();
	const { user } = useAuthContext()

	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<img src={Kanban} alt="dojo logo" />
					<span>Project Tracker</span>
				</li>

				{!user && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Sign up</Link>
						</li>
					</>
				)}

				{user && (
					<li>
						{!isPending && <button className="btn" onClick={logout}>Logout</button>}
						{isPending && <button className="btn" disabled>Logging out...</button>}
					</li>
				)}
			</ul>
		</div>
	);
}
