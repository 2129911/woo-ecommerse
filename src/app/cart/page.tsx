"use client";
import { useEffect, useState } from "react";
import { GET_CART, UPDATE_CART_ITEM, REMOVE_ITEM_FROM_CART } from "../../lib/route";
import axios from "axios";
import { getSession } from "../session/session";
import Link from "next/link";
import { BeatLoader } from 'react-spinners';
import { useParams } from 'next/navigation'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [callgetCart, setcallgetCart] = useState(false);

  const endpoint: any = process.env.NEXT_PUBLIC_END_POINT;
  // ---------------------fetch-cart---------------------------------
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


  // ---------------------fetch-cart-end--------------------------------

  // ---------------------update the cart--------------------------------
  const updateQuantity = async (key: any, quantity: any) => {
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
      query: UPDATE_CART_ITEM,
      variables: {
        input: {
          items: [
            {
              key: key,
              quantity: quantity,
            },
          ],
        },
      },
    };

    try {
      const res = await axios({
        url: endpoint,
        method: "post",
        headers: headers,
        data: graphqlQuery,
      });

      console.log("Quantity updated:", res.data);
      setcallgetCart(prev => !prev);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };
  // ---------------------udpate-end--------------------------------

  // ---------------------delete------------------------------------

  const deleteItem = async (key: any) => {
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
      query: REMOVE_ITEM_FROM_CART,
      variables: {
        input: {
          keys: [key],
        },
      },
    };

    try {
      const res = await axios({
        url: endpoint,
        method: "post",
        headers: headers,
        data: graphqlQuery,
      });

      console.log("Item deleted:", res.data);
      setcallgetCart(prev => !prev);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  // ---------------------delete-end--------------------------------

  useEffect(() => {
    fetchCartData();
  }, [callgetCart]);

  return (
    <>
      <h1 className="text-5xl font-sans text-center my-2">Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center"><BeatLoader
          color="#0492ff"
          size={30}
        /></p>
      ) : (
        cartItems.map((item: any, index) => (
          <div key={index} className="bg-white items-center shadow-lg flex m-5 p-4 rounded-2xl">
            <img src={item.image} alt={item.name} className="w-1/5 rounded-2xl h-48 mb-2" />
            <div className="ml-5">
              <h2 className="text-3xl font-semibold">{item.name}</h2>

              <div className="flex items-center my-3">
                <button
                  onClick={() => updateQuantity(item.key, item.orderQty - 1)}
                  className="bg-red-500 text-white px-3 py-1 rounded-xl text-2xl mr-3"
                  disabled={item.orderQty <= 1}
                >
                  -
                </button>
                <span className="text-2xl">{item.orderQty}</span>
                <button
                  onClick={() => updateQuantity(item.key, item.orderQty + 1)}
                  className="bg-green-500 text-white px-3 py-1 rounded-xl text-2xl ml-3"
                >
                  +
                </button>
              </div>

              <p className="text-2xl font-semibold">Total: {item.total}</p>

              <button
                onClick={() => deleteItem(item.key)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg mt-3"
              >
                Delete Item
              </button>
            </div>
          </div>
        ))
      )}
      <div className="w-full text-center">
        <Link href={'/form'} >
          <button className="bg-black text-white p-4 rounded-3xl m-auto text-center">Proceed To Checkout</button>
        </Link>
      </div>
    </>
  );
}
