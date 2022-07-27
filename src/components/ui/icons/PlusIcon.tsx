import { Component, ReactNode } from "react"

type Props = {
	color?: string
}

class PlusIcon extends Component<Props> {
	render(): ReactNode {
		const { color } = this.props
		return (
			<svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line
					x1="1"
					x2="9"
					y1="5"
					y2="5"
					strokeWidth="1"
					stroke={color || "#1D1F22"}
					strokeLinecap="round"
				/>
				<line
					x1="5"
					x2="5"
					y1="1"
					y2="9"
					strokeWidth="1"
					stroke={color || "#1D1F22"}
					strokeLinecap="round"
				/>
			</svg>
		)
	}
}

export default PlusIcon
