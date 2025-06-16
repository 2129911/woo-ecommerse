"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img from '../dommyImage/logo-1.jpg';
import { getSession } from "../session/session";
import { GET_CART } from "../../lib/route";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../lib/schema";
import { z } from "zod";
import { useRouter } from 'next/navigation';
//  import $ from 'jquery';
type FormData = z.infer<typeof formSchema>
const Page = () => {
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();

    const endpoint: any = process.env.NEXT_PUBLIC_END_POINT;
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
            console.log(res, "data")

            const getCart = res?.data?.data?.cart;
            const items = getCart?.contents?.nodes.map((item: any) => ({
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
        fetchCartData()
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormData) => {
        if (!data) {
            alert("data not submit")
        } else {
            router.push("/thankyou")
            console.log("Form Submitted:", data);
        }

    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-10 flex justify-center items-center">
            <div className="bg-white rounded-3xl shadow-2xl flex overflow-hidden w-[90%] max-w-6xl">
                {/* Left Form Section */}
                <div className="w-1/2 p-10 bg-gradient-to-br from-blue-100 to-blue-50">
                    <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Order Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <input {...register("name")} type="text" placeholder="Enter Name" className="border-2 border-black w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-50" />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                        <div>
                            <input {...register("lastName")} type="text" placeholder="Enter Last Name" className="border-2 border-black w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-50" />
                            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                        </div>
                        <div>
                            <input {...register("email")} type="email" placeholder="Enter Email" className="border-2 border-black w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-50" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                        <div>


                            <input {...register("address")} type="text" placeholder="Enter Address" className="border-2 border-black w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-50" />
                            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                        </div>
                        <div>
                            <input {...register("pincode")} type="number" placeholder="Enter Pincode" className="border-2 border-black w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-50" />
                            {errors.pincode && <p className="text-red-500">{errors.pincode.message}</p>}
                        </div>
                        <div>
                            <input {...register("phone")} type="number" placeholder="Enter Phone Number" className="border-2 border-black w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:border-amber-50" />
                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                        </div>
                        <textarea placeholder="Additional Notes" className="border-2 border-black w-full p-3 rounded-xl h-28 resize-none focus:outline-none focus:ring-2 focus:border-amber-50"></textarea>
                        <div className="mt-10 text-center">
                            <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-all">
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>


                <div className="w-1/2 p-10 bg-white">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Your Cart</h2>

                    {/* Product List */}

                    <div className="space-y-5">

                        {cartItems.map((item: any, index: any) => (
                            <div key={index} className="flex items-center bg-gray-100 p-4 rounded-2xl shadow">
                                <img src={item.image} alt={item.name} className="rounded-2xl" width={100} height={100} />
                                <div className="ml-5">
                                    <p className="text-xl font-semibold text-gray-700">{item.name}</p>
                                    <p className="text-lg text-blue-500 font-bold">{item.orderQty}</p>
                                    <p className="text-lg text-green-600 font-bold">{item.total}</p>
                                </div>
                                <div>
                                    <p>
                                        Total: ₹
                                    {
                                        cartItems.reduce((accumulator: number, currentValue: any) => {
                                            return accumulator + parseFloat(currentValue.total);
                                        }, 0)
                                    }
                                </p>
                            </div>
                            </div>
                        ))}

                </div>


            </div>
        </div>
        </div >
    );
};

export default Page;
