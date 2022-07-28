import { Component, ReactElement, ReactNode } from "react"
import Container from "../../styles/Container"
import GlobalStyles from "../../styles/GlobalStyles"
import { NavBar } from "../NavBar"

type Props = {
	children: ReactElement
}

class Layout extends Component<Props> {
	render(): ReactNode {
		const { children } = this.props
		return (
			<>
				<GlobalStyles />
				<NavBar />
				<main>
					<Container>{children}</Container>
				</main>
			</>
		)
	}
}

export default Layout
