import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import { getProduct } from "../../api"
import { setCategory } from "../../app/slices/shopSlice"
import { RootState } from "../../types/storeTypes"
import Product from "./Product"

type OwnProps = {
	productId: string
}

type Props = OwnProps & ConnectedProps<typeof connector>

class ProductContainer extends Component<Props> {
	async componentDidMount(): Promise<void> {
		const { fetchProduct, productId, setSelectedCategory, selectedCategory } =
			this.props
		const response = await fetchProduct(productId)
		console.log("componente mounted, product fetched")
		if (response.data && response.data?.category !== selectedCategory) {
			setSelectedCategory(response.data.category)
		}
	}

	// async componentDidUpdate(prevProps: Props): Promise<void> {
	// 	const { fetchProduct, productId, setSelectedCategory, selectedCategory } =
	// 		this.props
	// 	if (prevProps.productId === productId) return
	// 	console.log("product refetch")

	// 	const response = await fetchProduct(productId)

	// 	if (response.data && response.data?.category !== selectedCategory) {
	// 		setSelectedCategory(response.data.category)
	// 	}
	// }

	render(): ReactNode {
		const { productResponse } = this.props
		const { data, isLoading, error, isError } = productResponse
		return (
			<Product
				isError={isError}
				isLoading={isLoading}
				productData={data}
				errorMessage={error && "Problem to load products"}
			/>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState, { productId }: OwnProps) => ({
	productResponse: getProduct.select(productId)(state),
	selectedCategory: state.shop.category,
})

const mapDispatch = {
	fetchProduct: getProduct.initiate,
	setSelectedCategory: setCategory,
}

const connector = connect(mapState, mapDispatch)

export default connector(ProductContainer)
