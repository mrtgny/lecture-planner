import { ILecture } from "redux/features/planner/types";

export interface ILectureProps {
  lecture: ILecture;
  lectureIndex?: number;
  dayIndex?: number;
  main?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}
