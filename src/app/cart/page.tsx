"use client";
import { useEffect, useState } from "react";
import { getCart, getData } from "../api/graphQl/route";
// import NextCors from 'nextjs-cors';

// import NextCors from 'nextjs-cors';

// import { cartItems } from "../api/graphQl/route";

export default function HomePage() {
  
  const [data, setData] = useState<any[]>([]);

  const loadProducts = async () => {
    try {
      const query = getCart();
      const result = await getData(query);
      const products = result || [];
      console.log(products)

      setData(products);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
 
  return (
    <>
    <h1>Cart</h1>
    </>
  );
}
