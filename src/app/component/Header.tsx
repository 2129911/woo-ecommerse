import Link from 'next/link'
import React from 'react'

const   Header = () => {
  return (
    <>
      <div className="bg-white  shadow-md">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        MyLogo
      </div>
      <nav className="space-x-4">
        <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link href="/product" className="text-gray-700 hover:text-blue-600">Product</Link>
        <Link href="cart" className="text-gray-700 hover:text-blue-600">Cart</Link>
    
      </nav>
    </div>
  </div>
    </>
  )
}

export default Header