import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Loader'; // your loader component

const userResetPasswordUrl = `https://cropconnect-un44.onrender.com/user/resetPassword`;

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from query string
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
     const response = await axios.post(
      userResetPasswordUrl,
      { password },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

      const { token: authToken, user } = response.data;

      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userInfo', JSON.stringify(user));

      setMessage('✅ Password reset successful!');
      setPassword('');

      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Reset password error:', error.response?.data || error.message);
      setMessage('❌ Failed to reset password. The token may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="relative w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Reset Password
        </h3>

        {loading && (
          <div
            className="absolute inset-0 bg-white bg-opacity-70 flex flex-col justify-center items-center rounded-xl z-50"
            aria-busy="true"
            aria-live="polite"
            aria-label="Loading"
          >
            <Loader />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-disabled={loading}
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">
              New Password:
            </label>
            <input
              id="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              type="password"
              placeholder="* * * * * * * *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            className={`w-full border-2 px-4 py-2 rounded-xl text-white font-medium transition ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            type="submit"
            disabled={!password || loading}
          >
            Save
          </button>
        </form>

        {message && (
          <p className="text-sm mt-4 text-center text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;


// import { useLocation, useNavigate,  } from 'react-router-dom';
// import axios from 'axios';
// import Loader from '../../Loader'; // your loader component

// const userResetPasswordUrl = `https://cropconnect-un44.onrender.com/user/resetPassword`;

// const ResetPassword = () => {
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation()

//   const queryParams = new URLSearchParams(location.search)
//   const token = queryParams.get('token')
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const response = await axios.post(userResetPasswordUrl, {
//         password,
//         token,
//       });

//       const { token: authToken, user } = response.data;

//       localStorage.setItem('authToken', authToken);
//       localStorage.setItem('userInfo', JSON.stringify(user));

//       setMessage('✅ Password reset successful!');
//       setPassword('');
//       // Optional: delay navigation to show message for a moment
//       setTimeout(() => navigate('/'), 1500);
//     } catch (error) {
//       console.error('Reset password error:', error.response?.data || error.message);
//       setMessage('❌ Failed to reset password. The token may be invalid or expired.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-50 p-4">
//       <div className="relative w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
//         <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
//           Reset Password
//         </h3>

//         {/* Overlay loader */}
//         {loading && (
//           <div
//             className="absolute inset-0 bg-white bg-opacity-70 flex flex-col justify-center items-center rounded-xl z-50"
//             aria-busy="true"
//             aria-live="polite"
//             aria-label="Loading"
//           >
//             <Loader />
//           </div>
//         )}

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4"
//           aria-disabled={loading}
//         >
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">
//               New Password:
//             </label>
//             <input
//               id="password"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//               type="password"
//               placeholder="* * * * * * * *"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               disabled={loading}
//             />
//           </div>

//           <button
//             className={`w-full border-2 px-4 py-2 rounded-xl text-white font-medium transition ${
//               loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//             type="submit"
//             disabled={!password || loading}
//           >
//             Save
//           </button>
//         </form>

//         {message && (
//           <p className="text-sm mt-4 text-center text-gray-600">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


// import React, { useState } from 'react'
// import {useParams} from "react-router-dom"
// import Loader from "../../Loader"
// import axios from "axios"
// const userResetPasswordUrl = `https://cropconnect-un44.onrender.com/user/resetPassword`

// const ResetPassword = () => {
//   const [password, setPassword] = useState("")
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)
//   const handleSubmit=async (e)=>{
//     e.preventDefault()
//     try {
//       const userData = {password}
//     const response = await axios.post(userResetPasswordUrl,userData)
//     const {token, user} = response.data
//       localStorage.getItem("authToken",token)
//       localStorage.getItem("userInfo",JSON.stringify(user))
//       console.log("ResetPassword success.",response.data)
//       console.log("ResetPassword success. Token stored.");
//       setLoading(true)
//       setToken(token)
//       setMessage("")
//     console.log("Password Reset sucessfull from client.",response.data)
//     } catch (error) {
//       console.log("Error while capturing user forgetPAssword request by user:",
//       error.response?.data || error.message)
//     }
//     finally{
//       setLoading(false)
//     }

//   }
//   return (
// <div className="h-screen flex justify-center items-center bg-gray-50">
//   <div className="w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
//     <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
//       Reset Password
//     </h3>

//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-600 mb-1">
//           New Password:
//         </label>
//         <input
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//           type="password"
//           placeholder="* * * * * * * *"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       <button
//         className="w-full border-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//         type="submit"
//       >
//         Save
//       </button>
//     </form>
//   </div>
// </div>

//   )
// }

// export default ResetPassword

// POST /user/resetPassword