
import React, { useState } from 'react';
import Signup from '../pages/Auth/Signup';
import Signin from '../pages/Auth/Signin';
import { useNavigate } from 'react-router-dom';

const AuthContext = () => {
  const [showSignup, setShowSignup] = useState(true); // true = show Signup, false = show Signin

  
const navigate = useNavigate();
 const handleToggle = () => {
    const nextIsSignup = !showSignup;
    setShowSignup(nextIsSignup);
    // navigate(nextIsSignup ? '/user/signup' : '/user/signin');
  };

  return (
    <div className="flex flex-col justify-center items-center">
       {showSignup ? <Signup /> : <Signin />}
      <div className="mb-4">
        <button 
          onClick={handleToggle}
          className="border px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {showSignup ? "Switch to Signin" : "Switch to Signup"}
        </button>
      </div>
    </div>
  );
};

export default AuthContext;


// import React from 'react'
// import { Routes, Route } from 'react-router-dom';
// import Signup from '../pages/Auth/Signup';
// import Signin from '../pages/Auth/Signin';

// const AuthContext = () => {
//   return (
//     <div>
//       <Routes>
//     <Route path="/user/signup" element={<Signup />} />
//     <Route path="/user/signin" element={<Signin />} />
//     {/* other routes */}
//   </Routes>
//     </div>
//   )
// }

// export default AuthContext

