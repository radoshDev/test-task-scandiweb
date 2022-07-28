import { Component, ReactNode } from "react"
import styled from "styled-components"
import { Product } from "../../types/product"

const S = {
	ProductImages: styled.div`
		display: flex;
		flex-direction: row-reverse;
		.main_image {
			img {
				max-width: 100%;
				height: auto;
				/* object-fit: contain; */
			}
		}
		.thumbnails {
			display: flex;
			flex-direction: column;
			gap: 40px;
			margin-right: 40px;
			.thumbnail_img {
				display: flex;
				cursor: pointer;
				&.active {
					box-shadow: 0 0 0 1px white, 0 0 0 2px ${p => p.theme.main.color};
				}
				img {
					object-fit: cover;
				}
			}
		}
	`,
}

type Props = {
	gallery: Product["gallery"]
	productName: Product["name"]
}

type State = {
	imageIndex: number
}

class ProductImages extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { imageIndex: 0 }
	}

	setShowImage = (imageIndex: number): void => {
		this.setState({ imageIndex })
	}

	render(): ReactNode {
		const { gallery, productName } = this.props
		const { imageIndex } = this.state
		return (
			<S.ProductImages>
				<div className="main_image">
					<img
						src={gallery[imageIndex]}
						alt={productName}
						width={610}
						height={511}
					/>
				</div>
				<ul className="thumbnails" role="menu">
					{gallery.map((imgSource, index) => (
						<li
							className={`thumbnail_img ${
								imgSource === gallery[imageIndex] ? "active" : ""
							}`}
							role="menuitem"
							onClick={() => this.setShowImage(index)}
							key={imgSource}>
							<img src={imgSource} alt={productName} width={79} height={80} />
						</li>
					))}
				</ul>
			</S.ProductImages>
		)
	}
}

export default ProductImages
