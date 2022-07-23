import { Component, ReactNode, CSSProperties } from "react"
import styled, { css } from "styled-components"

type StyleProps = Pick<Props, "variant" | "width" | "height" | "isActive">

const Outline = css<StyleProps>`
	border: 1px solid ${p => p.theme.main.textColor};
	color: ${p => p.theme.main.textColor};
	background: transparent;
	&.select {
		border: 1px solid ${p => p.theme.main.textColor};
		background-color: ${p =>
			p.isActive ? p.theme.main.textColor : "transparent"};
		color: ${p => (p.isActive ? "#fff" : p.theme.main.textColor)};
		font-size: inherit;
		cursor: pointer;
	}
`
const Contained = css<StyleProps>`
	background: ${p => p.theme.main.color};
	border: none;
	color: #fff;
	&.color {
		background-color: transparent;
		border: 1px solid #fff;
		outline: 1px solid
			${({ theme, isActive }) => (isActive ? theme.main.color : "transparent")};
	}
`

const S = {
	Button: styled.button<StyleProps>`
		cursor: pointer;
		font-family: ${p => p.theme.fonts.raleway};
		font-weight: 600;
		font-size: 14px;
		width: ${p => p.width || "initial"};
		height: ${p => p.height || "initial"};
		text-transform: uppercase;
		${p => (p.variant === "contained" ? Contained : Outline)}
	`,
}
type Props = {
	children: ReactNode
	variant: "outline" | "contained"
	isActive?: boolean
	className?: string
	style?: CSSProperties
	width?: string
	height?: string
}

class Button extends Component<Props> {
	render(): ReactNode {
		const { children, className, variant, height, width, isActive, style } =
			this.props
		return (
			<S.Button
				isActive={isActive}
				variant={variant}
				className={className}
				width={width}
				height={height}
				style={style}>
				{children}
			</S.Button>
		)
	}
}

export default Button
