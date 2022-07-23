import { Component, ReactNode } from "react"

type Props = {
	value: string
	name: string
}

class AttributeText extends Component<Props> {
	render(): ReactNode {
		const { value, name } = this.props
		return (
			<div>
				<div className="attribute_name">{name}:</div>
				<div className="attribute_values">{value}</div>
			</div>
		)
	}
}

export default AttributeText
