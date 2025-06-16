import Link from 'next/link'
// import { useParams } from 'next/navigation'
import React from 'react'


const Footer = () => {
// let param = useParams()
//   console.log(param,"check__the__param")
  return (
   <>
   <footer className="bg-gray-800 text-white py-8 ">
  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
   
    <div className="text-center md:text-left mb-4 md:mb-0">
      <h2 className="text-lg font-semibold">MyLogo</h2>
      <p className="text-sm text-gray-400">© 2025 MyWebsite. All rights reserved.</p>
    </div>

 
    <div className="space-x-4">
      <Link href="#" className="text-gray-300 hover:text-white text-sm">Product</Link>
      <Link href="#" className="text-gray-300 hover:text-white text-sm">Cart</Link>
      <Link href="#" className="text-gray-300 hover:text-white text-sm">Login</Link>
    </div>
  </div>
</footer>
   </>
  )
}

export default Footer