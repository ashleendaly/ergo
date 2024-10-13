// src/components/StyledInput.tsx
import React from 'react';

interface StyledInputProps {
  label: string;
  type: string;
  value: number | string;
  onChange: (value: number | string) => void;
  required?: boolean;
}

const StyledInput: React.FC<StyledInputProps> = ({
  label,
  type,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-white mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        required={required}
        className={`w-half p-2 text-white bg-[#171717] border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500`}
      />
    </div>
  );
};

export default StyledInput;
