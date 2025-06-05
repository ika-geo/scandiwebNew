export const GET_PRODUCT_BY_ID = `
  query GetProduct($product_id: String!) {
    product(product_id: $product_id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        items {
          displayValue
          value
          id
          __typename
        }
        name
        type
        __typename
      }
      prices {
        amount
        currency {
          label
          symbol
          __typename
        }
        __typename
      }
      brand
      __typename
    }
  }
`

export const GET_CATEGORIES = `
  query GetCategories {
    categories {
      id
      name
    }
  }
`

export const GET_PRODUCTS_BY_CATEGORY = `
query getProducts($category_id:Int!){
    productsByCategory(category_id:$category_id){
        id
        name
        gallery
        inStock
        prices{
            amount
            currency{
                symbol
            }
        }
      attributes {
        id
        items {
          displayValue
          value
          id
          __typename
        }
        name
        type
        __typename
      }
    }
}
`

