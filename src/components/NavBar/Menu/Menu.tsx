import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components/macro"
import { getNavigationData } from "../../../api"
import { setCurrency } from "../../../app/slices/shopSlice"
import { RootState } from "../../../types/storeTypes"
import ErrorAlert from "../../ui/ErrorAlert"
import Preloader from "../../ui/Preloader"
import MenuItem from "./MenuItem"

const S = {
	MenuWrapper: styled.nav`
		align-self: flex-end;
		.menu {
			display: flex;
			font-size: 16px;
			font-weight: 600;
			font-family: ${p => p.theme.fonts.raleway};
			text-transform: uppercase;
			line-height: 1.2;
		}
	`,
}

type Props = ConnectedProps<typeof connector>

class Menu extends Component<Props> {
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
		const { data, isLoading, isError } = navigationDataResponse

		return (
			<S.MenuWrapper>
				{data && (
					<ul className="menu">
						{data.categories.map(category => (
							<MenuItem category={category} key={category.name} />
						))}
					</ul>
				)}
				{isLoading && <Preloader />}
				{isError && <ErrorAlert message="Problem to load categories" />}
			</S.MenuWrapper>
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

export default connector(Menu)
