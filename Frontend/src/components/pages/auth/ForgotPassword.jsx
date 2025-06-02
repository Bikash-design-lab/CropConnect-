import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../../Loader'; // Your spinner component
import { useNavigate } from 'react-router-dom';

const userForgetPasswordUrl = `https://cropconnect-un44.onrender.com/user/forgetPassword`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const userData = { email };
      const response = await axios.post(userForgetPasswordUrl, userData);
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
      }

      setMessage('✅ Password reset email sent. Please check your inbox.');
      setEmail('');
      navigate("/user/resetPassword")
    } catch (error) {
      setMessage('❌ Failed to send password reset. Try again.');
      console.error('Error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="relative w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Forgot Password
        </h3>

        {/* Overlay loader */}
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

        {/* Form with disabled state during loading */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-disabled={loading}
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your registered email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={!email || loading}
            className={`w-full border-2 px-4 py-2 rounded-xl text-white font-medium transition ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Confirm Email
          </button>
        </form>

        {message && (
          <p className="text-sm mt-4 text-center text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;


// import React, { useState } from 'react';
// import axios from 'axios';
// import Loader from '../../Loader'; // Adjust path as needed

// const userForgetPasswordUrl = `https://cropconnect-un44.onrender.com/user/forgetPassword`;

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);

//     try {
//       const userData = { email };
//       const response = await axios.post(userForgetPasswordUrl, userData);
//       console.log('Response:', response.data);

//       const { token, user } = response.data;
//       if (token) {
//         localStorage.setItem('authToken', token);
//       }

//       console.log('User:', JSON.stringify(user));
//       setMessage('✅ Password reset email sent. Please check your inbox.');
//       setEmail('');
//     } catch (error) {
//       console.error('Error:', error.response?.data || error.message);
//       setMessage('❌ Failed to send password reset. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-50">
//       <div className="w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
//         <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
//           Forgot Password
//         </h3>

//         {loading ? (
//           <Loader />
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your registered email..."
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={!email || loading}
//               className={`w-full border-2 px-4 py-2 rounded-xl text-white font-medium transition ${
//                 loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//             >
//               {loading ? 'Sending...' : 'Confirm Email'}
//             </button>
//           </form>
//         )}

//         {message && (
//           <p className="text-sm mt-4 text-center text-gray-600">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


// import React, { useState } from 'react';
// import axios from 'axios';

// const userForgetPasswordUrl = `https://cropconnect-un44.onrender.com/user/forgetPassword`;

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);

//     try {
//       const userData = { email };
//       const response = await axios.post(userForgetPasswordUrl, userData);
//       console.log('Response:', response.data);

//       const { token, user } = response.data;
//       if (token) {
//         localStorage.setItem('authToken', token);
//       }

//       console.log('User:', JSON.stringify(user));
//       setMessage('✅ Password reset email sent. Please check your inbox.');
//       setEmail('');
//     } catch (error) {
//       console.error('Error:', error.response?.data || error.message);
//       setMessage('❌ Failed to send password reset. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-50">
//       <div className="w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
//         <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
//           Forgot Password
//         </h3>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Email:
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your registered email..."
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={!email || loading}
//             className={`w-full border-2 px-4 py-2 rounded-xl text-white font-medium transition ${
//               loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {loading ? 'Sending...' : 'Confirm Email'}
//           </button>
//         </form>

//         {message && (
//           <p className="text-sm mt-4 text-center text-gray-600">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


// // import React, { useState } from 'react'
// // import axios from "axios"
// // const userForgetPasswordUrl = `https://cropconnect-un44.onrender.com/user/forgetPassword`


// // const ForgotPassword = () => {
// //   const [email, setEmail] = useState("")
// //   const [message, setMessage] = useState('');
// //   const handleSubmit= async(e)=>{
// //     e.preventDefault()
// //     try {
// //       const userData = {email}
// //       const response = await axios.post(userForgetPasswordUrl, userData)
// //       console.log("Data from forget password making req. from client side.",response.data)
// //       const {token, user} = response.data
// //       if(token){
// //         localStorage.setItem("authToken",token)
// //       } 
// //       console.log("USER data from client side: ", JSON.stringify(user))
// //       setMessage('Password reset email sent. Please check your inbox.');
// //       setEmail("")
// //     } catch (error) {
// //       console.log('Error:', error.response?.data || error.message);
// //       setMessage('Failed to send password reset. Try again.');
// //     }
// //   }
// //   return (
// //     <div className="h-screen flex justify-center items-center bg-gray-50">
// //       <div className="w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
// //         <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
// //           Forgot Password
// //         </h3>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-600 mb-1">
// //               Email:
// //             </label>
// //             <input
// //               type="email"
// //               placeholder="Enter your registered email..."
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full border-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
// //           >
// //             Confirm Email
// //           </button>
           
// //         </form>
// //         {message && (
// //           <p className="text-sm mt-4 text-center text-gray-600">{message}</p>
// //         )}
// //       </div>
// //     </div>

// //   )
// // }

// // export default ForgotPassword

// // const userForgetPasswordUrl = `https://cropconnect-un44.onrender.com/user/forgetPassword/?token= ${token}`
// // set token in localstorage 
// // POST /user/forgetPassword

// // {/* For reset password enter email and received link to open for reset password */}
// //             <p className="text-sm text-center text-gray-600 mt-4">
              
// //               <button
// //                 type="button"
// //                 onClick={() => { navigate(`/user/forgetPassword/?token=${token}`) /* navigate to /user/forgetPassword/?token= ${token} */}}
// //                 className="text-blue-600 hover:underline font-medium"
// //               >
// //                 update password
// //               </button>
// //             </p>