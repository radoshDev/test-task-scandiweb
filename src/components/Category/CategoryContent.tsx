import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import { Category } from "../../types/category"
import ErrorAlert from "../ui/ErrorAlert"
import Preloader from "../ui/Preloader"
import CategoryProduct from "./CategoryProduct"

const S = {
	CategoryContent: styled.div`
		.category_title {
			font-size: 42px;
			line-height: 1.6;
			text-transform: capitalize;
			margin: 80px 0 103px;
		}
		.products {
			display: flex;
			justify-content: center;
			gap: 103px 40px;
			flex-wrap: wrap;
		}
	`,
}

type Props = {
	categoryData: Category | undefined
	isLoading: boolean
	isError: boolean
	errorMessage?: string
}

class CategoryContent extends Component<Props> {
	render(): ReactNode {
		const { categoryData, isLoading, isError, errorMessage } = this.props
		return (
			<S.CategoryContent>
				{categoryData && (
					<>
						<h1 className="category_title">{categoryData.name}</h1>
						<div className="products">
							{categoryData.products?.map(product => (
								<CategoryProduct product={product} key={product.id} />
							))}
						</div>
					</>
				)}
				{isLoading && <Preloader />}
				{isError && errorMessage && <ErrorAlert message={errorMessage} />}
			</S.CategoryContent>
		)
	}
}

export default CategoryContent
