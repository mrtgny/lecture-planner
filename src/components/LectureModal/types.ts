import { ILecture } from "redux/features/schedule/types";

export interface ILectureModalProps {
    lectureIndex?: number;
    dayIndex?: number;
    lecture?: ILecture,
    main?: boolean;
    onClose: () => void
}