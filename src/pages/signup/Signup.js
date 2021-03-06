import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'

export default function Signup() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [thumbnail, setThumbnail] = useState(null)
	const [thumbnailError, setThumbnailError] = useState(null)
	const { signup, isPending, error } = useSignup()

	const handleSubmit = e => {
		e.preventDefault()
		signup(email, password, firstName, lastName, displayName, thumbnail)
	}

	const handleFileChange = e => {
		setThumbnail(null)
		let selected = e.target.files[0]
		console.log(selected)

		if (!selected) {
			setThumbnailError('Please select a file')
			return
		}
		if (!selected.type.includes('image')) {
			setThumbnailError('Selected file nust be an image')
			return
		}
		if (selected.size > 100000) {
			setThumbnailError('Image file size must be less than 100kb')
			return
		}

		setThumbnailError(null)
		setThumbnail(selected)
		console.log('thumbnail updated')
	}

	return (
		<div className="auth-form">
			<h2>Sign up</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Email:</span>
					<input
						required
						type="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</label>
				<label>
					<span>Password:</span>
					<input
						required
						type="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</label>
				<div style={{display: 'flex', gap: '1rem'}}>
					<label>
						<span>First name:</span>
						<input
							required
							type="test"
							onChange={e => setFirstName(e.target.value)}
							value={firstName}
						/>
					</label>
					<label>
						<span>Last name:</span>
						<input
							required
							type="test"
							onChange={e => setLastName(e.target.value)}
							value={lastName}
						/>
					</label>
				</div>
				<label>
					<span>Display name:</span>
					<input
						required
						type="test"
						onChange={e => setDisplayName(e.target.value)}
						value={displayName}
					/>
				</label>
				<label>
					<span>Profile thumbnail:</span>
					<input required type="file" onChange={handleFileChange} />
					{thumbnailError && <p className="error">{thumbnailError}</p>}
				</label>
				{!isPending && <button className="btn">Sign up</button>}
				{isPending && <button className="btn" disabled>Loading</button>}
				{error && <p className="error">{error}</p>}
			</form>
		</div>
	)
}
