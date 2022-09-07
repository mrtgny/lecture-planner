import OptionsModal from "components/OptionsModal";
import Show from "components/Show";
import { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
const LectureMoreButton = () => {
    const [showModal, setShowModal] = useState(false);

    const onShowModal = () => setShowModal(true);

    const onModalClose = () => setShowModal(false)


    return (
        <>
            <div className="pr-4">
                <div className="border-[1px] rounded-full w-10 aspect-square flex items-center justify-center cursor-pointer" onClick={onShowModal}>
                    <AiOutlineMore className="text-2xl" />
                </div>
            </div>
            <Show showIf={showModal}>
                <OptionsModal onClose={onModalClose} />
            </Show>
        </>
    )
}

export default LectureMoreButton;