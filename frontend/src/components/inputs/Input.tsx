import { ChangeEvent, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface Props {
  type: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, placeholder, label, value, onChange }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="">
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          className="w-full bg-transparent outline-none"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => togglePassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => togglePassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
