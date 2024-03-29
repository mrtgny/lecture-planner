import LectureDropZone from "components/LectureDropZone";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux/hooks";

const Planner = () => {
  const planner = useAppSelector((state) => state?.planner?.planner);
  const times = useAppSelector((state) => state?.planner?.times);
  const lectures = useAppSelector((state) => state?.planner?.lectures);
  const values = useAppSelector((state) => state?.planner?.values);
  const [windowInnerHeight, setWindowInnerHeight] = useState("100vh");
  const height = `calc(${windowInnerHeight} - 86px)`;

  useEffect(() => {
    setWindowInnerHeight(`${window.innerHeight}px`);
    const listener = (e: Event) => {
      setWindowInnerHeight(`${(e.target as VisualViewport).height}px`);
      document.documentElement.scrollTop = 0;
    };
    visualViewport?.addEventListener("resize", listener);
    return () => {
      visualViewport?.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <div
      className="max-w-[100vw] overflow-auto"
      style={{
        height,
      }}
    >
      {planner?.map((day, dindex) => {
        return (
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(6, minmax(200px, 1fr))" }}
            key={dindex}
          >
            {day.map((_, cindex) => {
              const lectureId = values?.[dindex]?.[cindex];
              const lectureIndex = lectures.map((i) => i.id).indexOf(lectureId);
              const lecture = lectures[lectureIndex];
              return (
                <LectureDropZone
                  key={cindex}
                  dayIndex={dindex}
                  dayindex={dindex}
                  lectureIndex={cindex}
                  lectureindex={cindex}
                  time={times[dindex - 1]}
                  lecture={lecture}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Planner;
