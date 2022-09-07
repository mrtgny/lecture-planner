import useModal from "components/LectureModal/useModal";
import Portal from "components/Portal";
import { forwardRef, PropsWithChildren, useImperativeHandle } from "react";
import { animated } from "react-spring";
import { stopPropagation } from "utils/functions";
import { IModalProps, IModalRef } from "./types";

const Modal = forwardRef<IModalRef, PropsWithChildren<IModalProps>>(({ children, onClose }, ref) => {
    const { onModalClose, backgroundColor, transform } = useModal({ onClose });

    useImperativeHandle(ref, () => ({
        close: onModalClose
    }))

    return (
        <Portal>
            <animated.div className="fixed inset-0 flex items-center justify-center z-20 p-4"
                onClick={() => onModalClose()}
                style={{ backgroundColor }}>
                <animated.div
                    style={{
                        transform,
                        maxHeight: 'calc(100vh - 200px)'

                    }}
                    className="min-w-[300px] bg-white rounded-lg overflow-hidden"
                    onClick={stopPropagation}
                >
                    {children}
                </animated.div>
            </animated.div>
        </Portal>
    )
})

Modal.displayName = "Modal";

export default Modal;