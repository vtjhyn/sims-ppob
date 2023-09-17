import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFieldVisibility } from "../store/slice/visibilitySlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  id,
  type = "text",
  placeholder,
  register,
  errors,
  disabled,
  validationSchema,
  children,
  label,
}) => {
  const dispatch = useDispatch();
  const isPasswordInput = id === "password" || id === "confirmPassword";
  const isItemVisible = useSelector(
    (state) => state.visibilitySlice.itemVisible[id]
  );

  const toggleVisibility = () => {
    dispatch(toggleFieldVisibility({ fieldId: id }));
  };

  const inputType = isItemVisible ? "text" : type;

  return (
    <div className="w-full">
      <p className="text-[12px] font-semibold mb-2">{label}</p>
      <div
        className={`flex flex-row rounded-md border px-1 outline-none gap-2 justify-center items-center
        ${errors[id] ? "border-[#f42619]" : "border-gray-300"}
      `}
      >
        <div
          className={`px-1 mx-1 ${
            errors[id] ? "text-[#f42619]" : "text-black"
          }`}
        >
          {children}
        </div>
        <input
          id={id}
          disabled={disabled}
          {...register(id, validationSchema)}
          placeholder={placeholder}
          type={inputType}
          className="w-full p-2 text-[12px] placeholder:text-gray-300 outline-none"
        />
        {isPasswordInput && (
          <div
            onClick={toggleVisibility}
            className="cursor-pointer text-[12px] mr-2 text-gray-300"
          >
            {isItemVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>
      <div className="text-[8px] right-0 text-[#f42619] text-right mt-1">
        {errors && errors[id]?.type === "matchesPreviousPassword" && (
          <span>{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "required" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "minLength" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "pattern" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "min" && (
          <span className="error">{errors[id]?.message}</span>
        )}
        {errors && errors[id]?.type === "max" && (
          <span className="error">{errors[id]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
