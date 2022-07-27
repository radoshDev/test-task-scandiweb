import { Component, ReactNode } from "react"
import { ORDER_PARAM_KEY } from "../constants"
import { RouterProps, withRouter } from "../hoc/withRouter"

type Props = RouterProps

class OrderPage extends Component<Props> {
	render(): ReactNode {
		const { params } = this.props
		return (
			<div>
				<h2>Your order #{params[ORDER_PARAM_KEY]}</h2>
			</div>
		)
	}
}

export default withRouter(OrderPage)
