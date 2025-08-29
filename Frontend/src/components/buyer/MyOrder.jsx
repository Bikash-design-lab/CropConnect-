import React from 'react'
import BuyerNav from './BuyerNav'


const MyOrder = () => {

  return (
    <div className="p-2 md:p-4 max-w-4xl mx-auto">
      <div className='flex justify-center'>
        <BuyerNav />
      </div>
      <div className="card mt-4 animate-fade-in-up">
        <h1 className="text-2xl font-extrabold text-[var(--color-primary)] mb-4 text-center">My Orders</h1>
        <div className="space-y-4">
          You have not ordered any items. It's a history page to track your buyed product details.
        </div>
      </div>
    </div>
  )
}

export default MyOrder
