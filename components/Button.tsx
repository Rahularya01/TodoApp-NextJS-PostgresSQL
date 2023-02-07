import React, { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

type ButtonProps = {
  children: ReactNode;
  loading?: boolean;
};

const Button = ({ children, loading }: ButtonProps) => {
  return (
    <button
      disabled={loading}
      className="mt-2 bg-violet-700 py-2 rounded-lg text-center text-white hover:bg-violet-900 disabled:bg-violet-400"
    >
      {loading ? <ClipLoader color="white" size={18} /> : <>{children}</>}
    </button>
  );
};

export default Button;
