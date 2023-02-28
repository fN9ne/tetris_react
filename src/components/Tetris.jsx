import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { createStage, checkCollision } from '../gameHelpers';

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

import { useEffect, useState } from 'react';

import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
	const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

	const movePlayer = dir => {
		if (!checkCollision(player, stage, { x: dir, y: 0 })) updatePlayerPos({ x: dir, y: 0 });
	}

	const [bestScore, setBestScore] = useState(0);

	const saveScore = (score) => {
		window.localStorage.setItem('bestScore', score);
	}

	useEffect(() => {
		if (bestScore < score) {
			setBestScore(score);
		}
		// eslint-disable-next-line
	}, [score]);

	useEffect(() => {
		if (window.localStorage.getItem('bestScore')) {
			setBestScore(window.localStorage.getItem('bestScore'));
		}
	}, []);

	const startGame = () => {
		setStage(createStage());
		setDropTime(1000);
		resetPlayer();
		setGameOver(false);
		setScore(0);
		setRows(0);
		setLevel(0);
	}

	const drop = () => {
		if (rows >= (level + 1) * 10) {
			setLevel(prev => prev + 1);
			setDropTime(1000 / (level + 1) + 200);
		}

		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false, });
		} else {
			if (player.pos.y < 1) {
				setGameOver(true);
				setDropTime(null);
				if (score > bestScore) {
					saveScore(score);
				}
			}
			updatePlayerPos({ x: 0, y: 0, collided: true });
		}
	}

	const keyUp = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 40) setDropTime(1000 / (level + 1) + 200);
		}
	}

	const dropPlayer = () => {
		setDropTime(null);
		drop();
	}

	const move = (event) => {
		if ([40, 38].includes(event.keyCode)) {
			event.preventDefault();
		}
		if (!gameOver) {
			// eslint-disable-next-line
			switch (event.keyCode) {
				case 37:
					movePlayer(-1);
					break;
				case 39:
					movePlayer(1);
					break;
				case 40:
					dropPlayer();
					break;
				case 38:
					playerRotate(stage, 1);
					break;
			}
		}
	}

	useInterval(() => {
		drop();
	}, dropTime);

	return (
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyUp={keyUp} onKeyDown={event => move(event)}>
			<StyledTetris>
				<Stage stage={stage}></Stage>
				<aside>
					{gameOver
						? <Display color={"gameOver"} text="Game Over"></Display>
						: null
					}
					<div>
						<Display color={"bestScore"} text={`Best score: ${bestScore}`}></Display>
						<Display text={`Score: ${score}`}></Display>
						<Display text={`Rows: ${rows}`}></Display>
						<Display text={`Level: ${level + 1}`}></Display>
					</div>
					<StartButton callback={startGame}></StartButton>
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
}

export default Tetris;