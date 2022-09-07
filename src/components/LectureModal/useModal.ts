import { useEffect } from "react";
import { useSpring } from "react-spring";

const useModal = ({ onClose }: { onClose: () => void }) => {
    const [{ transform, backgroundColor }, set] = useSpring(() => ({ transform: 'scale(0)', backgroundColor: 'rgba(0,0,0,0)' }))

    useEffect(() => {
        set({ transform: 'scale(1)', backgroundColor: 'rgba(0,0,0,0.4)' });
    }, [set])

    const onModalClose = ({ callback } = { callback: undefined }) => {
        set({
            transform: 'scale(0)', backgroundColor: 'rgba(0,0,0,0)', onRest: !!callback ? callback : onClose
        });
    }

    return { onModalClose, backgroundColor, transform };
}

export default useModal;