import React from 'react'
import { Link } from 'react-router-dom';

const FarmerNavbar = () => {
    return (
        <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="text-2xl font-extrabold text-[var(--color-primary)] bg-[var(--color-secondary)] px-3 py-1 rounded-lg shadow">Farmer Dashboard</div>
            <Link to="/profile/farmer" className="bg-green-100 px-4 py-2 rounded shadow hover:bg-green-200">My Profile</Link>
            <Link to="/products/list" className="bg-green-100 px-4 py-2 rounded shadow hover:bg-green-200">List New Product</Link>
            <Link to="/orders/received" className="bg-green-100 px-4 py-2 rounded shadow hover:bg-green-200">Orders Received</Link>
        </div>
    )
}

export default FarmerNavbar
