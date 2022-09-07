import LectureModal from "components/LectureModal";
import Show from "components/Show";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const NewLectureButton = () => {
    const [showModal, setShowModal] = useState(false);
    const onNewButtonClick = () => setShowModal(true);
    const onModalClose = () => setShowModal(false);

    return (
        <>
            <Show showIf={showModal}>
                <LectureModal onClose={onModalClose} />
            </Show>
            <div className='text-white bg-sky-500 rounded-lg flex justify-center items-center p-4 cursor-pointer' onClick={onNewButtonClick}>
                <AiOutlinePlus className='mr-1' />
                <div>New</div>
            </div>
        </>
    )
}

export default NewLectureButton;