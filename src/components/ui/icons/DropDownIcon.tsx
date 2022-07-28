import { Component, ReactNode } from "react"

type Props = {
	isActive: boolean
}

class DropDownIcon extends Component<Props> {
	render(): ReactNode {
		const { isActive } = this.props
		return (
			<span
				className="arrow"
				style={{
					transform: isActive ? "rotateZ(0deg)" : "rotateZ(180deg)",
				}}>
				<svg viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1 3.5L4 0.5L7 3.5"
						stroke="black"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
		)
	}
}

export default DropDownIcon
