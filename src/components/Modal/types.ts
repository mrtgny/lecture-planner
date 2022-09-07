export interface IModalProps {
    onClose: () => void;
}

export interface IModalRef {
    close: (params?: { callback?: any }) => void
}