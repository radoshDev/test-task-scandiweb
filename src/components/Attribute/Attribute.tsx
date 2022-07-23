import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import Button from "../ui/Button"

const S = {
	Attribute: styled.div`
		&:not(:last-child) {
			margin-bottom: 8px;
		}
		.attribute_name {
			margin-bottom: 8px;
			font-size: 14px;
		}
	`,
	Color: styled,
}

type Props = {
	values: string[] | { att_value: string; color: string }[]
	name: string
}

class Attribute extends Component<Props> {
	render(): ReactNode {
		const { values, name } = this.props

		return (
			<S.Attribute>
				<div className="attribute_name">{name}:</div>
				<div className="attribute_values">
					{values.map((value, i) => {
						const isSelect = typeof value === "string"
						const className = isSelect ? "select" : "color"
						const attr_name = isSelect ? value : ""
						const style = isSelect
							? undefined
							: { backgroundColor: value.color }
						return (
							<Button
								variant={isSelect ? "outline" : "contained"}
								isActive={i === 0}
								className={`attr_btn ${className}`}
								key={i}
								style={style}>
								{attr_name}
							</Button>
						)
					})}
				</div>
			</S.Attribute>
		)
	}
}

export default Attribute
