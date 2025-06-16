export const GET_PRODUCTS_QUERY = `
  query GET_PRODUCTS {
    products(first: 100) {
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


export const GET_CART =`
  query GET_CART {
    cart {
      contents {
        nodes {
          key
          product {
            node {
              id
              productId: databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              ... on SimpleProduct {
                id
                name
                salePrice
                productCategories {
                  edges {
                    node {
                      id
                      name
                      slug
                    }
                  }
                }
              }
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              galleryImages {
                nodes {
                  id
                  sourceUrl
                  srcSet
                  altText
                  title
                }
              }
            }
          }
          variation {
            node {
              id
              variationId: databaseId
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
            }
            attributes {
              id
              name
              value
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }
      appliedCoupons {
        code
        discountAmount
        discountTax
      }
      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
    }
  }
`;

const CHECKOUT_MUTATION =`
  mutation CHECKOUT_MUTATION($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        id
        orderKey
        orderNumber
        status
        metaData{
          id
          key
          value
        }
        refunds {
          nodes {
            amount
            metaData {
              id
              key
              value
            }
          }
        }
      }
      result
      redirect
      
    }
  }
`;


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
