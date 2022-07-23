import { Component, createRef, ReactNode, RefObject } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components/macro"
import { RootState } from "../../../app/store"
import CurrencyDropdown from "./CurrencyDropdown"

const S = {
	Currency: styled.div`
		position: relative;
		.btn {
			cursor: pointer;
			display: flex;
			align-items: center;
			gap: 9px;
			border: none;
			background: transparent;
			.symbol {
				font-size: 18px;
				font-weight: 500;
			}
			.arrow {
				display: flex;
				width: 8px;
				height: 4px;
			}
		}
	`,
}

type Props = ConnectedProps<typeof connector>
type State = { isDropdown: boolean }

class Currency extends Component<Props, State> {
	dropdownRef: RefObject<HTMLDivElement>

	constructor(props: Props) {
		super(props)
		this.state = { isDropdown: false }
		this.dropdownRef = createRef<HTMLDivElement>()
	}

	toggleDropdown = (): void => {
		this.setState(state => ({ isDropdown: !state.isDropdown }))
	}

	closeDropdown = (): void => {
		this.setState({ isDropdown: false })
	}

	render(): ReactNode {
		const { isDropdown } = this.state
		const { selectedCurrency } = this.props
		return (
			<S.Currency ref={this.dropdownRef}>
				<button className="btn" type="button" onClick={this.toggleDropdown}>
					<span className="symbol" role="button">
						{selectedCurrency?.symbol}
					</span>
					<span
						className="arrow"
						style={{
							transform: isDropdown ? "rotateZ(0deg)" : "rotateZ(180deg)",
						}}>
						<svg
							viewBox="0 0 8 4"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1 3.5L4 0.5L7 3.5"
								stroke="black"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
				</button>
				{isDropdown && (
					<CurrencyDropdown
						closeDropdown={this.closeDropdown}
						dropdownRef={this.dropdownRef}
					/>
				)}
			</S.Currency>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	selectedCurrency: state.shop.currency,
})

const connector = connect(mapState)

export default connector(Currency)
