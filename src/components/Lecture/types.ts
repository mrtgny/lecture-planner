import { ILecture } from "redux/features/schedule/types";

export interface ILectureProps {
    lecture: ILecture,
    lectureIndex?: number;
    dayIndex?: number;
    main?: boolean,
    onDragStart?: () => void,
    onDragEnd?: () => void
}