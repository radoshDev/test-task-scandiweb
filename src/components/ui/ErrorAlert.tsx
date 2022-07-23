import { Component, ReactNode } from "react"

type Props = {
	message: string
}

class ErrorAlert extends Component<Props> {
	render(): ReactNode {
		const { message } = this.props
		return <div style={{ color: "red" }}>{message}</div>
	}
}

export default ErrorAlert
