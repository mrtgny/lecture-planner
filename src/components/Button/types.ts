import { MouseEventHandler } from "react";

export interface IButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    primary?: boolean;
    danger?: boolean;
    className?: string;
}