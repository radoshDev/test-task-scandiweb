import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import { Category } from "../../types/category"
import Button from "../ui/Button"
import ErrorAlert from "../ui/ErrorAlert"
import Preloader from "../ui/Preloader"
import CategoryProduct from "./CategoryProduct"

const S = {
	CategoryContent: styled.div`
		padding: 80px 0;
		.category_title {
			font-size: 42px;
			line-height: 1.6;
			text-transform: capitalize;
			margin-bottom: 103px;
		}
		.products {
			display: flex;
			justify-content: center;
			gap: 103px 40px;
			flex-wrap: wrap;
		}
		.btn_more {
			width: 140px;
			height: 43px;
			margin: 30px auto 0;
			display: block;
		}
	`,
}

type Props = {
	categoryData: Category | undefined
	isLoading: boolean
	isError: boolean
	errorMessage?: string
	productPerPage: number
}

type State = {
	page: number
}

class CategoryContent extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { page: 1 }
	}

	handleNextPage = (): void => {
		this.setState(state => ({ page: state.page + 1 }))
	}

	render(): ReactNode {
		const { categoryData, isLoading, isError, errorMessage, productPerPage } =
			this.props
		const { page } = this.state
		const productsToShowAmount = productPerPage * page

		return (
			<S.CategoryContent>
				{categoryData && (
					<>
						<h1 className="category_title">{categoryData.name}</h1>
						<div className="products">
							{categoryData.products
								?.slice(0, productsToShowAmount)
								.map(product => (
									<CategoryProduct product={product} key={product.id} />
								))}
						</div>
						{categoryData.products.length > productsToShowAmount && (
							<Button
								variant="contained"
								className="btn_more"
								onClick={this.handleNextPage}>
								Show more
							</Button>
						)}
					</>
				)}
				{isLoading && <Preloader />}
				{isError && errorMessage && <ErrorAlert message={errorMessage} />}
			</S.CategoryContent>
		)
	}
}

export default CategoryContent
