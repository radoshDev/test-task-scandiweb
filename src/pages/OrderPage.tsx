import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import { cleanCart } from "../app/slices/shopSlice"

type Props = ConnectedProps<typeof connector>

class OrderPage extends Component<Props> {
	componentDidMount(): void {
		const { dispatch } = this.props
		dispatch(cleanCart())
	}

	render(): ReactNode {
		return (
			<div>
				<h2>This must be an order page, but designer did not provide it.</h2>
			</div>
		)
	}
}

const connector = connect()

export default connector(OrderPage)
