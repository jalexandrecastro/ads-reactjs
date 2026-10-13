import './style.css'

interface ProfilePropsProps {
	name: string
	email: string
	photo: string
}

function ProfileProps({ name, email, photo }: ProfilePropsProps) {
	return (
		<div className="perfil">
			<h1>Perfil do Usuário</h1>
			<img
				src={photo}
				alt="Foto de Perfil"
			/>
			<p>Nome: {name}</p>
			<p>Email: {email}</p>
		</div>
	)
}

export default ProfileProps
