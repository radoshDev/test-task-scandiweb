import React from "react"
import CategoryContainer from "../components/Category/CategoryContainer"
import { CATEGORY_PARAM_KEY } from "../constants"
import { RouterProps, withRouter } from "../hoc/withRouter"

type Props = RouterProps

class Category extends React.Component<Props> {
	render(): React.ReactNode {
		const { params } = this.props
		return <CategoryContainer categoryName={params[CATEGORY_PARAM_KEY]} />
	}
}

export default withRouter(Category)
