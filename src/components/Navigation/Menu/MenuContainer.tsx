import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import { getNavigationData } from "../../../api"
import { setCurrency } from "../../../app/slices/shopSlice"
import { RootState } from "../../../types/storeTypes"
import Menu from "./Menu"

type Props = ConnectedProps<typeof connector>

class MenuContainer extends Component<Props> {
	async componentDidMount(): Promise<void> {
		const { fetchNavigationData, dispatchCurrency, selectedCurrency } =
			this.props
		const response = await fetchNavigationData()

		if (response.data && !selectedCurrency) {
			const { currencies } = response.data
			dispatchCurrency(currencies[0])
		}
	}

	render(): ReactNode {
		const { navigationDataResponse } = this.props
		const { data, isLoading, isError, error } = navigationDataResponse

		return (
			<Menu
				categories={data?.categories}
				isError={isError}
				isLoading={isLoading}
				errorMessage={error && "Problem to load categories"}
			/>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	navigationDataResponse: getNavigationData.select()(state),
	selectedCurrency: state.shop.currency,
})

const mapDispatch = {
	fetchNavigationData: getNavigationData.initiate,
	dispatchCurrency: setCurrency,
}

const connector = connect(mapState, mapDispatch)

export default connector(MenuContainer)
