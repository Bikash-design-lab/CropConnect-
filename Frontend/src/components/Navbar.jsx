import React from 'react';
import { NavLink,Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <div className="flex container m-0 px-4 border-2 border-amber-300 mb-6">
     <div className='pr-4 text-blue-400'> 
      <Link to="/">CopConnect</Link> </div>
     <div className="w-1/2 flex space-x-4">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ProductCart">ProductCart</NavLink>
      <NavLink to="/OrderCart">OrderCart</NavLink>
      <NavLink to="/ProtectedRoute">ProtectedRoute</NavLink>
      <NavLink to="/user/signup">signup/user</NavLink>
     </div>
    </div>
  );
};

export default Navbar;
