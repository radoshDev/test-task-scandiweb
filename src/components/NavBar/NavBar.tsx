import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import Container from "../../styles/Container"
import { Currency } from "./Currency"
import { Menu } from "./Menu"
import { NavCart } from "./NavCart"
import NavigationLogo from "./NavLogo"

const S = {
	NavBar: styled.header`
		padding-top: 23px;
		display: flex;
		place-items: center;
		position: sticky;
		top: 0;
		width: 100%;
		background-color: #fff;
		z-index: 15;
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
						<NavCart />
					</div>
				</Container>
			</S.NavBar>
		)
	}
}

export default NavBar
