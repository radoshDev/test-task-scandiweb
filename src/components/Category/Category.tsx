import { Component, ReactNode, memo } from "react"
import { connect, ConnectedProps } from "react-redux"
import { getCategory } from "../../api"
import { setCategory } from "../../app/slices/shopSlice"
import { RootState } from "../../types/storeTypes"
import CategoryContent from "./CategoryContent"

type OwnProps = { categoryName: string | undefined }

type Props = OwnProps & ConnectedProps<typeof connector>

class Category extends Component<Props> {
	async componentDidMount(): Promise<void> {
		const { fetchCategory, categoryName, setSelectedCategory } = this.props
		const response = await fetchCategory(categoryName)
		if (response.data) {
			setSelectedCategory(categoryName || response.data.name)
		}
	}

	async componentDidUpdate(prevProps: Props): Promise<void> {
		const {
			categoryName,
			fetchCategory,
			setSelectedCategory,
			selectedCategory,
		} = this.props
		if (categoryName === prevProps.categoryName) return

		const { data } = await fetchCategory(categoryName)
		if (data && data.name !== selectedCategory) {
			setSelectedCategory(data.name)
		}
	}

	componentWillUnmount(): void {
		const { setSelectedCategory } = this.props
		setSelectedCategory("")
	}

	render(): ReactNode {
		const { categoryResponse, productPerPage } = this.props
		const { data, isLoading, isError, error } = categoryResponse

		return (
			<CategoryContent
				categoryData={data}
				productPerPage={productPerPage}
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
	productPerPage: state.shop.productPerPage,
})

const mapDispatch = {
	fetchCategory: getCategory.initiate,
	setSelectedCategory: setCategory,
}

const connector = connect(mapState, mapDispatch)

export default memo(connector(Category))
