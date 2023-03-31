import Button from "components/Button";
import Modal from "components/Modal";
import { IModalRef } from "components/Modal/types";
import { FC, useRef } from "react";
import { IWarningModalProps } from "./types";

const WarningModal: FC<IWarningModalProps> = ({
  onClose: _onClose,
  onAccept: _onAccept,
}) => {
  const modal = useRef<IModalRef>(null);

  const onClose = () => {
    modal.current?.close({ callback: _onClose });
  };

  const onAccept = () => {
    modal.current?.close({ callback: _onAccept });
  };

  return (
    <Modal ref={modal} onClose={_onClose}>
      <div className="p-8">
        <h3 className="text-3xl mb-4">Danger!</h3>
        <p>All lectures will ve deleted permanently. Do you accept?</p>
        <div className="flex gap-2 mt-4">
          <Button className="w-full" onClick={onClose}>
            Decline
          </Button>
          <Button className="w-full" danger onClick={onAccept}>
            Accept
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
