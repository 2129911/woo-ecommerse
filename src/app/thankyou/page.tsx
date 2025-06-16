"use client";
import React from 'react';
import { motion } from "framer-motion";

const Page = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white p-10 rounded-3xl shadow-2xl text-center"
      >
        <motion.div
          // initial={{ rotate: 0 }}
          // animate={{ rotate: 360 }}
          // transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="mx-auto mb-5"
        >
          <svg 
            className="w-20 h-20 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>
        <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-8 rounded-full shadow-lg hover:scale-105 transform transition">
          Back to Home
        </button>
      </motion.div>
    </div>
  )
}

export default Page;
