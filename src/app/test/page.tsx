// "use client"
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost/wordpress-headless/wp-app/graphql", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         query: `
//           {
//             posts {
//               nodes {
//                 id
//                 title
//               }
//             }
//           }
//         `
//       })
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//       setPosts(data.data.posts.nodes);
//     })
//     .catch(err => {
//       console.error("GraphQL error:", err);
//     });
//   }, []);

//   return (
//     <>
//     <h1>console</h1></>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page