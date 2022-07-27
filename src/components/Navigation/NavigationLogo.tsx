import { Component, ReactNode } from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"

class NavigationLogo extends Component {
	render(): ReactNode {
		return (
			<Link to="/">
				<img src={logo} alt="brand logo" width={31} height={30} />
			</Link>
		)
	}
}

export default NavigationLogo
