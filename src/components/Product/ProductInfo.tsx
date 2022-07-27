import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components/macro"
import { addToCart } from "../../app/slices/shopSlice"
import { RootState } from "../../types/storeTypes"
import { Product } from "../../types/product"
import { parseHTML } from "../../utils/parseHtml"
import Attribute from "../Attribute/Attribute"
import Button from "../ui/Button"
import { getPriceByCurrency } from "../../utils/getPriceByCurrency"

const S = {
	ProductInfo: styled.div`
		margin-left: 100px;
		.product_brand {
			font-size: 30px;
			font-weight: 600;
			line-height: 1;
			margin-bottom: 16px;
		}
		.product_name {
			font-size: 30px;
			font-weight: 400;
			line-height: 1;
			margin-bottom: 43px;
		}

		.product_price {
			font-size: 24px;
			font-weight: 700;
			margin-bottom: 20px;
		}
		.warning {
			color: red;
			margin-bottom: 10px;
		}
		.product_description {
			font-family: ${p => p.theme.fonts.roboto};
			line-height: 1.6;
			max-width: 292px;
			margin-top: 40px;
		}
	`,
}

type Props = {
	product: Product
} & ConnectedProps<typeof connector>

type State = {
	selectedProduct: {
		productId: Product["id"]
		options: Record<string, string>
		prices: Product["prices"]
	}
}

class ProductInfo extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			selectedProduct: {
				productId: props.product.id,
				options: props.product.attributes.reduce(
					(acc, curr) => ({ ...acc, [curr.id]: curr.items[0].id }),
					{}
				),
				prices: props.product.prices,
			},
		}
	}

	handleSelectOption = (attrId: string, optionId: string): void => {
		this.setState(({ selectedProduct }) => ({
			selectedProduct: {
				productId: selectedProduct.productId,
				options: { ...selectedProduct.options, [attrId]: optionId },
				prices: selectedProduct.prices,
			},
		}))
	}

	handleAddToCart = (): void => {
		const { addProductToCart } = this.props
		const { selectedProduct } = this.state
		addProductToCart(selectedProduct)
	}

	render(): ReactNode {
		const {
			product: { attributes, brand, description, inStock, name, prices },
			selectedCurrency,
		} = this.props
		const { selectedProduct } = this.state
		const price = getPriceByCurrency(prices, selectedCurrency?.label)
		return (
			<S.ProductInfo>
				<h2 className="product_brand">{brand}</h2>
				<h1 className="product_name">{name}</h1>
				{attributes.map(attribute => (
					<Attribute
						attributeData={attribute}
						key={attribute.id}
						selectedOptionId={selectedProduct.options[attribute.id]}
						selectOption={this.handleSelectOption}
					/>
				))}
				<div className="attribute_name">Price:</div>
				<div className="product_price">
					{price?.currency.symbol}
					{price?.amount}
				</div>
				{!inStock && <div className="warning">OUT OF STOCK</div>}
				<Button
					onClick={this.handleAddToCart}
					variant="contained"
					width="292px"
					height="52px"
					disable={!inStock}>
					Add to Cart
				</Button>

				<div className="product_description">{parseHTML(description)}</div>
			</S.ProductInfo>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	selectedCurrency: state.shop.currency,
})

const mapDispatch = {
	addProductToCart: addToCart,
}

const connector = connect(mapState, mapDispatch)

export default connector(ProductInfo)
