import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';

const userSigninUrl = 'https://cropconnect-un44.onrender.com/user/signin';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader immediately

    try {
      const userData = { email, password };
      const response = await axios.post(userSigninUrl, userData);
      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userInfo', JSON.stringify(user));
      setEmail('');
      setPassword('');

      console.log('User signed in:', response.data);

      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 800);
    } catch (error) {
      console.error('Error during signin:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="relative w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Sign In
        </h3>

        {/* Loader overlay */}
        {loading && (
          <div
            className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center rounded-xl z-50"
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
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              type="email"
              placeholder="john@crop.connect.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button
            className={`w-full border-2 px-4 py-2 rounded-xl text-white font-medium transition ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            type="submit"
            disabled={loading}
          >
            Sign In
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Forgot your password?{' '}
            <button
              type="button"
              onClick={() => navigate('/user/forgetPassword')}
              className="text-blue-600 hover:underline font-medium"
              disabled={loading}
            >
              Reset here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../../Loader';

// const userSigninUrl = 'https://cropconnect-un44.onrender.com/user/signin';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [token, setToken] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // ✅ Show loader immediately

//     try {
//       const userData = { email, password };
//       const response = await axios.post(userSigninUrl, userData);
//       const { token, user } = response.data;

//       localStorage.setItem('authToken', token);
//       localStorage.setItem('userInfo', JSON.stringify(user));
//       setToken(token);
//       setEmail('');
//       setPassword('');

//       console.log('User signed in:', response.data);

//       // Optional: Delay navigation slightly so loader is visible
//       setTimeout(() => {
//         setLoading(false);
//         navigate('/');
//       }, 800);
//     } catch (error) {
//       console.error('Error during signin:', error.response?.data || error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-50">
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
//           <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
//             Sign In
//           </h3>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Email:
//               </label>
//               <input
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 type="email"
//                 placeholder="john@crop.connect.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Password:
//               </label>
//               <input
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 type="password"
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <button
//               className="w-full border-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//               type="submit"
//             >
//               Sign In
//             </button>

//             <p className="text-sm text-center text-gray-600 mt-4">
//               Forgot your password?{' '}
//               <button
//                 type="button"
//                 onClick={() => {
//                   navigate('/user/forgetPassword');
//                 }}
//                 className="text-blue-600 hover:underline font-medium"
//               >
//                 Reset here
//               </button>
//             </p>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signin;


// import React, { useState } from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'
// import Loader from '../../Loader'
// const userSigninUrl = "https://cropconnect-un44.onrender.com/user/signin"



// const Signin = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [token, setToken] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleSubmit= async(e)=>{
//     e.preventDefault()
//     try {
//       const userData = {email, password}
//       const response = await axios.post(userSigninUrl,userData) 
//       const {token, user} = response.data
//       localStorage.setItem("authToken", token)
//       localStorage.setItem("userInfo", JSON.stringify(user))
//       console.log("signin success.",response.data)
//       console.log("Signup success. Token stored.");
//       setLoading(true)
//       setToken(token)
//       console.log("user signin fom client side confirmation.",response.data)
//       setEmail("")
//       setPassword("")
//       navigate("/")
//     } catch (error) {
//       console.log("Error while capturing user Signin data:",
//       error.response?.data || error.message)
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-50">
//       {loading ? (<Loader/>) : (
//         <div className="w-full max-w-md p-6 border-2 border-gray-300 rounded-xl shadow-md bg-white">
//         <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
//           Sign In
//         </h3>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Email:
//             </label>
//             <input
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//               type="email"
//               placeholder="john@crop.connect.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Password:
//             </label>
//             <input
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//               type="password"
//               placeholder="* * * * * * * *"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button 
//             className="w-full border-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//             type="submit"
//           >
//             Sign In
//           </button>
//             {/* Forget your password? */}
//             <p className="text-sm text-center text-gray-600 mt-4">
//               Are you Forget your password ?
//               <button
//                 type="button"
//                 onClick={() => { navigate(`/user/forgetPassword/?token=${token}`) /* navigate to /user/forgetPassword/?token= ${token} */}}
//                 className="text-blue-600 hover:underline font-medium"
//               >
//                 forget password
//               </button>
//             </p>
//         </form>
//       </div>
//       )}
//     </div>

//   )
// }

// export default Signin


// //  POST /user/signin