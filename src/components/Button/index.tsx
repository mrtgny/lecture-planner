import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import { IButtonProps } from "./types";

const Button: FC<PropsWithChildren<IButtonProps>> = ({ children, onClick, primary, className, danger }) => {
    return (
        <button onClick={onClick}
            className={classNames(`px-6 py-3 rounded-lg text-white ${className}`, {
                "bg-sky-500": primary,
                "bg-gray-300": !primary && !danger,
                "bg-red-500": danger,
            })}>
            {children}
        </button>
    )
}

export default Button;