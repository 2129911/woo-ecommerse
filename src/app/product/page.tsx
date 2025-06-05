"use client";
import { useEffect, useState } from "react";
import { getGraphQl, getData  } from "../api/graphQl/route";
import { addToCart } from "../api/graphQl/route";
// import { cartItem } from "../api/graphQl/route";

export default function HomePage() {
  const [data, setData] = useState<any[]>([]);

  const loadProducts = async () => {
    try {
      const query = getGraphQl();
      const result = await getData(query);
      const products = result?.data?.products?.nodes || [];
      setData(products);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
 

const addData = async (product: any) => {
  const rawId = product?.databaseId || product?.id;
  const id = atob(rawId);
  let postId = id.split(":")[1];

  const productId = postId;
  const quantity = 1;

  try {
    const mutation = addToCart(productId, quantity);

    const result = await getData(mutation);
    console.log("Add to cart result:", result);

    const cart = await getData(mutation);
    console.log("Updated cart:", cart);

    const cartItems = result?.data?.addToCart?.cartItem?.product?.node;
    console.log("Cart updated:", cartItems);

    console.log(`${productId} added to cart!`);
  } catch (err) {
    console.error("Failed to add to cart:", err);
  }
};




  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((product: any) => (
          <div key={product.id}  className="bg-white p-4 shadow rounded">
            <img
              src={product.image?.sourceUrl}
              alt={product.image?.altText}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">
              {product?.description?.replace(/(<([^>]+)>)/gi, "").slice(0, 200)}...
            </p>
            <p>{product.id}</p>
            <button
              onClick={() => addData(product)}
              className="m-auto my-3 text-center ml-24 cursor-pointer p-2 bg-blue-400 hover:bg-blue-600 text-white rounded-2xl w-1/2 border"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
