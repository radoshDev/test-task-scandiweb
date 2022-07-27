import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import { Product as IProduct } from "../../types/product"
import ProductInfo from "./ProductInfo"
import ProductImages from "./ProductImages"
import Preloader from "../ui/Preloader"
import ErrorAlert from "../ui/ErrorAlert"

const S = {
	Product: styled.div`
		display: flex;
		padding: 80px 0;
	`,
}

type Props = {
	productData: IProduct | undefined
	isLoading: boolean
	isError: boolean
	errorMessage?: string
}

class Product extends Component<Props> {
	render(): ReactNode {
		const { isError, isLoading, productData, errorMessage } = this.props
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
				{isError && errorMessage && <ErrorAlert message={errorMessage} />}
			</>
		)
	}
}

export default Product
