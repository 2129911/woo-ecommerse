
export function getGraphQl() {
  return {
    query: `
      query queryAllPost {
        products{
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


// export function getDataCart(productId:any, quantity: any) {
//   return {
//     query: `
//       mutation AddToCart {
//         addToCart(input: {productId: ${productId}, quantity: ${quantity}}) {
//           cart {
//             contents {
//               itemCount
//               nodes {
//                 key
//                 quantity
//                 total
//               }
//             }
//             total
//           }
//         }
//       }
//     `
//   };
// }

// export function getDataCart(productId: any, quantity: any) {
//   return {
//     query: `
//       mutation AddToCart {
//         addToCart(input: {productId: ${productId}, quantity: ${quantity}}) {
//           cart {
//             contents {
//               itemCount
//               nodes {
//                 key
//                 quantity
//                 total
//               }
//             }
//             total
//           }
//         }
//       }
//     `
//   };
// }

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
      }
    }
  }
}
    `
  };
}







// mutation addToCart {
//   addCartItems(input: {items: {productId: 87}}) {
//     cart {
//       total
//       subtotal
//     }
//   }
// }


// export function getDataCart(productId:any, quantity:any) {
//   return {
//     query: `
//       mutation AddToCart {
//         addToCart(input: {productId: ${productId}, quantity: ${quantity}}) {
//           cart {
//             contents {
//               itemCount
//               nodes {
//                 key
//                 quantity
//                 total
//               }
//             }
//             total
//           }
//         }
//       }
//     `
//   };
// }



// export const fetchData = async (query: any, variables: any): Promise<any> => {
//   const res = await fetch("http://localhost/wordpress-headless/wp-app/graphql", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     // credentials: "include",
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   return res.json();
// };

export async function getData(payload: { query: string }) {

  
  const response = await fetch("http://localhost/wordpress-headless/wp-app/graphql1", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
mode:"cors",
    body: JSON.stringify(payload),
    credentials: 'include'
  });

  return await response.json();
}


// function (params:type) {
  
// }

// export async function getData(payload: { query: any }) {
//   let sessionToken = typeof window !== "undefined" ? localStorage.getItem("wc_session") : null;
//   const response = await fetch("http://localhost/wordpress-headless/wp-app/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(sessionToken && { "woocommerce-session": `Session ${sessionToken}` }),
//     },

//     body: JSON.stringify(payload),
//   });

//   const newSession = response.headers.get("woocommerce-session");
//   if (newSession && newSession !== sessionToken) {
//     localStorage.setItem("wc_session", newSession);
//     sessionToken = newSession;
//   }

//   return await response.json();
// }


