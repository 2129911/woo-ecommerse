
// import { deleteProductMutation } from "../../lib/route";
// import { fetchData } from "../../lib/route";
// import { useState } from "react";

// export default function ProductList({ products }: { products: any[] }) {
//   const [items, setItems] = useState(products);

//   const handleDelete = async (id: string) => {
//     const mutation = deleteProductMutation(id);
//     const res = await fetchData(mutation);
//     console.log("Deleted:", res);
//     setItems(items.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Products</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {items.map((item) => (
//         <div key={item.id} className="border p-3 my-2 rounded">
//            <div key={item.id} className="bg-white p-4 shadow rounded">
//             <img src={item.image?.sourceUrl} alt={item.image?.altText} className="w-full h-48 object-cover mb-2" />
//             <h2 className="text-lg font-semibold">{item.name}</h2>
//             <p className="text-sm text-gray-600">{item.description}</p>
          
//           <button
//             onClick={() => handleDelete(item.id)}
//             className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
//           >
//             Delete
//           </button>
//         </div>
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// }
import React from 'react'

const productList = () => {
  return (
    <div>productList</div>
  )
}

export default productList