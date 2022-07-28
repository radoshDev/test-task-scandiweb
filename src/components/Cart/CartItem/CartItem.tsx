/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import { connect, ConnectedProps } from "react-redux"
import { Cart, RootState } from "../../../types/storeTypes"
import { getProduct } from "../../../api"
import Preloader from "../../ui/Preloader"
import ErrorAlert from "../../ui/ErrorAlert"
import CartItemInfo from "./CartItemInfo"
import { updateCartQty } from "../../../app/slices/shopSlice"
import CartItemQtyAction from "./CartItemQtyAction"
import CartItemImage from "./CartItemImage"

const S = {
	CartItem: styled.div`
		display: flex;
		gap: 24px;
		padding: 24px 0;
		border-top: 1px solid #e5e5e5;
		&:last-child {
			border-bottom: 1px solid #e5e5e5;
		}
	`,
}

type OwnProps = {
	productId: Cart["productId"]
	options: Cart["options"]
	quantity: Cart["qty"]
}

type Props = OwnProps & ConnectedProps<typeof connector>

class CartItem extends Component<Props> {
	async componentDidMount(): Promise<void> {
		const { productId, fetchProduct, productResponse } = this.props
		if (!productResponse.data) {
			await fetchProduct(productId)
		}
	}

	handleUpdateCartQty = (newQty: number): void => {
		const { dispatchUpdateCartQty, options, productId } = this.props
		dispatchUpdateCartQty({ newQty, options, productId })
	}

	render(): ReactNode {
		const { options, quantity, productResponse, selectedCurrency } = this.props
		const { isLoading, data, error } = productResponse

		return (
			<S.CartItem className="cart_item">
				{data && (
					<>
						<CartItemInfo
							productData={data}
							options={options}
							selectedCurrency={selectedCurrency}
						/>
						<CartItemQtyAction
							updateCartQty={this.handleUpdateCartQty}
							quantity={quantity}
						/>
						<CartItemImage gallery={data.gallery} productName={data.name} />
					</>
				)}
				{isLoading && <Preloader />}
				{error && <ErrorAlert message="Problem to load product" />}
			</S.CartItem>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState, { productId }: OwnProps) => ({
	productResponse: getProduct.select(productId)(state),
	selectedCurrency: state.shop.currency,
})

const mapDispatch = {
	fetchProduct: getProduct.initiate,
	dispatchUpdateCartQty: updateCartQty,
}

const connector = connect(mapState, mapDispatch)

export default connector(CartItem)
