import { useState } from 'react'
import './style.css'

type Perfil = {
	nome: string
	idade: number
}

function ProfileStateScreenObject() {
	const [perfil, setPerfil] = useState<Perfil>({
		nome: 'João Silva',
		idade: 30,
	})

	const changeNome = (novoNome: string) => {
		setPerfil((prevState) => ({ ...prevState, nome: novoNome }))
	}

	const incrementarIdade = () => {
		setPerfil((prevState) => ({ ...prevState, idade: prevState.idade + 1 }))
	}

	const decrementarIdade = () => {
		setPerfil((prevState) => ({ ...prevState, idade: prevState.idade - 1 }))
	}

	return (
		<main className="profile-editing-container">
			<h1>Perfil do Usuário</h1>
			<div className="profile-editing-card">
				<div className="profile-editing-info">
					<h2>Editar Perfil</h2>
					<div>
						<label>Nome:</label>
						<input
							type="text"
							value={perfil.nome}
							onChange={(e) => changeNome(e.target.value)}
						/>
					</div>
					<div>
						<label>Idade:</label>
						<button onClick={decrementarIdade}>-</button>
						<span>{perfil.idade}</span>
						<button onClick={incrementarIdade}>+</button>
					</div>
				</div>
			</div>
		</main>
	)
}

export default ProfileStateScreenObject
