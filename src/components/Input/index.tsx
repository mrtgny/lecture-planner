import { FC } from "react";
import { IInputProps } from "./types";

const Input: FC<IInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-4 w-full mb-4">
      <p className="mb-0 mr-4 col-span-3 md:col-span-1 text-xs md:text-base">
        {label}
      </p>
      <input
        value={value}
        onChange={onChange}
        className="px-4 py-2 border-[1px] rounded-lg w-full col-span-3"
      />
    </div>
  );
};

export default Input;
