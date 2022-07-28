import { Component, MouseEvent, ReactNode, RefObject } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components"
import { getNavigationData } from "../../../api"
import { setCurrency } from "../../../app/slices/shopSlice"
import { RootState } from "../../../types/storeTypes"
import { Currency } from "../../../types/navigationData"

const S = {
	CurrencyDropdown: styled.ul`
		position: absolute;
		top: 30px;
		left: -20px;
		width: 114px;
		box-shadow: 0 4px 35px rgb(168 172 176 / 19%);
		font-size: 18px;
		font-weight: 500;
		line-height: 1.6;
		padding: 20px 0;
		.dropdown_item {
			padding: 8px 20px;
			transition: background-color 0.3s ease;
			cursor: pointer;
			user-select: none;
			&.active {
				background-color: #ddd;
				&:hover {
					background-color: #ddd;
				}
			}
			&:hover {
				background-color: #eee;
			}
		}
	`,
}

type Props = {
	closeDropdown: () => void
	dropdownRef: RefObject<HTMLDivElement>
} & ConnectedProps<typeof connector>

class CurrencyDropdown extends Component<Props> {
	componentDidMount(): void {
		document.addEventListener("click", this.handleClickOutside)
	}

	componentWillUnmount(): void {
		document.removeEventListener("click", this.handleClickOutside)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleClickOutside = (event: any): void => {
		const { dropdownRef, closeDropdown } = this.props
		const dropdown = dropdownRef.current
		if (
			dropdown &&
			!dropdown.contains(event.target) &&
			dropdown.parentElement !== event.target
		) {
			closeDropdown()
		}
	}

	handleSelectCurrency = (
		e: MouseEvent<HTMLElement>,
		newCurrency: Currency
	): void => {
		e.stopPropagation()
		const { closeDropdown, dispatchCurrency } = this.props
		dispatchCurrency(newCurrency)
		closeDropdown()
	}

	render(): ReactNode {
		const { selectedCurrency, currencies } = this.props
		if (!currencies) return null
		return (
			<S.CurrencyDropdown>
				{currencies.map(currency => (
					<li
						className={`dropdown_item ${
							currency.label === selectedCurrency?.label ? "active" : ""
						}`}
						role="menuitem"
						onClick={e => this.handleSelectCurrency(e, currency)}
						key={currency.label}>
						{currency.symbol} {currency.label}
					</li>
				))}
			</S.CurrencyDropdown>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	selectedCurrency: state.shop.currency,
	currencies: getNavigationData.select()(state).data?.currencies,
})

const mapDispatch = {
	dispatchCurrency: setCurrency,
}

const connector = connect(mapState, mapDispatch)

export default connector(CurrencyDropdown)
