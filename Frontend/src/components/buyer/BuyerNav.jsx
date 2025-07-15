import React from 'react';
import { Link } from 'react-router-dom';

    // if (loading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //         <div className="animate-pulse text-center">
    //             <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
    //             <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
    //         </div>
    //         </div>
    //     )
    // }

const BuyerNav = () => {
    return (
        <div className="flex flex-wrap gap-3 md:gap-6 mb-4 mt-2 items-center justify-center md:justify-start">
            <div className="text-2xl font-extrabold text-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 rounded-lg shadow">Buyer Dashboard</div>
            <Link to="/profile/buyer" className="bg-white text-[var(--color-primary)] px-3 py-1 rounded-lg shadow hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-200">My Profile</Link>
            <Link to="/products/browse" className="bg-white text-[var(--color-primary)] px-3 py-1 rounded-lg shadow hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-200">Browse Products</Link>
            <Link to="/mycart" className="bg-white text-[var(--color-primary)] px-3 py-1 rounded-lg shadow hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-200">Cart</Link>
            <Link to="/orders/history" className="bg-white text-[var(--color-primary)] px-3 py-1 rounded-lg shadow hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-200">My Orders</Link>
        </div>
    );
};

export default BuyerNav;
