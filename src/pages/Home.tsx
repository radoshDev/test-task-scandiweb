import React from "react"
import { withRouter, RouterProps } from "../hoc/withRouter"

type Props = RouterProps

class Home extends React.Component<Props> {
	render(): React.ReactNode {
		const { navigate } = this.props
		return (
			<div>
				<h1>Home Page</h1>;<p>{JSON.stringify(this.props)}</p>
				<button
					type="button"
					onClick={() => navigate("/category/tech", { replace: true })}>
					Go to Tech
				</button>
			</div>
		)
	}
}

export default withRouter(Home)
