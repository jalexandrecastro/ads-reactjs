import { Routes, Route, Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Form from './scenes/form'
import Counter from './scenes/counter'
import Profile from './scenes/profile'
import ProfileProps from './scenes/profileProps'
import ProfilePropsChildren from './scenes/profilePropsChildren'
import ProfileStateScreen from './scenes/profileState'
import profilePhoto from './assets/perfil.png'
import Table from './scenes/table'
import ProfileList from './scenes/list'
import ProfileStateScreenObject from './scenes/profileEditing'

const user = {
	name: 'Maria Silva',
	email: 'maria.silva@email.com',
	photo: profilePhoto,
}

function Welcome() {
	return (
		<>
			<h1>Bem-vindo(a)!</h1>
			<p>
				Selecione uma opção no menu lateral para navegar entre as
				scenes.
			</p>
		</>
	)
}

function Layout() {
	return (
		<div className="app-layout">
			<Sidebar />
			<div className="app-conteudo">
				<Outlet />
			</div>
		</div>
	)
}

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route
					index
					element={<Welcome />}
				/>
				<Route
					path="contador"
					element={<Counter />}
				/>
				<Route
					path="perfil"
					element={<Profile />}
				/>
				<Route
					path="perfil-props"
					element={<ProfileProps {...user} />}
				/>
				<Route
					path="perfil-children"
					element={
						<ProfilePropsChildren>
							<h1>Perfil com Children</h1>
							<p>Nome: {user.name}</p>
							<p>Email: {user.email}</p>
						</ProfilePropsChildren>
					}
				/>
				<Route
					path="perfil-state"
					element={<ProfileStateScreen />}
				/>
				<Route
					path="perfil-editavel"
					element={<ProfileStateScreenObject />}
				/>
				<Route
					path="table"
					element={<Table />}
				/>
				<Route
					path="list"
					element={<ProfileList />}
				/>
				<Route
					path="form"
					element={<Form />}
				/>
			</Route>
		</Routes>
	)
}

export default App
