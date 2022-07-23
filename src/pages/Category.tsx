import React from "react"
import CategoryContentContainer from "../components/CategoryContent/CategoryContentContainer"
import { CATEGORY_PARAM_KEY } from "../constants"
import { RouterProps, withRouter } from "../hoc/withRouter"

type Props = RouterProps

class Category extends React.Component<Props> {
	render(): React.ReactNode {
		const { params } = this.props
		return (
			<CategoryContentContainer categoryName={params[CATEGORY_PARAM_KEY]} />
		)
	}
}

export default withRouter(Category)
