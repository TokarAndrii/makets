import React from 'react';

const Input = ({
  value,
  type,
  name,
  placeholder,
  onChange,
  className,
  min = '',
  max = '',
}) => (
  <input
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={className}
    min={min}
    max={max}
  />
);

export default Input;
