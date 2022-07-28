import React from "react"
import { Category } from "../components/Category"
import { CATEGORY_PARAM_KEY } from "../constants"
import { RouterProps, withRouter } from "../hoc/withRouter"

type Props = RouterProps

class CategoryPage extends React.Component<Props> {
	render(): React.ReactNode {
		const { params } = this.props
		return <Category categoryName={params[CATEGORY_PARAM_KEY]} />
	}
}

export default withRouter(CategoryPage)
