import React from "react";

const CustomInput = ({
  id,
  labelContent,
  placeholder,
  name,
  onChange,
  value,
  errors,
  touched,
  readOnly = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium">
        {labelContent}
      </label>
      <input
        type="text"
        id={id}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5   ${
          readOnly
            ? "read-only:outline-none"
            : "focus:ring-blue-500 focus:border-blue-500"
        }`}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
      />
      <p
        className={`text-red-500 h-3 ${
          errors && touched ? "visible" : "invisible"
        }`}
      >
        {errors}
      </p>
    </div>
  );
};

export default CustomInput;
