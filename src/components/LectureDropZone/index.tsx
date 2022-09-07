import classNames from "classnames"
import Lecture from "components/Lecture"
import Show from "components/Show"
import { FC } from "react"
import { WEEK_DAYS } from "utils/constants"
import { ILectureDropZoneProps } from "./types"

const LectureDropZone: FC<ILectureDropZoneProps> = ({
    time,
    lecture,
    dayIndex,
    lectureIndex,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames("flex justify-center items-center border-[1px] min-w-[200px] min-h-[100px]", {
                "lecture-item": dayIndex !== 0 && lectureIndex !== 0
            })}>
            <Show showIf={!dayIndex && !!lectureIndex}>
                {WEEK_DAYS[lectureIndex - 1]}
            </Show>
            <Show showIf={!(!dayIndex && !!lectureIndex) && !lectureIndex && !!dayIndex}>
                {time}
            </Show>
            <Show showIf={!(!(!dayIndex && !!lectureIndex) && !lectureIndex && !!dayIndex) && !!lecture}>
                <Lecture lecture={lecture} lectureIndex={lectureIndex} dayIndex={dayIndex} />
            </Show>
        </div>
    )
}
export default LectureDropZone