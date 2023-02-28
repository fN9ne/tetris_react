import styled from "styled-components";

export const StyledDisplay = styled.div`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	margin: 0 0 20px 0;
	padding: 15px 15px 14px;
	border: 4px solid #333;
	min-height: 30px;
	width: 100%;
	border-radius: 15px;
	color: ${props => (props.color === "gameOver" ? 'red' : props.color === "bestScore" ? 'cyan' : '#eee')};
	background: #000;
	font-family: Pixel, Arial, Helvetica, sans-serif;
	font-size: 1rem;
`