import { useState } from 'react'
import './style.css'
import profilePhoto from '../../assets/perfil.png'

const profiles = [
	{
		name: 'Ana Silva',
		age: 24,
		city: 'Fortaleza',
		bio: 'Amante de tecnologia.',
		avatar: profilePhoto,
	},
	{
		name: 'Carlos Mendes',
		age: 29,
		city: 'Recife',
		bio: 'Desenvolvedor front-end.',

		avatar: profilePhoto,
	},
	{
		name: 'Marina Costa',
		age: 27,
		city: 'João Pessoa',
		bio: 'Designer e ilustradora.',
		avatar: profilePhoto,
	},
]

function ProfileStateScreen() {
	const [profileIndex, setProfileIndex] = useState(0)

	const currentProfile = profiles[profileIndex]

	const changeProfile = () => {
		setProfileIndex((currentIndex) => (currentIndex + 1) % profiles.length)
	}

	return (
		<main className="perfil">
			<section>
				<img
					src={currentProfile.avatar}
					alt={currentProfile.name}
				/>

				<h2>{currentProfile.name}</h2>
				<p>
					{currentProfile.age} anos {currentProfile.city}
				</p>

				<p>{currentProfile.bio}</p>

				{currentProfile.name === 'Marina Costa' ? (
					<p className="profile-state-destaque">
						Perfil em destaque: {currentProfile.name}!
					</p>
				) : (
					<p className="profile-state-comum">Perfil comum</p>
				)}

				<button
					type="button"
					className="profile-state-button"
					onClick={changeProfile}
				>
					Próximo perfil
				</button>
			</section>
		</main>
	)
}

export default ProfileStateScreen
