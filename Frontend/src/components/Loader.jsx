import React from 'react';
import { RingLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#4CAF50", // fresh green color
};

const Loader = ({ loading = true, fullScreen = true }) => {
  return (
    <div
      className="sweet-loading"
      style={{
        height: fullScreen ? "100vh" : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
      aria-busy={loading}
      aria-live="polite"
      aria-label="Loading"
    >
      <RingLoader
        color="#4CAF50"
        loading={loading}
        cssOverride={override}
        size={120}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p style={{ color: "#4CAF50", marginTop: "1rem" }}>Loading CropConnect...</p>
    </div>
  );
};

export default Loader;



// import React, { useState } from "react";
// import { RingLoader } from "react-spinners";

// const override = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "#4CAF50", // green shade like fresh leaves
// };

// const Loader = () => {
//   const [loading, setLoading] = useState(true);

//   return (
//     <div
//       className="sweet-loading"
//       style={{
//         height: "100vh",           // full viewport height
//         display: "flex",           // flexbox container
//         flexDirection: "column",   // stack button, loader, text vertically
//         justifyContent: "center",  // center vertically
//         alignItems: "center",      // center horizontally
//         padding: "2rem",
//         textAlign: "center",
//       }}
//     >
//       <button onClick={() => setLoading(!loading)} style={{ marginBottom: "1rem" }}>
//         Toggle Loader
//       </button>
//       <RingLoader
//         color="#4CAF50" // fresh green color
//         loading={loading}
//         cssOverride={override}
//         size={120}
//         aria-label="Loading Spinner"
//         data-testid="loader"
//       />
//       <p style={{ color: "#4CAF50", marginTop: "1rem" }}>Loading CropConnect...</p>
//     </div>
//   );
// };