import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import CartIcon from "../../ui/icons/CartIcon"

const S = {
	NavCartButton: styled.button`
		background-color: transparent;
		border-radius: 50%;
		cursor: pointer;
		border: none;
		width: 40px;
		height: 40px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.3s ease-in;
		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
		.badge {
			position: absolute;
			top: 0;
			right: -3px;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background-color: #1d1f22;
			color: #fff;
			font-size: 14px;
			font-family: ${p => p.theme.fonts.roboto};
			font-weight: 700;
			text-align: center;
			line-height: 1.44;
		}
		svg {
			width: 20px;
			height: 20px;
		}
	`,
}

type Props = {
	toggleShowModal: () => void
	cartProductsCount: number
}

class NavCartButton extends Component<Props> {
	render(): ReactNode {
		const { cartProductsCount, toggleShowModal } = this.props

		return (
			<S.NavCartButton onClick={toggleShowModal}>
				<CartIcon color="#43464E" />
				{cartProductsCount > 0 && (
					<span className="badge">{cartProductsCount}</span>
				)}
			</S.NavCartButton>
		)
	}
}

export default NavCartButton
