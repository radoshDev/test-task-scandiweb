import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import { connect, ConnectedProps } from "react-redux"
import ProductInfo from "./ProductInfo"
import ProductImages from "./ProductImages"
import Preloader from "../ui/Preloader"
import ErrorAlert from "../ui/ErrorAlert"
import { RootState } from "../../types/storeTypes"
import { getProduct } from "../../api"
import { setCategory, setIsShowCart } from "../../app/slices/shopSlice"

const S = {
	Product: styled.div`
		display: flex;
		padding: 80px 0;
	`,
}

type OwnProps = {
	productId: string
}

type Props = OwnProps & ConnectedProps<typeof connector>

class Product extends Component<Props> {
	async componentDidMount(): Promise<void> {
		const {
			fetchProduct,
			productId,
			setSelectedCategory,
			selectedCategory,
			setIsShowCartModal,
			isShowCartModal,
		} = this.props
		if (isShowCartModal) {
			setIsShowCartModal(false)
		}
		const response = await fetchProduct(productId)

		if (response.data && response.data.category !== selectedCategory) {
			setSelectedCategory(response.data.category)
		}
	}

	componentDidUpdate(prevProps: Props): void {
		const { productId, isShowCartModal, setIsShowCartModal } = this.props
		if (prevProps.productId === productId) return
		if (isShowCartModal) {
			setIsShowCartModal(false)
		}
	}

	render(): ReactNode {
		const { productResponse } = this.props
		const { data: productData, isLoading, error } = productResponse
		return (
			<>
				{productData && (
					<S.Product>
						<ProductImages
							gallery={productData.gallery}
							productName={productData.name}
						/>
						<ProductInfo product={productData} />
					</S.Product>
				)}
				{isLoading && <Preloader />}
				{error && <ErrorAlert message="Problem to load products" />}
			</>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState, { productId }: OwnProps) => ({
	productResponse: getProduct.select(productId)(state),
	selectedCategory: state.shop.category,
	isShowCartModal: state.shop.cart.isShow,
})

const mapDispatch = {
	fetchProduct: getProduct.initiate,
	setSelectedCategory: setCategory,
	setIsShowCartModal: setIsShowCart,
}

const connector = connect(mapState, mapDispatch)

export default connector(Product)
