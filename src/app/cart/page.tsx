"use client";
import { useEffect, useState } from "react";
import { getCart, getData, deleteCartItem, quanitityUpdate } from "../../lib/route";

export default function CartPage() {
  const [data, setData] = useState<any[]>([]);

  const loadProducts = async () => {
    try {
      const query = getCart();
      const result = await getData(query);
      const maindata = result?.data?.cart?.contents?.nodes || [];

      // const enrichedData = maindata.map((item: any) => ({
      //   ...item,
      //   quantity: item.quantity || 1,
      // }));

      setData(maindata);
    } catch (err) {
      console.log("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    loadProducts();
    
  }, []);
  async function deleteData(key: string) {
    try {
      const query = deleteCartItem(key);
      const result = await getData(query);

      console.log("Deleted item result:", result);

      const updatedCart = result?.data?.removeItemsFromCart?.cart?.contents?.nodes || [];
      setData(updatedCart);
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  }


const increment = async (key: string, currentQty: number) => {
  const newQty = currentQty + 1;

  const query = quanitityUpdate(key, newQty);
  const result = await getData(query);
  console.log(result,"Quantity updated");
  const cartQuery = getCart(); 
  const cartResult = await getData(cartQuery);

  const fullItems = cartResult?.data?.cart?.contents?.nodes || [];
  setData(fullItems);
};



  const decrement = async (key: string, currentQty: any) => {
   const newQty = currentQty - 1;

    const query = quanitityUpdate(key, newQty);
    const result = await getData(query);
    console.log("Updated quantity:", result);
    const cartQuery = getCart(); 
const cartResult = await getData(cartQuery);

  const fullItems = cartResult?.data?.cart?.contents?.nodes || [];
  setData(fullItems);
  };

  return (
    <>
      <h1 className="text-5xl font-sans text-center my-2">Cart</h1>
      {data.map((item: any) => (
        <div
          key={item.key}
          className="bg-white items-center relative justify-between shadow-lg flex m-5 p-4 rounded-2xl"
        >
          <img
            src={item.product?.node?.image?.sourceUrl}
            alt={item.product?.node?.name || "Product"}
            className="w-1/5 rounded-2xl h-48 mb-2"
          />
          <div>
            <h2 className="text-3xl font-semibold">
              {item.product?.node?.name}
            </h2>
            <form className="max-w-xs mx-auto">
              <div className="relative justify-center flex items-center mt-2">
                <button
                  type="button"
                  onClick={() => decrement(item.key,item.quantity)}
                  className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5"
                >
                  
                  <svg
                    className="w-2.5 h-2.5 cursor-pointer text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <p className="px-3 text-2xl">{item.quantity}</p>
                <button
                  type="button"
                  onClick={() => increment(item.key, item.quantity)}
                  className="shrink-0 cursor-pointer bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5"
                >
                  +
                </button>

                <svg
                  className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </div>
          
        </form>
          </div >
          <div>
            <p className="text-2xl font-semibold">
              Total: {item.total }
            </p>
          </div>
          <button className="text-3xl absolute top-0 right-0 cursor-pointer" onClick={()=>deleteData(item.key)}>X</button>
        
        </div >
        
        )
      )
        
}
<div className="w-full text-center">
<button className="bg-black text-white p-4 rounded-3xl m-auto text-center">Procced To CheckOut</button>
    </div>
    </>
  );
}
