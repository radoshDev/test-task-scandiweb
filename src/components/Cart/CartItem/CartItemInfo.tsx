import { Component, ReactNode } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import { Currency } from "../../../types/navigationData"
import { Product } from "../../../types/product"
import { Cart } from "../../../types/storeTypes"
import { getPriceByCurrency } from "../../../utils/getPriceByCurrency"
import { Attribute } from "../../Attribute"

const S = {
	ProductInfo: styled.div`
		flex: 1 1;
		.product_title {
			line-height: 1.4;
			font-size: 30px;
			margin-bottom: 10px;
			display: inline-flex;
			flex-direction: column;
			align-items: flex-start;
			.product_brand {
				font-weight: 600;
			}
			.product_name {
				font-weight: 400;
			}
		}
		.price {
			font-size: 24px;
			font-weight: 700;
			line-height: 1;
			margin-bottom: 20px;
		}
	`,
}

type Props = {
	productData: Product
	options: Cart["options"]
	selectedCurrency: Currency | null
}

class CartItemInfo extends Component<Props> {
	render(): ReactNode {
		const { productData, selectedCurrency, options } = this.props
		const price = getPriceByCurrency(
			productData.prices,
			selectedCurrency?.label
		)?.amount

		return (
			<S.ProductInfo className="product_info">
				<Link to={`/product/${productData.id}`} className="product_title">
					<span className="product_brand">{productData.brand}</span>{" "}
					<span className="product_name">{productData.name}</span>
				</Link>
				<div className="price">
					{selectedCurrency?.symbol}
					{price}
				</div>
				<div className="product_attributes">
					{productData.attributes.map(attribute => (
						<Attribute
							key={attribute.id}
							attributeData={attribute}
							selectedOptionId={options[attribute.id]}
						/>
					))}
				</div>
			</S.ProductInfo>
		)
	}
}

export default CartItemInfo
