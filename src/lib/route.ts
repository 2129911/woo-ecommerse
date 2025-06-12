export const GET_PRODUCTS_QUERY = `
  query GET_PRODUCTS {
    products(first: 10) {
      nodes {
        id
        name
        description
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_CART =`
query getCart {
  cart {
    contents {
      nodes {
        key
        quantity
        product {
          node {
            id
            name
            price
          }
        }
      }
    }
  }
}

`;
export const UPDATE_CART = `
mutation UPDATE_CART($input: UpdateCartInput!) {
  updateCart(input: $input) {
    cart {
      contents {
        nodes {
          key
          quantity
          product {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
}`;
export const ADD_TO_CART = `
mutation ADD_TO_CART($input: AddToCartInput!) {
  addToCart(input: $input) {
    cartItem {
      key
      product {
        node {
          id
          name
        }
      }
    }
  }
}`;





export const UPDATE_CART_ITEM = `
  mutation UpdateItemQuantities($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      cart {
        contents {
          nodes {
            key
            quantity
            product {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = `
  mutation RemoveItemsFromCart($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cart {
        contents {
          nodes {
            key
            quantity
            product {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;
