import { Component, ReactNode, CSSProperties } from "react"
import styled, { css } from "styled-components"

type StyleProps = Pick<
	Props,
	"variant" | "width" | "height" | "isActive" | "disabled"
>

const Outline = css<StyleProps>`
	border: 1px solid ${p => p.theme.main.textColor};
	color: ${p => p.theme.main.textColor};
	background: transparent;
	&.text {
		border: 1px solid ${p => p.theme.main.textColor};
		background-color: ${p =>
			p.isActive ? p.theme.main.textColor : "transparent"};
		color: ${p => (p.isActive ? "#fff" : p.theme.main.textColor)};
		font-size: inherit;
		cursor: pointer;
	}
`
const Contained = css<StyleProps>`
	background: ${({ theme, disabled }) =>
		!disabled ? theme.main.color : "#666"};
	cursor: ${p => (p.disabled ? "default" : "pointer")};
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
	disabled?: boolean
	isActive?: boolean
	className?: string
	style?: CSSProperties
	width?: string
	height?: string
	onClick?: () => void
}

class Button extends Component<Props> {
	render(): ReactNode {
		const {
			children,
			className,
			variant,
			disabled,
			height,
			width,
			isActive,
			style,
			onClick,
		} = this.props
		return (
			<S.Button
				disabled={disabled}
				variant={variant}
				isActive={isActive}
				className={className}
				width={width}
				height={height}
				style={style}
				onClick={onClick}>
				{children}
			</S.Button>
		)
	}
}

export default Button
