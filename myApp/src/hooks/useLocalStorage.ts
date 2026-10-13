import { useEffect, useState } from 'react'

export function useLocalStorage<T>(storageKey: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		try {
			const storedValue = window.localStorage.getItem(storageKey)

			return storedValue !== null
				? (JSON.parse(storedValue) as T)
				: initialValue
		} catch (error) {
			console.error(
				`Não foi possível ler "${storageKey}" do localStorage.`,
				error,
			)
			return initialValue
		}
	})

	useEffect(() => {
		try {
			window.localStorage.setItem(storageKey, JSON.stringify(value))
		} catch (error) {
			console.error(
				`Não foi possível salvar "${storageKey}" no localStorage.`,
				error,
			)
		}
	}, [storageKey, value])

	return [value, setValue] as const
}
