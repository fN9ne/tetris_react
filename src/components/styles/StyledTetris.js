import styled from "styled-components";

export const StyledTetrisWrapper = styled.div`
	max-width: 100vw;
	min-height: 100vh;
	overflow:hidden;
	background: #12131f;
	display: flex;
	justify-content: center;
`

export const StyledTetris = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 20px 0;
	margin: 0 auto;
	width: 100%;
	max-width: 900px;

	aside {
		width: 100%;
		max-width: 300px;
		display: block;
		padding: 0 20px;
	}
`