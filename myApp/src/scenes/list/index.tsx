function ProfileList() {
	type User = {
		name: string
		email: string
		age: number
	}

	const users: User[] = [
		{ name: 'Ana Silva', email: 'ana.silva@example.com', age: 24 },
		{ name: 'Carlos Mendes', email: 'carlos.mendes@example.com', age: 29 },
		{ name: 'Marina Costa', email: 'marina.costa@example.com', age: 27 },
	]

	return (
		<ul>
			{users.map((user, index) => (
				<li key={index}>
					<strong>{user.name}</strong> — {user.email} — {user.age}{' '}
					anos
				</li>
			))}
		</ul>
	)
}

export default ProfileList
