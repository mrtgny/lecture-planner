import { createSlice } from "@reduxjs/toolkit";
import {
  getInitialLectures,
  getInitialValues,
  getPlanner,
  getTimes,
} from "utils/functions";

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    lectures: getInitialLectures(),
    planner: getPlanner(),
    times: getTimes(),
    values: getInitialValues(),
  },
  reducers: {
    resetStore: (state, action) => {
      state.lectures = getInitialLectures();
      state.planner = getPlanner();
      state.times = getTimes();
      state.values = getInitialValues();
    },
    addLecture: (state, action) => {
      const lecture = { ...action.payload };
      lecture.id = new Date().getTime().toString();
      state.lectures.push(lecture);
      localStorage.setItem("lectures", JSON.stringify(state.lectures));
    },
    removeLecture: (state, action) => {
      const {
        lecture: { id },
      } = action.payload;
      const index = state.lectures.map((i) => i.id).indexOf(id);
      state.lectures.splice(index, 1);
      localStorage.setItem("lectures", JSON.stringify(state.lectures));
    },
    removeValue: (state, action) => {
      const { lectureIndex, dayIndex } = action.payload;
      delete state.values[dayIndex][lectureIndex];
      localStorage.setItem("values", JSON.stringify(state.values));
    },
    setValue: (state, action) => {
      const { lectureIndex, dayIndex, lecture } = action.payload;
      if (!state.values[dayIndex]) state.values[dayIndex] = [];
      state.values[dayIndex][lectureIndex] = lecture?.id;
      localStorage.setItem("values", JSON.stringify(state.values));
    },
    updateLecture: (state, action) => {
      const { id } = action.payload;
      const index = state.lectures.map((i) => i.id).indexOf(id);
      state.lectures[index] = action.payload;
      localStorage.setItem("lectures", JSON.stringify(state.lectures));
    },
  },
});

export const {
  addLecture,
  removeLecture,
  setValue,
  updateLecture,
  removeValue,
  resetStore,
} = plannerSlice.actions;

export default plannerSlice.reducer;
