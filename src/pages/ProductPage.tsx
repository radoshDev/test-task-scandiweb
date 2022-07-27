import { Component, ReactNode } from "react"
import ProductContainer from "../components/Product/ProductContainer"
import { PRODUCT_PARAM_KEY } from "../constants"
import { RouterProps, withRouter } from "../hoc/withRouter"

type Props = RouterProps

class ProductPage extends Component<Props> {
	render(): ReactNode {
		const { params } = this.props
		const productId = params[PRODUCT_PARAM_KEY]
		return productId && <ProductContainer productId={productId} />
	}
}

export default withRouter(ProductPage)
