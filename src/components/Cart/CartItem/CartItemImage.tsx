import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import { Product } from "../../../types/product"
import ArrowIcon from "../../ui/icons/ArrowIcon"

const S = {
	CartItemImage: styled.div`
		display: flex;
		flex-basis: 200px;
		position: relative;
		img {
			width: 100%;
			height: auto;
			object-fit: contain;
		}
	`,
	Buttons: styled.div`
		position: absolute;
		bottom: 16px;
		right: 8px;

		.arrow_btn {
			cursor: pointer;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			margin-right: 8px;
			width: 24px;
			height: 24px;
			background: rgba(0, 0, 0, 0.73);
			border: none;
			&:disabled {
				background: rgba(0, 0, 0, 0.3);
				cursor: default;
			}
			& > svg {
				width: 8px;
				height: 14px;
			}
		}
	`,
}

type Props = {
	gallery: Product["gallery"]
	productName: string
}

type State = {
	imageIndex: number
}

class CartItemImage extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { imageIndex: 0 }
	}

	handleChangeImage = (newIndex: number): void => {
		const { gallery } = this.props
		if (newIndex >= gallery.length || newIndex < 0) return
		this.setState({ imageIndex: newIndex })
	}

	render(): ReactNode {
		const { imageIndex } = this.state
		const { gallery, productName } = this.props
		return (
			<S.CartItemImage className="product_image">
				<img
					src={gallery[imageIndex]}
					alt={productName}
					width={121}
					height={190}
				/>
				{gallery.length > 1 && (
					<S.Buttons>
						<button
							type="button"
							className="arrow_btn"
							onClick={() => this.handleChangeImage(imageIndex - 1)}
							disabled={imageIndex === 0}>
							<ArrowIcon direction="left" />
						</button>
						<button
							type="button"
							className="arrow_btn"
							onClick={() => this.handleChangeImage(imageIndex + 1)}
							disabled={imageIndex === gallery.length - 1}>
							<ArrowIcon direction="right" />
						</button>
					</S.Buttons>
				)}
			</S.CartItemImage>
		)
	}
}

export default CartItemImage
