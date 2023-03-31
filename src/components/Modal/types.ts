import { Callback } from "utils/types";

export interface IModalProps {
  onClose: Callback;
}

export interface IModalRef {
  close: (params?: { callback?: Callback }) => void;
}
