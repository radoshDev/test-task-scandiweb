import { Component, ReactElement, ReactNode } from "react"
import Container from "../../styles/Container"
import GlobalStyles from "../../styles/GlobalStyles"
import Navigation from "../Navigation/Navigation"

type Props = {
	children: ReactElement
}

class Layout extends Component<Props> {
	render(): ReactNode {
		const { children } = this.props
		return (
			<>
				<GlobalStyles />
				<header>
					<Navigation />
				</header>
				<main>
					<Container>{children}</Container>
				</main>
			</>
		)
	}
}

export default Layout
