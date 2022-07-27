import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import Container from "../../styles/Container"
import Cart from "./Cart/Cart"
import Currency from "./Currency/Currency"
import { Menu } from "./Menu"
import NavigationLogo from "./NavigationLogo"

const S = {
	NavBar: styled.header`
		padding: 20px 0 5px;
		display: flex;
		place-items: center;
		position: sticky;
		top: 0;
		width: 100%;
		background-color: #fff;
		z-index: 10;
		.navbar__wrapper {
			display: flex;
			justify-content: space-between;
			.navbar__action {
				display: flex;
				align-items: center;
				gap: 10px;
				height: 40px;
			}
		}
	`,
}

class NavBar extends Component {
	render(): ReactNode {
		return (
			<S.NavBar>
				<Container className="navbar__wrapper">
					<Menu />
					<NavigationLogo />
					<div className="navbar__action">
						<Currency />
						<Cart />
					</div>
				</Container>
			</S.NavBar>
		)
	}
}

export default NavBar
