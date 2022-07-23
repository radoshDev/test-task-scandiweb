import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import { RootState } from "../../../app/store"
import { Category } from "../../../types/category"

const S = {
	MenuItem: styled.li`
		padding: 4px 16px 32px;
		border-bottom: 2px solid transparent;
		&.active {
			color: ${p => p.theme.main.color};
			border-bottom: 2px solid ${p => p.theme.main.color};
		}
	`,
}

type Props = {
	category: Category
} & ConnectedProps<typeof connector>

class MenuItem extends Component<Props> {
	render(): ReactNode {
		const { category, selectedCategory } = this.props
		const isActive = category.name === selectedCategory

		return (
			<S.MenuItem className={isActive ? "active" : ""}>
				<Link to={`/category/${category.name}`} replace>
					{category.name}
				</Link>
			</S.MenuItem>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	selectedCategory: state.shop.category,
})

const connector = connect(mapState)

export default connector(MenuItem)
