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
            <div className="mt-4">
                <FarmerNavbar />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading orders...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-4">
                <FarmerNavbar />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md">
                        <div className="text-red-500 text-5xl mb-3">⚠️</div>
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Orders</h2>
                        <p className="text-gray-600 text-base">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!data || !data.checkProductIds?.length) {
        return (
            <div className="mt-4">
                <FarmerNavbar />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <p className="text-lg text-gray-600 font-medium">No orders received yet 📭</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <FarmerNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold mb-8 text-center text-green-700">
                    Orders Received
                </h1>

                <div className="space-y-8">
                    {data.checkProductIds.map((order) => {
                        const buyer = order.userId;
                        const buyerProducts = order.products.map((p) => {
                            const prod = data.checkProducts.find(
                                (prod) => prod._id === p.productId
                            );
                            return prod
                                ? { ...prod, quantity: p.quantity || 1, addedAt: p.addedAt }
                                : null;
                        });

                        const orderTotal = buyerProducts.reduce((sum, prod) => {
                            if (!prod) return sum;
                            return sum + prod.pricePerUnit * prod.quantityAvailable;
                        }, 0);

                        return (
                            <div
                                key={order._id}
                                className="border rounded-2xl shadow-lg bg-white overflow-hidden transition hover:shadow-xl"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    {/* Buyer Info */}
                                    <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
                                        <h2 className="text-xl font-semibold mb-4 text-green-700">
                                            Buyer Details
                                        </h2>
                                        <p className="mb-2 text-gray-700">
                                            <span className="font-medium">Name:</span>{" "}
                                            {buyer?.name || "Unknown"}
                                        </p>
                                        <p className="mb-2 text-gray-700">
                                            <span className="font-medium">Email:</span>{" "}
                                            {buyer?.email}
                                        </p>

                                        {data.additionalBuyerInfo
                                            ?.find((info) => info.userId === buyer?._id) && (
                                                <div className="mt-4 space-y-2">
                                                    {(() => {
                                                        const extra = data.additionalBuyerInfo.find(
                                                            (info) => info.userId === buyer?._id
                                                        );
                                                        return (
                                                            <>
                                                                <p>
                                                                    <span className="font-medium">Phone:</span>{" "}
                                                                    {extra.phone || "N/A"}
                                                                </p>
                                                                <p>
                                                                    <span className="font-medium">Address:</span>{" "}
                                                                    {extra.address || "N/A"}
                                                                </p>
                                                                <p>
                                                                    <span className="font-medium">Location:</span>{" "}
                                                                    {extra.location?.city}, {extra.location?.state}
                                                                </p>
                                                                {extra.preferences?.length > 0 && (
                                                                    <p>
                                                                        <span className="font-medium">Preferences:</span>{" "}
                                                                        {extra.preferences.join(", ")}
                                                                    </p>
                                                                )}
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            )}

                                        <p className="text-xs text-gray-500 mt-6">
                                            Buyer ID: {order._id}
                                        </p>
                                    </div>

                                    {/* Products */}
                                    <div className="p-6 bg-gray-50">
                                        <div className="space-y-5">
                                            {buyerProducts.map(
                                                (prod) =>
                                                    prod && (
                                                        <div
                                                            key={prod._id}
                                                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                                                        >
                                                            <img
                                                                src={prod.images?.[0]}
                                                                alt={prod.name}
                                                                className="w-28 h-28 object-cover rounded-md"
                                                            />
                                                            <div className="flex-1">
                                                                <h3 className="font-semibold text-lg">
                                                                    {prod.name}
                                                                </h3>
                                                                {prod.variety && (
                                                                    <p className="text-sm text-gray-500">
                                                                        Variety: {prod.variety}
                                                                    </p>
                                                                )}
                                                                <p className="text-sm text-gray-700">
                                                                    <span className="font-medium">Product ID:</span>{" "}
                                                                    {prod._id}
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    Price:{" "}
                                                                    <span className="font-medium">
                                                                        {prod.pricePerUnit} ₹ / {prod.unit}
                                                                    </span>
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    Quantity:{" "}
                                                                    <span className="font-medium">
                                                                        {prod.quantityAvailable} {prod.unit}
                                                                    </span>
                                                                </p>
                                                                <p className="font-semibold text-green-600">
                                                                    Amount:{" "}
                                                                    {prod.pricePerUnit * prod.quantityAvailable} ₹
                                                                </p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    Interest Shown at:{" "}
                                                                    {new Date(prod.addedAt).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                            )}
                                        </div>
                                        <div className="mt-6 text-right">
                                            <h3 className="text-xl font-bold text-green-700">
                                                Total Amount Payable to you: ₹ {orderTotal}/-
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OrderReceived;
