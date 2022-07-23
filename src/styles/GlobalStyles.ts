import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body {
		font-family: ${p => p.theme.fonts.raleway};
		font-size: 16px;
		color: ${p => p.theme.main.textColor}
	}

	ul, li {
		list-style: none;
	}
	a {
		color: inherit;
		text-decoration: none;
		&:visited {
			color: inherit;
		}
	}
	img {
		display: inline-block;
	}
`
