import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import Attribute from "../Attribute/Attribute"
import Button from "../ui/Button"
import productTest from "../../assets/product-d.png"

type Props = Record<string, unknown>
type State = { selectAttr: string }

const S = {
	CartItem: styled.div`
		display: flex;
	`,
	ProductInfo: styled.div`
		flex: 1 1;
		.product_name {
			font-weight: 300;
			line-height: 1.6;
			margin-bottom: 5px;
		}
		.price {
			font-weight: 500;
			line-height: 1.6;
			margin-bottom: 8px;
		}
	`,

	QtyAction: styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.qty {
			font-weight: 500;
		}
	`,
	ProductImage: styled.div`
		display: flex;
	`,
}

class CartItem extends Component<Props, State> {
	render(): ReactNode {
		return (
			<S.CartItem className="cart_item">
				<S.ProductInfo className="product_info">
					<div className="product_name">Apollo Running Short</div>
					<div className="price">$50.00</div>
					<div className="product_attributes">
						<Attribute name="Size" values={["XS", "S", "M", "L"]} />
						<Attribute
							name="Color"
							values={[
								{ att_value: "red", color: "red" },
								{ att_value: "black", color: "black" },
								{ att_value: "green", color: "green" },
							]}
						/>
					</div>
				</S.ProductInfo>
				<S.QtyAction className="qty_action">
					<Button variant="outline" className="btn">
						<svg
							viewBox="0 0 10 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<line
								x1="1"
								x2="9"
								y1="5"
								y2="5"
								strokeWidth="1"
								stroke="#1D1F22"
								strokeLinecap="round"
							/>
							<line
								x1="5"
								x2="5"
								y1="1"
								y2="9"
								strokeWidth="1"
								stroke="#1D1F22"
								strokeLinecap="round"
							/>
						</svg>
					</Button>
					<span className="qty">1</span>
					<Button variant="outline" className="btn">
						<svg
							viewBox="0 0 10 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<line
								x1="1"
								x2="9"
								y1="5"
								y2="5"
								strokeWidth="1"
								stroke="#1D1F22"
								strokeLinecap="round"
							/>
						</svg>
					</Button>
				</S.QtyAction>
				<S.ProductImage className="product-image">
					<img src={productTest} alt="product d" width={121} height={190} />
				</S.ProductImage>
			</S.CartItem>
		)
	}
}

export default CartItem
