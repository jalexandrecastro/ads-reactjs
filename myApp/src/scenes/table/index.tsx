import './style.css'

function Table() {
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
		<div className="table-container">
			<table className="table">
				<thead>
					<tr>
						<th className="table-header">Name</th>
						<th className="table-header">Email</th>
						<th className="table-header">Age</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr
							key={index}
							className="table-row"
						>
							<td className="table-cell">{user.name}</td>
							<td className="table-cell">{user.email}</td>
							<td className="table-cell">{user.age}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
