import { useEffect, useState } from "react";
import "./style.css";

// Duração da contagem, em segundos.
const INITIAL_SECONDS = 10;

export default function UseEffectExample() {
	const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
	// Vontade do usuário (botão Iniciar/Pausar). Saber se a contagem está
	// rodando de verdade é derivado abaixo, em vez de virar outro estado.
	const [wantsToRun, setWantsToRun] = useState(false);

	// Estado derivado: quando o tempo zera, isTicking fica falso e o efeito do
	// intervalo se limpa sozinho — sem um efeito só para parar o cronômetro.
	const isTicking = wantsToRun && secondsLeft > 0;

	// EFEITO 1 - o setInterval é um efeito colateral: só pode existir aqui.
	// As dependências definem quando o timer é criado e destruído.
	useEffect(() => {
		if (!isTicking) {
			return;
		}

		const intervalId = setInterval(() => {
			// Atualização funcional: o callback enxerga o estado do momento em
			// que o efeito rodou, então o próximo valor sai do valor anterior.
			setSecondsLeft((current) => current - 1);
		}, 1000);

		// Cleanup: sem isso, cada pausa/retomada deixaria um intervalo órfão
		// rodando e o tempo cairia cada vez mais rápido.
		return () => clearInterval(intervalId);
	}, [isTicking]);

	// EFEITO 2 - sincroniza um sistema externo (o título da aba) com o estado.
	useEffect(() => {
		document.title =
			secondsLeft === 0
				? "⏰ Tempo esgotado!"
				: `${isTicking ? "⏳" : "⏸"} ${secondsLeft}s`;
	}, [secondsLeft, isTicking]);

	const handleToggle = () => {
		if (isTicking) {
			setWantsToRun(false);
			return;
		}
		// Se o tempo acabou, o botão recomeça a contagem do início.
		if (secondsLeft === 0) {
			setSecondsLeft(INITIAL_SECONDS);
		}
		setWantsToRun(true);
	};

	const handleReset = () => {
		setSecondsLeft(INITIAL_SECONDS);
		setWantsToRun(false);
	};

	// Textos derivados do estado: não precisam de useState nem de useEffect.
	const status = isTicking
		? "Em contagem..."
		: secondsLeft === 0
			? "Tempo esgotado"
			: "Pausado";

	return (
		<main className="use-effect-scene">
			<h1>Contagem regressiva com useEffect</h1>
			<p className="use-effect-hint">
				O setInterval é um efeito colateral: só pode viver dentro do
				useEffect.
			</p>

			<p className="use-effect-display">{secondsLeft}s</p>
			<p className="use-effect-status">{status}</p>

			{secondsLeft === 0 && (
				<p className="use-effect-alert" role="alert">
					Tempo esgotado!
				</p>
			)}

			<div className="use-effect-actions">
				<button
					className="use-effect-button"
					type="button"
					onClick={handleToggle}
				>
					{isTicking ? "Pausar" : "Iniciar"}
				</button>
				<button
					className="use-effect-button use-effect-button--secondary"
					type="button"
					onClick={handleReset}
				>
					Reiniciar
				</button>
			</div>
		</main>
	);
}
