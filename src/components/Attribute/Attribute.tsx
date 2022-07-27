import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import Button from "../ui/Button"
import { Attribute as IAtribute } from "../../types/product"

const S = {
	Attribute: styled.div`
		&:not(:last-child) {
			margin-bottom: 24px;
		}
		.attribute_name {
			margin-bottom: 8px;
			font-size: 18px;
			text-transform: uppercase;
			font-family: ${p => p.theme.fonts.robotoCondensed};
			font-weight: 700;
		}
		.attribute_values {
			.attr_btn {
				font-family: sans-serif;
				&.text {
					width: 63px;
					height: 45px;
					margin-right: 12px;
					font-size: 16px;
					font-weight: 400;
					letter-spacing: 0.05em;
				}
				&.color {
					margin-right: 8px;
					width: 36px;
					height: 36px;
				}
			}
		}
	`,
}

type Props = {
	attributeData: IAtribute
	selectedOptionId: string
	selectOption?: (attrId: string, optionValue: string) => void
}

class Attribute extends Component<Props> {
	render(): ReactNode {
		const {
			attributeData: { name, type, items, id: attrId },
			selectedOptionId,
			selectOption,
		} = this.props
		const isColor = type === "swatch"
		return (
			<S.Attribute>
				<div className="attribute_name">{name}:</div>
				<div className="attribute_values">
					{items.map(item => {
						const className = isColor ? "color" : "text"
						const displayText = isColor ? "" : item.value
						const style = isColor ? { backgroundColor: item.value } : undefined
						return (
							<Button
								variant={isColor ? "contained" : "outline"}
								isActive={selectedOptionId === item.id}
								className={`attr_btn ${className}`}
								key={item.id}
								style={style}
								onClick={() => selectOption?.(attrId, item.id)}>
								{displayText}
							</Button>
						)
					})}
				</div>
			</S.Attribute>
		)
	}
}

export default Attribute
