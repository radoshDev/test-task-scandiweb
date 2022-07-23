export const GET_NAVIGATION_DATA = `query getCategories{
	categories {
	 name
	}
	currencies{
    label
    symbol
	}	
}`

export const GET_ONE_CATEGORY = (name: string | undefined): string => {
	const input = name ? `(input:{title:"${name}"})` : ""
	return `query getCategory{
		category${input} {
		 name
		}
	 }`
}
