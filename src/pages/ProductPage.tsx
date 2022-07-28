import { Component, ReactNode } from "react"
import { Product } from "../components/Product"
import { PRODUCT_PARAM_KEY } from "../constants"
import { RouterProps, withRouter } from "../hoc/withRouter"

type Props = RouterProps

class ProductPage extends Component<Props> {
	render(): ReactNode {
		const { params } = this.props
		const productId = params[PRODUCT_PARAM_KEY]
		return productId && <Product productId={productId} />
	}
}

export default withRouter(ProductPage)
