import { ILecture } from "redux/features/planner/types";

export interface ILectureModalProps {
  lectureIndex?: number;
  dayIndex?: number;
  lecture?: ILecture;
  main?: boolean;
  onClose: () => void;
}
