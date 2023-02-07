import { ChangeEventHandler } from "react";

type InputProps = {
  value: string | number | readonly string[] | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: true;
};

const Input = ({ value, onChange, placeholder, required }: InputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      required={required}
      className="px-5 py-2 border border-gray-400 rounded-lg"
      type="text"
      placeholder={placeholder}
    />
  );
};

export default Input;
