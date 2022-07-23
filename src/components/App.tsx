import { Component, ReactNode } from "react"
import { Route, Routes } from "react-router-dom"
import { CATEGORY_PARAM_KEY } from "../constants"
import Cart from "../pages/Cart"
import Category from "../pages/Category"
import Home from "../pages/Home"
import Product from "../pages/Product"
import { Layout } from "./Layout"

class App extends Component {
	render(): ReactNode {
		return (
			<Layout>
				<Routes>
					<Route path="/" element={<Category />} />
					<Route
						path={`/category/:${CATEGORY_PARAM_KEY}`}
						element={<Category />}
					/>
					<Route path="/product/:id" element={<Product />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</Layout>
		)
	}
}

export default App
