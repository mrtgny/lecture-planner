import { FC } from "react";
import { ColorChangeHandler, SwatchesPicker } from "react-color";
import { IColorPickerProps } from "./types";

const ColorPicker: FC<IColorPickerProps> = ({
  label,
  value,
  onChange: _onChange,
}) => {
  const onChange: ColorChangeHandler = ({ hex }) => {
    if (_onChange) _onChange(hex);
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-4 w-full mb-4">
      <p className="mb-0 mr-4 col-span-3 md:col-span-1 text-xs md:text-base">
        {label}
      </p>
      <div className="border-[1px] rounded-lg">
        <SwatchesPicker
          color={value}
          width={300}
          onChange={onChange}
          className="w-full col-span-3"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
