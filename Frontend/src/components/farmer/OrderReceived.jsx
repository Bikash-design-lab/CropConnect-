import React, { useEffect, useState } from "react";
import FarmerNavbar from "../farmer/FarmerNavbar";

const BASE_API = import.meta.env.VITE_BASE_API_URL;
const BASE_URL = `${BASE_API}/addProductByFarmer/requestToBuyProducts`;

const OrderReceived = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("cropconnect_token")}`,
                    },
                });

                if (!res.ok) {
                    const errText = await res.text();
                    throw new Error(`Failed to fetch orders: ${res.status} ${errText}`);
                }

                const result = await res.json();
                // console.log(result);
                setData(result);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center bg-white p-6 rounded-lg shadow">
                    <div className="text-red-500 text-4xl mb-2">⚠️</div>
                    <h2 className="text-xl font-bold text-red-600 mb-1">Error:{error}</h2>
                    <p className="text-gray-600 text-sm">{error}</p>
                </div>
            </div>
        );
    }
    if (!data || !data.checkProductIds?.length)
        return <p className="text-center mt-6">No orders received yet.</p>;

    return (
        <div className="mt-4">
            <FarmerNavbar />
            <div className="max-w-5xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Orders Received
                </h1>

                {/* <p className="mb-4 text-gray-600">{data.message}</p> */}

                {data.checkProductIds.map((order) => {
                    const buyer = order.userId;
                    // merge order.products with actual product details
                    const buyerProducts = order.products.map((p) => {
                        const prod = data.checkProducts.find(
                            (prod) => prod._id === p.productId
                        );
                        return prod
                            ? { ...prod, quantity: prod.quantityAvailable || 1, addedAt: p.addedAt }
                            : null;
                    });
                    const orderTotal = buyerProducts.reduce((sum, prod) => {
                        if (!prod) return sum;
                        return sum + prod.pricePerUnit * prod.quantity;
                    }, 0);
                    return (
                        <div
                            key={order._id}
                            className="border rounded-xl shadow-md mb-6 p-4 bg-white"
                        >

                            {/* Buyer Info */}
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">
                                    <b className="text-black">Buyer’s Name: </b>
                                    {buyer?.name || "Unknown"}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    <b className="text-black">Buyer’s Email: </b>
                                    {buyer?.email}
                                </p>
                            </div>

                            {/* Ordered Products */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {buyerProducts.map(
                                    (prod) =>
                                        prod && (
                                            <div
                                                key={prod._id}
                                                className="border rounded-lg p-3 shadow-sm"
                                            >
                                                <img
                                                    src={prod.images?.[0]}
                                                    alt={prod.name}
                                                    className="w-full h-40 object-cover rounded-md mb-3"
                                                />
                                                <h3 className="font-semibold">{prod.name}</h3>
                                                {prod.variety && (
                                                    <p className="text-sm text-gray-500">
                                                        Variety: {prod.variety}
                                                    </p>
                                                )}

                                                <p className="text-gray-700">
                                                    Price: {prod.pricePerUnit} ₹ / {prod.unit}
                                                </p>
                                                <p className="text-gray-700">
                                                    Quantity: {prod.quantity} {prod.unit}
                                                </p>
                                                <p className="text-gray-800 font-semibold">
                                                    Final Price: {prod.pricePerUnit * prod.quantityAvailable} ₹
                                                </p>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    <b className="text-black"> Added at: {new Date(prod.addedAt).toLocaleString()}</b>
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Location: {prod.location?.city},{" "}
                                                    {prod.location?.state}
                                                </p>
                                            </div>
                                        )
                                )}
                            </div>

                            {/* Order Total */}
                            <div className="mt-4 text-right">
                                <h3 className="text-lg font-bold text-green-600">
                                    Order Total: {orderTotal} ₹
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderReceived;

