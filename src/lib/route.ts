
export function getGraphQl() {
  return {
    query: `
      query queryAllPost {
        products (first:100){
          nodes {
            id
            name
            description
            slug
            image {
              sourceUrl
              altText
              title
            }
          }
        }
      }
    `
  };
}



export function addToCart(productId: string, quantity: number) {
  return {
    query: `
     mutation {
   addToCart(input: {productId: ${productId}, quantity: ${quantity}}) {
    cartItem {
      product {
        node {
          name
          title
        }
      }
    }
  }
 }
    `
  };
}
export function deleteCartItem(key: string) {
  return {
    query: `
      mutation DeleteCartItem {
        removeItemsFromCart(input: {
          keys: "${key}"
        }) 
          {
          cart {
            contents {
              nodes {
                key
                quantity
                product {
                  node {
                  image{
                  sourceUrl
                  }
                    name
                  }
                }
              }
            }
          }
        }
      }
    `
  };
}


export function getCart() {
  return {
    query: `
query GetCart {
  cart {
    contents {
      nodes {
        key
        quantity
        product {
          node {
            name
            databaseId
            image {
              id
              sourceUrl
            }
          }
        }
           total
      }
    }
  }
}
    `
  };
}

export function quanitityUpdate(key: any, quantity: any) {
  return {
    query: `
    mutation quantityUpdate {
  updateProduct(input: {id: "", visibleProducts: {}}) {
    clientMutationId
  }
  updateItemQuantities(input: {items: {key: "${key}", quantity: ${quantity}}}) {
    clientMutationId
    cart {
      total
    }
  }
}
    `
  };
}


// export async function getData(payload: { query: string }) {
//   const response:any = await fetch("http://localhost/wordpress-headless/wp-app/graphql1", {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//     credentials: 'include', 
//   });

//   return await response.json();
// }


export async function getData(payload: { query: string }) {
  console.log("Sending query:", payload);
  
  const response = await fetch("https://20c7-38-183-9-122.ngrok-free.app/wordpress-headless/wp-app/graphql1", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  console.log("Response received:", data);
  return data;
}
