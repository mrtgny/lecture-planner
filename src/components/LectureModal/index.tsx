import Button from "components/Button";
import ColorPicker from "components/ColorPicker";
import Input from "components/Input";
import Modal from "components/Modal";
import { IModalRef } from "components/Modal/types";
import Show from "components/Show";
import WarningModal from "components/WarningModal";
import { FC, useRef, useState } from "react";
import { useGesture } from "react-use-gesture";
import { Handlers } from "react-use-gesture/dist/types";
import {
  addLecture,
  removeLecture,
  removeValue,
  updateLecture,
} from "redux/features/planner";
import { useAppDispatch } from "redux/hooks";
import { Callback } from "utils/types";
import { ILectureModalProps } from "./types";

const LectureModal: FC<ILectureModalProps> = ({
  lecture,
  lectureIndex,
  dayIndex,
  main,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({ ...lecture });
  const [showWarningModal, setShowWarningModal] = useState(false);
  const isNew = !lecture?.id;
  const modal = useRef<IModalRef>(null);
  const [reachedToBottom, setReachedToBottom] = useState(false);

  const onScroll: Handlers["onScroll"] = ({ event }) => {
    const target = event.target as HTMLDivElement;
    const clientHeight = target.clientHeight;
    const scrollHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;
    const reachedToBottom = scrollTop + clientHeight >= scrollHeight;
    setReachedToBottom(reachedToBottom);
  };

  const bind = useGesture({
    onScroll,
  });

  const onChange = (name: string, value: string) => {
    setValues((old) => {
      return { ...old, [name]: value };
    });
  };

  const onModalClose = (callback?: Callback) => {
    modal.current?.close({
      callback: () => {
        if (callback) callback();
        onClose();
      },
    });
  };

  const onSave = () => {
    if (isNew) {
      dispatch(addLecture(values));
    } else {
      dispatch(updateLecture(values));
    }
    onModalClose();
  };

  const onShowWarningModal = () => {
    setShowWarningModal(true);
  };

  const onWarningModalClose = () => {
    setShowWarningModal(false);
  };

  const onWarningModalAccept = () => {
    const callback = () =>
      dispatch(
        removeLecture({
          lecture,
        }),
      );
    onModalClose(callback);

    setShowWarningModal(false);
  };

  const onLectureRemove = () => {
    onModalClose(() =>
      dispatch(
        removeValue({
          lectureIndex,
          dayIndex,
        }),
      ),
    );
  };

  const boxShadow = !reachedToBottom
    ? "rgb(0 0 0 / 28%) 0px -20px 66px"
    : undefined;

  return (
    <>
      <Modal ref={modal} onClose={onClose}>
        <div
          style={{ maxHeight: "calc(100vh - 360px)" }}
          className="overflow-auto p-8 pb-0"
          {...bind()}
        >
          <Input
            label="Code:"
            value={values?.code}
            onChange={(e) => onChange("code", e.target.value)}
          />
          <Input
            label="Title:"
            value={values?.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
          <ColorPicker
            label="Background Color"
            value={values?.backgroundColor}
            onChange={(e) => onChange("backgroundColor", e)}
          />
          <ColorPicker
            label="Text Color"
            value={values?.color}
            onChange={(e) => onChange("color", e)}
          />
        </div>
        <div
          className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-4 w-full p-8 bg-white relative z-10"
          style={{
            boxShadow,
            transition: "0.4s",
          }}
        >
          <div className="col-span-1" />
          <div className="col-span-3 flex items-center gap-2 ">
            <Button
              className="w-full max-w-[100px]"
              onClick={() => onModalClose()}
            >
              Decline
            </Button>
            <Show showIf={!isNew}>
              <Button
                className="w-full max-w-[100px]"
                danger
                onClick={main ? onShowWarningModal : onLectureRemove}
              >
                Delete
              </Button>
            </Show>
            <Button className="w-full max-w-[100px]" primary onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <Show showIf={showWarningModal}>
        <WarningModal
          onClose={onWarningModalClose}
          onAccept={onWarningModalAccept}
        />
      </Show>
    </>
  );
};

export default LectureModal;
