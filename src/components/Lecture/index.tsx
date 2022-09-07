import LectureModal from "components/LectureModal";
import Portal from "components/Portal";
import Show from "components/Show";
import { FC, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";
import { setValue } from "redux/features/schedule";
import { useAppDispatch } from "redux/hooks";
import { ILectureProps } from "./types";

const Lecture: FC<ILectureProps> = ({
    lecture,
    main,
    lectureIndex,
    dayIndex,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd
}) => {
    const dispatch = useAppDispatch()
    const [{ x, y, transform }, set] = useSpring(() => ({ x: 0, y: 0, transform: 'scale(1)' }))
    const offset = useRef({ x: 0, y: 0 });
    const [hasDragged, setHasDragged] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const draggingItem = useRef<HTMLDivElement>(null);
    const timer = useRef(null);


    useEffect(() => {
        if (isDragging) {
            if (_onDragStart) _onDragStart()
        } else {
            setTimeout(() => { setHasDragged(false); }, 100);
            if (_onDragEnd) _onDragEnd()
        }
    }, [isDragging, _onDragStart, _onDragEnd])

    const onModalClose = () => {
        setShowModal(false);
    }

    const onClick = ({ }) => {
        if (!hasDragged)
            setShowModal(true)
    }

    const startDragTimer = () => {
        timer.current = setTimeout(() => {
            setIsDragging(true)
            set({ x: offset.current.x, y: offset.current.y, immediate: true })
            set({ transform: "scale(1)" })
        }, 300);
    }

    const onDragStart = ({ event }) => {
        if (!main) return;
        set({ transform: "scale(0.8)" })
        const target = event.target as HTMLElement;
        const { x, y } = target.getBoundingClientRect().toJSON()
        offset.current = { x, y }
        startDragTimer()
    }

    const onDrag = (({ movement: [mx, my] }) => {
        if (!main) return;
        const thresholdExceed = Math.abs(mx) > 10 || Math.abs(my) > 10;
        if (thresholdExceed) {
            setHasDragged(true)
        }
        if (thresholdExceed && !isDragging) {
            set({ transform: "scale(1)" })
            clearTimeout(timer.current);
        } else {
            if (isDragging)
                set({ transform: "scale(1)" })
            set({ x: mx + offset.current.x, y: my + offset.current.y })
        }
    })

    const onDragEnd = ({ xy }) => {
        if (!main || !draggingItem.current) {
            clearTimeout(timer.current);
            setIsDragging(false);
            set({ transform: "scale(1)" })
            return;
        }
        draggingItem.current.style.display = "none"
        const elem = document.elementFromPoint(xy[0], xy[1])
        draggingItem.current.style.display = "flex"
        if (elem && elem.className.includes("lecture-item")) {
            const { width: targetWidth, height: targetHeight } = draggingItem.current.getBoundingClientRect().toJSON()
            const { x, y, width, height } = elem.getBoundingClientRect().toJSON();
            const offsetWidth = (width - targetWidth) / 2;
            const offsetHeight = (height - targetHeight) / 2;
            const lectureIndex = parseInt(elem.getAttribute("lectureindex"));
            const dayIndex = parseInt(elem.getAttribute("dayindex"));
            set({
                x: (x) + offsetWidth, y: (y) + offsetHeight,
                onRest: () => {
                    dispatch(setValue({
                        lectureIndex,
                        dayIndex,
                        lecture
                    }))
                    set({
                        x: offset.current.x, y: offset.current.y, immediate: true,
                        onRest: () => {
                            setIsDragging(false)
                        }
                    })
                }
            })
        } else {
            set({
                x: offset.current.x, y: offset.current.y,
                onRest: () => {
                    setIsDragging(false)
                }
            })
        }
    }


    const bind = useGesture({
        onClick,
        onDragStart,
        onDrag,
        onDragEnd,

    }, {
        drag: {
            delay: false,
            useTouch: true
        }
    })

    return (
        <div className='relative'>
            <animated.div className="w-[100px] h-[50px] bg-orange-400 rounded-lg flex items-center justify-center text-white cursor-pointer"
                onClick={() => setShowModal(true)}
                {...bind()}
                style={{
                    backgroundColor: lecture?.backgroundColor,
                    color: lecture?.color,
                    transform
                }}>
                {lecture.code}
            </animated.div>
            <Show showIf={main && isDragging}>
                <Portal>
                    <animated.div ref={draggingItem} className="top-0 absolute z-10 w-[100px] h-[50px] bg-orange-400 rounded-lg flex items-center justify-center text-white cursor-pointer px-2"
                        style={{ x, y, transform, touchAction: 'none', backgroundColor: lecture?.backgroundColor, color: lecture?.color }} >
                        {lecture.code}
                    </animated.div>
                </Portal>
            </Show>
            <Show showIf={showModal}>
                <LectureModal
                    main={main}
                    onClose={onModalClose}
                    lecture={lecture}
                    lectureIndex={lectureIndex}
                    dayIndex={dayIndex}
                />
            </Show>
        </div>
    )
}

export default Lecture;