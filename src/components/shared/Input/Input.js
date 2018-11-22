import React from 'react';

const Input = ({ value, type, name, placeholder, onChange, className }) => (
  <input
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={className}
  />
);

export default Input;
