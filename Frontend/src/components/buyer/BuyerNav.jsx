import React from 'react';
import { Link } from 'react-router-dom';

const BuyerNav = () => {
    return (
        <div className="flex flex-wrap gap-3 md:gap-6 mb-4 mt-2 items-center justify-center md:justify-start">
            <Link to="/dashboard/buyer" className="  rounded-lg shadow ">
                <div className="text-2xl font-extrabold bg-[var(--color-secondary)] px-3  rounded-lg shadow"> <b className='text-green-700'>Buyer</b> <b className='text-white'>Dashboard</b></div>
            </Link>
            <Link to="/products/browse" className="px-3 py-1 bg-green-100 rounded-lg shadow hover:bg-green-200">Browse Products</Link>
            <Link to="/mycart" className="px-3 py-1 bg-green-100 rounded-lg shadow hover:bg-green-200">Cart</Link>
            <Link to="/orders/history" className="px-3 py-1 bg-green-100 rounded-lg shadow hover:bg-green-200">My Orders</Link>
            <Link to="/profile/buyer" className=" px-3 py-1 bg-green-100 rounded-lg shadow hover:bg-green-200">My Profile</Link>
        </div>
    );
};

export default BuyerNav;
