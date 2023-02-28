import styled from "styled-components";

export const StyledStage = styled.div`
	display: grid;
	grid-template-rows: repeat(
		${props => props.height},
		calc(21vw / ${props => props.width})
	);
	grid-template-columns: repeat(${props => props.width}, 1fr);
	grid-gap: 1px;
	border: 4px solid #333;
	border-radius: 15px;
	overflow: hidden;
	width: 100%;
	max-width: 21vw;
	background: #111;
`