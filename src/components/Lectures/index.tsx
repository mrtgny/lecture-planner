import classNames from "classnames";
import Lecture from "components/Lecture";
import LectureMoreButton from "components/LectureMoreButton";
import NewLectureButton from "components/NewLectureButton";
import { useState } from "react";
import { animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import { useAppSelector } from "redux/hooks";

const Lectures = () => {
  const lectures = useAppSelector((state) => state?.planner?.lectures);
  const [scrolled, setScrolled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const onDragStart = () => setIsDragging(true);
  const onDragEnd = () => setIsDragging(false);

  const bind = useGesture({
    onScroll: ({ xy: [x] }) => setScrolled(x > 0),
  });

  const boxShadow = scrolled ? "rgb(0 0 0 / 23%) 27px 0px 50px" : undefined;

  return (
    <div className="shadow-xl w-screen z-10 flex items-center">
      <div
        className="p-4 flex items-center"
        style={{ transition: "0.4s", boxShadow }}
      >
        <LectureMoreButton />
        <NewLectureButton />
      </div>
      <div
        className={classNames("flex items-center gap-2 py-4", {
          "overflow-auto": !isDragging,
          "overflow-hidden": isDragging,
        })}
        {...bind()}
      >
        {lectures.map((lecture) => {
          return (
            <Lecture
              lecture={lecture}
              key={lecture.id}
              main
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          );
        })}
        <Spacer />
      </div>
    </div>
  );
};

const Spacer = () => {
  return (
    <div className="w-[16px]">
      <animated.div className="w-[16px] h-[1px]" />
    </div>
  );
};

export default Lectures;
