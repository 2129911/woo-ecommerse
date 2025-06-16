"use client";

import React, { useEffect, useState } from "react";
import { requestWooGraphQL } from "../../lib/fetcher";
import { GET_PRODUCTS_QUERY, ADD_TO_CART } from "../../lib/route";
import axios from "axios";
 import { usePathname } from 'next/navigation';
import { getSession, storeSession } from "../session/session";
import { v4 as uuidv4 } from "uuid";
import { BeatLoader } from 'react-spinners';
export default function Page() {
  const endpoint: any = process.env.NEXT_PUBLIC_END_POINT;
  const [products, setProducts] = useState([]);
  let path = usePathname()
    console.log(path,"check__the__param")
  // --------------------fetch-data---------------------------
  const fetchProducts = async () => {
    try {
      const res = await requestWooGraphQL(GET_PRODUCTS_QUERY);
      const nodes = res?.data?.products?.nodes || [];
      console.log(nodes, "data__node");
      setProducts(nodes);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  // ---------------------fetch-end--------------------------------

  // ---------------------add to cart--------------------------------

  const addToCart = async (product: any) => {
    const storedSession = getSession();
    const uid = uuidv4();
    const rawId = product?.id;
    const id = atob(rawId);
    const postId = id.split(":")[1];

    const productId = parseInt(postId);

    const variables = {
      input: {
        clientMutationId: uid,
        productId: productId,
        quantity: 1,
      },
    };

    const headers: any = {
      "Content-Type": "application/json",
    };

    if (storedSession) {
      headers["woocommerce-session"] = `Session ${storedSession}`;
    }
    console.log("Stored Session:", storedSession);
    axios
      .post(
        endpoint,
        {
          query: ADD_TO_CART,
          variables: variables,
        },
        { headers }
      )
      .then((res) => {
        console.log(res, "check the res")
        const newSession = res?.headers?.["woocommerce-session"];

        if (!storedSession && newSession) {
          storeSession(newSession);
        }

        console.log("Cart updated:", res?.data);
        alert("Congratulations! Product Added to cart.");
      })
      .catch((err) => {
        console.error("Failed to add to cart:", err);
      });
  };
  // ---------------------add to cart-end--------------------------------

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p className="text-center m-auto"><BeatLoader
            color="#0492ff"
            size={30}
          /></p>
        ) : (products.map((product: any) => (
          <div key={product.id} className="bg-white p-4 shadow rounded">
            <img
              src={product.image?.sourceUrl}
              alt={product.image?.altText}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">
              {product?.description?.replace(/(<([^>]+)>)/gi, "").slice(0, 200)}...
            </p>
            <button
              onClick={() => addToCart(product)}
              className="m-auto my-3 text-center ml-24 cursor-pointer p-2 bg-blue-400 hover:bg-blue-600 text-white rounded-2xl w-1/2 border"
            >
              Add to Cart
            </button>
          </div>
        )))}
      </div>
    </div>
  );
}
