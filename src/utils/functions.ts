import { MouseEventHandler } from "react";
import { ILecture } from "redux/features/planner/types";
import { INITIAL_LECTURE, INITIAL_VALUES } from "./constants";

const isBrowser = () => typeof window !== "undefined";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const capitalize = (word: string) => {
  if (word) return word;
  const _word = word.split("");
  _word[0] = _word[0].toUpperCase();
  return _word;
};

function dateToStr(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleString();
}

const getLocalStorageLectures = () => window.localStorage.getItem("lectures");
const getLocalStorageValues = () => window.localStorage.getItem("values");

const getInitialLectures: () => ILecture[] = () => {
  if (!isBrowser()) return [];
  const localStorageLectures = getLocalStorageLectures();
  if (localStorageLectures === null) {
    return INITIAL_LECTURE;
  }
  const lectures = JSON.parse(localStorageLectures || `[]`);
  return lectures;
};

const getPlanner: () => string[][] = () => {
  if (!isBrowser()) return [];
  const planner = Array(10).fill(Array(6).fill(1));
  return planner;
};

const makeMinuteString = (minute: number) => {
  const isStartTimeMinutesZero = minute < 10;
  if (isStartTimeMinutesZero) `0${minute}`;
  return minute;
};

const getLectureEndTime = (startTime: Date, lectureTime: Date) => {
  return new Date(
    new Date().setHours(
      new Date(startTime).getHours() + new Date(lectureTime).getHours(),
      new Date(startTime).getMinutes() + new Date(lectureTime).getMinutes(),
    ),
  );
};

const getNextLectureStartTime = (
  startTime: Date,
  lectureTime: Date,
  breakTime: Date,
) => {
  return new Date(
    new Date().setHours(
      new Date(startTime).getHours() +
        new Date(lectureTime).getHours() +
        new Date(breakTime).getHours(),
      new Date(startTime).getMinutes() +
        new Date(lectureTime).getMinutes() +
        new Date(breakTime).getMinutes(),
    ),
  );
};

const getTimes: () => string[] = () => {
  if (!isBrowser()) return [];
  let startTime = new Date(new Date().setHours(8, 30, 0, 0));
  const breakTime = new Date(new Date().setHours(0, 10, 0, 0));
  const lectureTime = new Date(new Date().setHours(0, 50, 0, 0));
  const times = [];

  for (let i = 0; i <= 9; i++) {
    const tempStartTime = new Date(startTime);
    const endTime = getLectureEndTime(startTime, lectureTime);
    startTime = getNextLectureStartTime(startTime, lectureTime, breakTime);

    const startTimeHour = tempStartTime.getHours();
    const startTimeMinute = tempStartTime.getMinutes();
    const startTimeString = `${startTimeHour}.${makeMinuteString(
      startTimeMinute,
    )}`;

    const endTimeHour = endTime.getHours();
    const endTimeMinute = endTime.getMinutes();
    const endTimeString = `${endTimeHour}.${makeMinuteString(endTimeMinute)}`;
    const timeString = `${startTimeString} - ${endTimeString}`;
    times.push(timeString);
  }

  return times;
};

const stopPropagation: MouseEventHandler = (e) => {
  e.stopPropagation();
};

const getInitialValues = () => {
  if (!isBrowser()) return [];
  const localStorageValues = getLocalStorageValues();
  if (localStorageValues === null) {
    return INITIAL_VALUES;
  }
  const values: string[][] = JSON.parse(localStorageValues || "[]");
  return values;
};

export {
  dateToStr,
  capitalize,
  isBrowser,
  getRandomColor,
  getInitialLectures,
  getPlanner,
  getTimes,
  getInitialValues,
  stopPropagation,
};
