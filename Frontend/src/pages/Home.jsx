import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-green-900 mb-4">Welcome to CropConnect</h1>
      <p className="text-lg text-gray-700 max-w-xl">
        A platform connecting farmers and buyers for seamless, sustainable agricultural trade. Sign up or sign in to get started!
      </p>
    </div>
  );
};

export default Home;
