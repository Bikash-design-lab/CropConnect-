import React from 'react'
import { Link } from 'react-router-dom';

const FarmerNavbar = () => {
    return (
        <div className="flex flex-wrap gap-4 justify-center mb-2">
            <Link to="/dashboard/farmer/home">
                <div className="text-2xl font-extrabold bg-[var(--color-secondary)] px-3  rounded-lg shadow"> <b className='text-green-700'>Farmer</b> <b className='text-white'>Dashboard</b></div>
            </Link>
            <Link to="/dashboard/farmer" className="bg-green-100 rounded-lg shadow h-8 px-1 pt-1 hover:bg-green-200">Listed Crops</Link>
            <Link to="/products/list" className="bg-green-100 h-8 px-1 pt-1 rounded shadow hover:bg-green-200">List New Product</Link>
            <Link to="/orders/received" className="bg-green-100 h-8 px-1 pt-1 rounded shadow hover:bg-green-200">Orders Received</Link>
            <Link to="/profile/farmer" className="bg-green-100 h-8 px-1 pt-1 rounded-lg shadow hover:bg-green-200">My Profile</Link>

        </div>
    )
}

export default FarmerNavbar
