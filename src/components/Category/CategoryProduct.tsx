import { Component, ReactNode, memo } from "react"
import { connect, ConnectedProps } from "react-redux"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components/macro"
import { addToCart } from "../../app/slices/shopSlice"
import { CategoryProduct as ICategoryProduct } from "../../types/category"
import { RootState } from "../../types/storeTypes"
import { getPriceByCurrency } from "../../utils/getPriceByCurrency"
import Button from "../ui/Button"
import CartIcon from "../ui/icons/CartIcon"

const cover = css`
	content: "";
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(255, 255, 255, 0.5);
	pointer-events: none;
`

const S = {
	CategoryProduct: styled.div<{ inStock: boolean }>`
		position: relative;
		padding: 16px;
		width: 386px;
		transition: box-shadow 0.3s ease;
		&:hover {
			box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
			.cart_btn {
				opacity: 1;
				pointer-events: initial;
			}
		}
		&::after {
			${p => (p.inStock ? "" : cover)}
		}
		.image {
			position: relative;
			margin-bottom: 24px;
			img {
				object-fit: contain;
			}
			.out_of_stock_text {
				color: #8d8f9a;
				font-size: 24px;
				text-transform: uppercase;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
		.cart_btn {
			border-radius: 50%;
			padding: 14px 15px 14px 13px;
			position: absolute;
			bottom: 72px;
			right: 31px;
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.3s ease;
		}
		.product_name {
			font-weight: 300;
			line-height: 1.6;
		}
		.product_price {
			font-size: 18px;
			font-weight: 500;
			line-height: 1.6;
		}
	`,
}

type Props = {
	product: ICategoryProduct
} & ConnectedProps<typeof connector>

class CategoryProduct extends Component<Props> {
	render(): ReactNode {
		const {
			product: { gallery, id, inStock, name, prices, brand, attributes },
			selectedCurrency,
			addProductToCart,
		} = this.props

		const price = getPriceByCurrency(prices, selectedCurrency?.label)
		const showAddCart = inStock && attributes.length === 0

		return (
			<S.CategoryProduct inStock={inStock}>
				<Link to={`/product/${id}`}>
					<div className="image">
						<img src={gallery[0]} alt={name + 1} width={354} height={330} />
						{!inStock && (
							<span className="out_of_stock_text">Out of stock</span>
						)}
					</div>
					<div className="product_name">
						{brand} {name}
					</div>
					<span className="product_price">
						{price?.currency.symbol}
						{price?.amount}
					</span>
				</Link>
				{showAddCart && (
					<Button
						onClick={() =>
							addProductToCart({ options: {}, prices, productId: id })
						}
						variant="contained"
						width="52px"
						height="52px"
						className="cart_btn">
						<CartIcon color="#fff" />
					</Button>
				)}
			</S.CategoryProduct>
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

export default memo(connector(CategoryProduct))
