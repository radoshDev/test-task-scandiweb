import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components/macro"
import { updateCartQty } from "../../../app/slices/shopSlice"
import { Product } from "../../../types/product"
import { Cart, RootState } from "../../../types/storeTypes"
import { getPriceByCurrency } from "../../../utils/getPriceByCurrency"
import Attribute from "../../Attribute/Attribute"
import Button from "../../ui/Button"
import MinusIcon from "../../ui/icons/MinusIcon"
import PlusIcon from "../../ui/icons/PlusIcon"

const S = {
	ProductInfo: styled.div`
		flex: 1 1;
		.product_title {
			line-height: 1.4;
			font-size: 30px;
			margin-bottom: 10px;
			.product_brand {
				font-weight: 600;
				display: block;
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

	QtyAction: styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.btn {
			width: 45px;
			height: 45px;
			display: flex;
			justify-content: center;
			align-items: center;
			& > svg {
				width: 15px;
				height: 15px;
			}
		}
		.qty {
			font-weight: 500;
			font-size: 24px;
		}
	`,
	ProductImage: styled.div`
		display: flex;
		flex-basis: 200px;
		img {
			width: 100%;
			height: auto;
			object-fit: contain;
		}
	`,
}

type Props = {
	productData: Product
	productId: Product["id"]
	options: Cart["options"]
	quantity: Cart["qty"]
} & ConnectedProps<typeof connector>

class CartItemContent extends Component<Props> {
	render(): ReactNode {
		const {
			productData,
			quantity,
			options,
			selectedCurrency,
			handleUpdateCartQty,
			productId,
		} = this.props
		const price = getPriceByCurrency(
			productData.prices,
			selectedCurrency?.label
		)?.amount
		return (
			<>
				<S.ProductInfo className="product_info">
					<div className="product_title">
						<span className="product_brand">{productData.brand}</span>{" "}
						<span className="product_name">{productData.name}</span>
					</div>
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
				<S.QtyAction className="qty_action">
					<Button
						variant="outline"
						className="btn"
						onClick={() =>
							handleUpdateCartQty({ newQty: quantity + 1, options, productId })
						}>
						<PlusIcon />
					</Button>
					<span className="qty">{quantity}</span>
					<Button
						variant="outline"
						className="btn"
						onClick={() =>
							handleUpdateCartQty({ newQty: quantity - 1, options, productId })
						}>
						<MinusIcon />
					</Button>
				</S.QtyAction>
				<S.ProductImage className="product_image">
					<img
						src={productData.gallery[0]}
						alt="product d"
						width={121}
						height={190}
					/>
				</S.ProductImage>
			</>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	selectedCurrency: state.shop.currency,
})

const mapDispatch = {
	handleUpdateCartQty: updateCartQty,
}

const connector = connect(mapState, mapDispatch)

export default connector(CartItemContent)
