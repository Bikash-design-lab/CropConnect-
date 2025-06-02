import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';  // your loader component

const userSignupUrl = "https://cropconnect-un44.onrender.com/user/signup";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = { name, email, password, role };
      const response = await axios.post(userSignupUrl, userData);
      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userInfo", JSON.stringify(user));

      console.log("signup success.", response.data);

      setName("");
      setEmail("");
      setPassword("");
      setRole("");

      setLoading(false);
      navigate("/user/signin");
    } catch (error) {
      console.error(
        "Error while capturing user Signup data:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 p-4">
      <div className="relative w-full max-w-md border-2 border-gray-300 p-6 rounded-xl shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Signup
        </h3>

        {/* Loader Overlay */}
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

        <form onSubmit={handleSubmit} className="space-y-4" aria-disabled={loading}>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="name">
              Name:
            </label>
            <input
              id="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              type="text"
              placeholder="john doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
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
              minLength={6}
            />
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="role">
              Role:
            </label>
            <select
              id="role"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              required
            >
              <option value="">Select your role</option>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          {/* Signup Button */}
          <button
            className={`w-full border-2 px-4 py-2 rounded-xl text-white font-medium transition ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            type="submit"
            disabled={loading}
          >
            Signup
          </button>

          {/* Already have an account? */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/user/signin")}
              className="text-blue-600 hover:underline font-medium"
              disabled={loading}
            >
              Signin
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Loader from '../../Loader';  // your loader component

// const userSignupUrl = "https://cropconnect-un44.onrender.com/user/signup";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [loading, setLoading] = useState(false);  // loader state
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);  // show loader when request starts
//     try {
//       const userData = { name, email, password, role };
//       const response = await axios.post(userSignupUrl, userData);
//       const { token, user } = response.data;

//       localStorage.setItem("authToken", token);
//       localStorage.setItem("userInfo", JSON.stringify(user));

//       console.log("signup success.", response.data);

//       // reset form
//       setName("");
//       setEmail("");
//       setPassword("");
//       setRole("");

//       setLoading(false);  // hide loader before navigating
//       navigate("/user/signin");
//     } catch (error) {
//       console.error(
//         "Error while capturing user Signup data:",
//         error.response?.data || error.message
//       );
//       setLoading(false);  // hide loader on error
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center bg-gray-50">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       <div className="w-full max-w-md border-2 border-gray-300 p-6 rounded-xl shadow-md bg-white">
//         <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
//           Signup
//         </h3>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Name:
//             </label>
//             <input
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//               type="text"
//               placeholder="john doe"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {/* Email Field */}
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
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Password:
//             </label>
//             <input
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength={6}
//             />
//           </div>

//           {/* Role Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Role:
//             </label>
//             <select
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//             >
//               <option value="">Select your role</option>
//               <option value="farmer">Farmer</option>
//               <option value="buyer">Buyer</option>
//             </select>
//           </div>

//           {/* Signup Button */}
//           <button
//             className="w-full border-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//             type="submit"
//           >
//             Signup
//           </button>

//           {/* Already have an account? */}
//           <p className="text-sm text-center text-gray-600 mt-4">
//             Already have an account?{" "}
//             <button
//               type="button"
//               onClick={() => navigate("/user/signin")}
//               className="text-blue-600 hover:underline font-medium"
//             >
//               Signin
//             </button>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useState } from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'
// const userSignupUrl = "https://cropconnect-un44.onrender.com/user/signup"

// const Signup = () => {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [role, setRole] = useState("")
//   const navigate = useNavigate()

//   const handleSubmit= async(e)=>{
//     e.preventDefault()
//     try {
//       const userData = {name,email,password,role}
//       const response = await axios.post(userSignupUrl, userData)
//       const {token, user} = response.data
//       localStorage.setItem("authToken",token)
//       localStorage.setItem("userInfo",JSON.stringify(user))
//       console.log("signup success.",response.data)
//       console.log("Signup success. Token stored.");
//       setName("")
//       setEmail("")
//       setPassword("")
//       setRole("")
//       // After sucessfully registered by user we will redirected to signin page
//       navigate("/user/signin")
//     } catch (error) {
//     console.error(
//       "Error while capturing user Signup data:",
//       error.response?.data || error.message
//     );
//   }
//   }

//   return (
        
//       <div className="flex items-center justify-center  ">
//         <div className="w-full max-w-md border-2 border-gray-300 p-6 rounded-xl shadow-md bg-white">
//           <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
//             Signup
//           </h3>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Name:
//               </label>
//               <input
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 type="text"
//                 placeholder="john doe"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             {/* Email Field */}
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

//             {/* Password Field */}
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

//             {/* Role Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Role:
//               </label>
//               <select
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="">Select your role</option>
//                 <option value="farmer">Farmer</option>
//                 <option value="buyer">Buyer</option>
//               </select>
//             </div>

//             {/* Signup Button */}
//             <button
//               className="w-full border-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//               type="submit"
//             >
//               Signup
//             </button>

//             {/* Already have an account? */}
//             <p className="text-sm text-center text-gray-600 mt-4">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => { navigate("/user/signin") /* navigate to signin */}}
//                 className="text-blue-600 hover:underline font-medium"
//               >
//                 Signin
//               </button>
//             </p>
//           </form>
//         </div>
//       </div>

//   )
// }

// export default Signup


// // POST /user/signup