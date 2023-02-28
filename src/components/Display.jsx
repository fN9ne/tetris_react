import { StyledDisplay } from "./styles/StyledDisplay";

const Display = ({ color, text }) => (
	<StyledDisplay color={color}>{text}</StyledDisplay>
)

export default Display;