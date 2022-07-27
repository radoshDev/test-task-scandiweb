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
		 products {
      id
      name
      inStock
      gallery
      brand
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      prices{
        amount
        currency{
          label
          symbol
        }
      }
    }
		}
	 }`
}

export const GET_ONE_PRODUCT = (productId: string): string => {
	return `query getProduct {
    product(id: "${productId}") {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      prices{
        amount
        currency{
          label
          symbol
        }
      }
      brand
    }
  }`
}
