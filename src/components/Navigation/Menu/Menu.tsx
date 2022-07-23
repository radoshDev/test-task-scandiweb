import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import { nanoid } from "nanoid"
import { Category } from "../../../types/category"
import MenuItem from "./MenuItem"
import Preloader from "../../ui/Preloader"
import ErrorAlert from "../../ui/ErrorAlert"

const S = {
	MenuWrapper: styled.div`
		align-self: flex-end;
		.menu {
			display: flex;
			font-size: 16px;
			font-weight: 600;
			font-family: ${p => p.theme.fonts.raleway};
			text-transform: uppercase;
			line-height: 1.2;
		}
	`,
}

type Props = {
	categories: Category[] | undefined
	isLoading: boolean
	isError: boolean
	errorMessage?: string
}

class Menu extends Component<Props> {
	render(): ReactNode {
		const { categories, isLoading, isError, errorMessage } = this.props
		return (
			<S.MenuWrapper>
				{categories && (
					<ul className="menu">
						{categories?.map(category => (
							<MenuItem category={category} key={nanoid(4)} />
						))}
					</ul>
				)}
				{isLoading && <Preloader />}
				{isError && errorMessage && <ErrorAlert message={errorMessage} />}
			</S.MenuWrapper>
		)
	}
}

export default Menu
