import React from "react";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70 z-50">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-green-700 border-t-transparent border-solid rounded-full animate-spin"></div>

            {/* Loading Text */}
            <p className="mt-4 text-green-700 font-semibold text-lg">Loading...</p>
        </div>
    );
};

export default Loader;
