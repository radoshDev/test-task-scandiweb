import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import Container from "../../styles/Container"
import CartContainer from "./Cart/CartContainer"
import Currency from "./Currency/Currency"
import { Menu } from "./Menu"
import NavigationLogo from "./NavigationLogo"

const S = {
	NavBar: styled.nav`
		padding-top: 20px;
		display: flex;
		place-items: center;
		position: relative;
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
						<CartContainer />
					</div>
				</Container>
			</S.NavBar>
		)
	}
}

export default NavBar
