import { Component, ReactNode } from "react"

type Props = {
	direction: "left" | "right"
	color?: string
}

class ArrowIcon extends Component<Props> {
	render(): ReactNode {
		const { direction, color } = this.props
		return (
			<svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d={
						direction === "right"
							? "M0.75 1.06808L6.375 6.68711L0.75 12.3062"
							: "M7.25 1.06857L1.625 6.6876L7.25 12.3066"
					}
					stroke={color || "white"}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		)
	}
}

export default ArrowIcon
