import { Component, ReactNode, memo } from "react"
import { connect, ConnectedProps } from "react-redux"
import { getCategory } from "../../api"
import { setCategory } from "../../app/slices/shopSlice"
import { RootState } from "../../types/storeTypes"
import CategoryContent from "./CategoryContent"

type OwnProps = { categoryName: string | undefined }

type Props = OwnProps & ConnectedProps<typeof connector>

class CategoryContainer extends Component<Props> {
	async componentDidMount(): Promise<void> {
		const { fetchCategory, categoryName, setSelectedCategory } = this.props
		const response = await fetchCategory(categoryName)
		if (response.data) {
			setSelectedCategory(categoryName || response.data.name)
		}
	}

	componentDidUpdate(prevProps: Props): void {
		const { categoryName, fetchCategory, setSelectedCategory } = this.props
		// const newCategoryName = categoryName || "all"

		if (
			categoryName !== prevProps.categoryName &&
			categoryName !== prevProps.selectedCategory
		) {
			console.log("new fetch")

			const { unsubscribe } = fetchCategory(categoryName)
			if (categoryName) {
				setSelectedCategory(categoryName)
			}
		}
	}

	render(): ReactNode {
		const { categoryResponse } = this.props
		const { data, isLoading, isError, error } = categoryResponse
		console.log("render")
		return (
			<CategoryContent
				categoryData={data}
				errorMessage={error && "Problem to load products"}
				isError={isError}
				isLoading={isLoading}
			/>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState, { categoryName }: OwnProps) => ({
	categoryResponse: getCategory.select(categoryName)(state),
	selectedCategory: state.shop.category,
})

const mapDispatch = {
	fetchCategory: getCategory.initiate,
	setSelectedCategory: setCategory,
}

const connector = connect(mapState, mapDispatch)

export default memo(connector(CategoryContainer))