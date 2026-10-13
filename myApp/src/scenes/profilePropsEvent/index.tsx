import './style.css'

interface ProfilePropsProps {
	name: string
	email: string
	photo: string
	onSelect: (message: string) => void
}

function ProfilePropsEvent({
	name,
	email,
	photo,
	onSelect,
}: ProfilePropsProps) {
	function handleSelect() {
		onSelect(`Usuário selecionado: ${name}`)
	}

	return (
		<div className="perfil">
			<h1>Perfil do Usuário</h1>
			<img
				src={photo}
				alt="Foto de Perfil"
			/>
			<p>Nome: {name}</p>
			<p>Email: {email}</p>
			<button onClick={handleSelect}>Selecionar usuário</button>
		</div>
	)
}

export default ProfilePropsEvent
