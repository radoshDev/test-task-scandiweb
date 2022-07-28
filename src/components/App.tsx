import { Component, ReactNode } from "react"
import { Route, Routes } from "react-router-dom"
import { CATEGORY_PARAM_KEY, PRODUCT_PARAM_KEY } from "../constants"
import CartPage from "../pages/CartPage"
import CategoryPage from "../pages/CategoryPage"
import OrderPage from "../pages/OrderPage"
import ProductPage from "../pages/ProductPage"
import { Layout } from "./Layout"

class App extends Component {
	render(): ReactNode {
		return (
			<Layout>
				<Routes>
					<Route path="/" element={<CategoryPage />} />
					<Route
						path={`/category/:${CATEGORY_PARAM_KEY}`}
						element={<CategoryPage />}
					/>
					<Route
						path={`/product/:${PRODUCT_PARAM_KEY}`}
						element={<ProductPage />}
					/>
					<Route path="/cart" element={<CartPage />} />
					<Route path="/order" element={<OrderPage />} />
				</Routes>
			</Layout>
		)
	}
}

export default App
