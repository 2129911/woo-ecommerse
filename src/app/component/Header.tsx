"use client";
import Link from 'next/link';
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { GET_CART } from "../../lib/route";
import { getSession } from "../session/session";
import { p } from 'framer-motion/client';

const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems,"cartItem")
  const endpoint = process.env.NEXT_PUBLIC_END_POINT;

 const fetchCartData = async () => {
  const storedSession = getSession();
  if (!storedSession) {
    console.log("No session found");
    return;
  }

  const headers = {
    "content-type": "application/json",
    "woocommerce-session": `Session ${storedSession}`,
  };

  const graphqlQuery = {
    query: GET_CART,
  };

  try {
    const res = await axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    });

    console.log(res?.data, "GraphQL Response");

    const getCart = res?.data?.data?.cart;

    const nodes = getCart?.contents?.nodes || []; 

    const items = nodes.map((item: any) => ({
      databaseId: item.product?.node?.databaseId,
      orderQty: item.quantity,
      key: item.key,
      name: item.product?.node?.name,
      total: item.total,
      image: item.product?.node?.image?.sourceUrl,
    }));

    setCartItems(items);
  } catch (err) {
    console.error("Error fetching cart:", err);
  }
};

  useEffect(() => {
    fetchCartData();

  }, []);
  return (
    <>
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600" id="myText">MyLogo</div>

          <nav className="space-x-4 flex items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/product" className="text-gray-700 hover:text-blue-600">Product</Link>

    
            <div className="relative group w-fit inline-block">
              <Link href="/cart" className="text-gray-700 hover:text-blue-600 relative">
                Cart <span className='bg-black rounded-full p-1 px-2 text-[10px] text-white absolute r-0 -top-2.5'>{cartItems.length}</span>
              </Link>

       
              <div className="absolute hidden group-hover:block bg-white w-64 p-4 shadow rounded right-0 z-10">
                {cartItems.length === 0 ? (
                  <p>..Loading</p>
                ) : (
                  <>
                  
                  {cartItems.slice(0, 3).map((item: any) => (
                       <div key={item.id} className="mb-4 border-b pb-2">
                         <img
                           src={item?.image}
                           alt={item?.image?.altText}
                           className="w-full h-20 object-cover mb-2"
                         />
                         <h2 className="font-semibold">{item.name}</h2>
                       </div>
                     ))}
                    {cartItems.length > 3 && (
                       <div className="text-center mt-2">
                         <Link href="/cart" className="text-blue-600 font-semibold hover:underline">
                           View Cart
                         </Link>
                       </div>
                     )}
                    
                    </>
                  )}
              
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>

  );
}

export default Header;
{/* //  {cartItems.length === 0 ? ( */}
                   {/* <p>No items in cart</p>
                 ) : (
                   <>
                     {cartItems.slice(0, 3).map((item: any) => (
                       <div key={item.id} className="mb-4 border-b pb-2">
                         <img
                           src={item?.image}
                           alt={item?.image?.altText}
                           className="w-full h-20 object-cover mb-2"
                         />
                         <h2 className="font-semibold">{item.name}</h2>
                       </div>
                     ))
                     {cartItems.length > 3 && (
                       <div className="text-center mt-2">
                         <Link href="/cart" className="text-blue-600 font-semibold hover:underline">
                           View Cart
                         </Link>
                       </div>
                     )}
                   </>              // )} */}