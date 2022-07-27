import "styled-components"

declare module "styled-components" {
	export interface DefaultTheme {
		main: {
			color: string
			textColor: string
			bgColor: string
			bgImageColor: string
		}
		fonts: {
			raleway: string
			roboto: string
			robotoCondensed: string
		}
	}
}
