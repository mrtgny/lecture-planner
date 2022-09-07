import { ChangeEvent } from "react";

export interface IInputProps {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}