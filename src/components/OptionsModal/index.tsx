import Button from "components/Button";
import Modal from "components/Modal";
import { IModalRef } from "components/Modal/types";
import Show from "components/Show";
import WarningModal from "components/WarningModal";
import { FC, useRef, useState } from "react";
import { resetStore } from "redux/features/schedule";
import { useAppDispatch } from "redux/hooks";
import { IOptionsModalProps } from "./types";

enum RESET_ENUM {
    SCHEDULE,
    DEMO
}

const OptionsModal: FC<IOptionsModalProps> = ({ onClose: _onClose }) => {
    const modal = useRef<IModalRef>(null);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const dispatch = useAppDispatch();
    const resetType = useRef<RESET_ENUM>(null);

    const onShowWarningModal = (type: RESET_ENUM) => {
        resetType.current = type;
        setShowWarningModal(true)
    }

    const onClose = (callback?) => {
        modal.current.close({
            callback: () => {
                if (callback) callback()
                _onClose();
            }
        });
    }

    const onResetSchedule = () => {
        localStorage.setItem("lectures", "[]");
        localStorage.setItem("values", "[]");
    }

    const onResetToDemo = () => {
        localStorage.removeItem("lectures");
        localStorage.removeItem("values");
    }

    const onAccept = () => {
        if (resetType.current === RESET_ENUM.SCHEDULE) {
            onResetSchedule();
        } else if (resetType.current === RESET_ENUM.DEMO) {
            onResetToDemo();
        }
        onClose(() => {
            dispatch(resetStore({}))
        });
    }

    return (
        <>
            <Modal ref={modal} onClose={_onClose}>
                <div className="p-8">
                    <h3 className="text-3xl mb-4">Hello!</h3>
                    <div className="flex flex-col gap-3">
                        <Button className="w-full bg-purple-500" onClick={() => onShowWarningModal(RESET_ENUM.SCHEDULE)}>Reset Schedule</Button>
                        <Button className="w-full bg-orange-500" onClick={() => onShowWarningModal(RESET_ENUM.DEMO)}>Reset To Demo</Button>
                        <Button className="w-full" onClick={() => onClose()}>Decline</Button>
                    </div>
                </div>
            </Modal>
            <Show showIf={showWarningModal}>
                <WarningModal onClose={() => onClose()} onAccept={onAccept} />
            </Show>
        </>
    )
}

export default OptionsModal;