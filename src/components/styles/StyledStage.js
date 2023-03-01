import styled from "styled-components";

export const StyledStage = styled.div`
	display: grid;
	grid-template-rows: repeat(
		${props => props.height},
		calc(42vh / ${props => props.width})
	);
	grid-template-columns: repeat(${props => props.width}, 1fr);
	grid-gap: 1px;
	border: 4px solid #333;
	overflow: hidden;
	width: 100%;
	max-width: 42vh;
	background: #111;
`