import './style.css'
import profilePhoto from '../../assets/perfil.png'

function Profile() {
	const user = {
		name: 'João Silva',
		email: 'joaosilva@mail.com',
		photo: profilePhoto,
	}

	return (
		<div className="perfil">
			<h1>Perfil do Usuário</h1>
			<img
				src={user.photo}
				alt="Foto de Perfil"
			/>
			<p>Nome: {user.name}</p>
			<p>Email: {user.email}</p>
		</div>
	)
}

export default Profile
