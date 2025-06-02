import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb', // light grayish background
        color: '#374151', // dark gray text
        padding: '20px',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontSize: '6rem', margin: 0, color: '#3b82f6' /* blue-500 */ }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', margin: '10px 0', fontWeight: '600' }}>
        Oops! Page Not Found
      </h2>
      <p style={{ fontSize: '1.2rem', maxWidth: '400px', marginBottom: '20px', color: '#6b7280' /* gray-500 */ }}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={()=>{navigate("/")}}
        style={{
          textDecoration: 'none',
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '10px 25px',
          borderRadius: '6px',
          fontWeight: '600',
          boxShadow: '0 4px 6px rgba(59, 130, 246, 0.4)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2563eb')} // blue-600 hover
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#3b82f6')}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
