import { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import './style.css'

type User = {
	fullName: string
	email: string
	password: string
	confirmPassword?: string
}

// Chave usada no localStorage para guardar a lista de usuários
const USERS_STORAGE_KEY = 'cadastro.usuarios'

function Form() {
	const [user, setUser] = useState<User>({
		fullName: '',
		email: '',
		password: '',
	})
	const [showPassword, setShowPassword] = useState(false)
	// A lista fica persistida no localStorage (dados sobrevivem ao reload da página)
	const [users, setUsers] = useLocalStorage<User[]>(USERS_STORAGE_KEY, [])
	const [editingIndex, setEditingIndex] = useState<number | null>(null)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setUser((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (
			!user.fullName.trim() ||
			!user.email.trim() ||
			!user.password.trim()
		) {
			alert('Preencha todos os campos.')
			return
		}
		if (user.password !== user.confirmPassword) {
			alert('As senhas não coincidem.')
			return
		}

		// Atualização funcional: evita usar estado desatualizado (stale state)
		if (editingIndex === null) {
			setUsers((prevUsers) => [...prevUsers, user])
		} else {
			setUsers((prevUsers) =>
				prevUsers.map((currentUser, index) =>
					index === editingIndex ? user : currentUser,
				),
			)
		}
		resetForm()
	}

	const resetForm = () => {
		setUser({
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
		})
		setEditingIndex(null)
	}

	const handleEdit = (index: number) => {
		const userToEdit = users[index]
		setUser({ ...userToEdit, confirmPassword: userToEdit.password })
		setEditingIndex(index)
	}

	const handleDelete = (index: number) => {
		if (!window.confirm('Deseja realmente excluir este usuário?')) {
			return
		}

		setUsers((prevUsers) =>
			prevUsers.filter((_, userIndex) => userIndex !== index),
		)

		if (editingIndex === index) {
			resetForm()
			return
		}

		//faz o índice acompanhar a lista de usuários se o usuário for excluído
		if (editingIndex !== null && index < editingIndex) {
			setEditingIndex(editingIndex - 1)
		}
	}

	return (
		<>
			<h1 className="form-title">Cadastro</h1>
			<form
				className={`form-container${editingIndex !== null ? ' editando' : ''}`}
				onSubmit={handleSubmit}
			>
				<label className="form-label">Nome completo</label>
				<input
					className="form-input"
					type="text"
					name="fullName"
					value={user.fullName}
					onChange={handleChange}
					placeholder="Digite seu nome completo"
				/>

				<label className="form-label">Email</label>
				<input
					className="form-input"
					type="email"
					name="email"
					value={user.email}
					onChange={handleChange}
					placeholder="Digite seu email"
				/>

				<label className="form-label">Senha</label>
				<input
					className="form-input"
					type={showPassword ? 'text' : 'password'}
					name="password"
					value={user.password}
					onChange={handleChange}
					placeholder="Digite sua senha"
				/>

				<label className="form-label">Repetir senha</label>
				<input
					className="form-input"
					type={showPassword ? 'text' : 'password'}
					name="confirmPassword"
					value={user.confirmPassword}
					onChange={handleChange}
					placeholder="Repita sua senha"
				/>

				<label className="form-checkbox-label">
					<input
						className="form-checkbox"
						type="checkbox"
						checked={showPassword}
						onChange={(e) => setShowPassword(e.target.checked)}
					/>
					Mostrar senha
				</label>
				<button
					className="form-button"
					type="submit"
				>
					<span className="form-button-text">
						{editingIndex === null ? 'Cadastrar' : 'Alterar'}
					</span>
				</button>

				{editingIndex !== null && (
					<button
						className="form-button form-button-cancel"
						type="button"
						onClick={resetForm}
					>
						<span className="form-button-text">Cancelar</span>
					</button>
				)}
			</form>
			<div className="form-table">
				<h1 className="form-title">Usuários</h1>
				<table>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Email</th>
							<th className="form-table-actions">Ações</th>
						</tr>
					</thead>
					<tbody>
						{users.map((item, index) => (
							<tr key={index}>
								<td>{item.fullName}</td>
								<td>{item.email}</td>
								<td className="form-table-actions">
									<button
										className="form-button"
										onClick={() => handleEdit(index)}
									>
										Editar
									</button>
									<button
										className="form-button"
										onClick={() => handleDelete(index)}
									>
										Excluir
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default Form
