import React from 'react';

const AuthInput = ({ 
    label, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    error,
    placeholder,
    required = false 
}) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300'} 
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none 
                    focus:shadow-outline focus:border-green-500`}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
};

export default AuthInput;
