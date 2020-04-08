import React from 'react';
import Alert from './Alert';

const Input = ({label, type, name, value, placeholder, onChange, errorType}) => {
  return (
    <div>
      <div>
        <label htmlFor="name">{label}</label>
        <input 
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      <Alert errorType={errorType} />
    </div>
    
  )
}

export default Input;