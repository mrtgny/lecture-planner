import LectureDropZone from "components/LectureDropZone";
import { useAppSelector } from "redux/hooks";
import { isBrowser } from "utils/functions";

const Schedule = () => {
    const schedule = useAppSelector((state) => state?.schedule?.schedule);
    const times = useAppSelector((state) => state?.schedule?.times);
    const lectures = useAppSelector((state) => state?.schedule?.lectures);
    const values = useAppSelector((state) => state?.schedule?.values);
    const height = isBrowser() ? `calc(${window.innerHeight}px - 86px)` : `calc(100vh - 86px)`;
    return (
        <div className="max-w-[100vw] overflow-auto"
            style={{
                height,
            }}>
            {
                schedule?.map((day, dindex) => {
                    return (
                        <div className='grid' style={{ gridTemplateColumns: "repeat(6, minmax(200px, 1fr))", }} key={dindex}>
                            {day.map((_, cindex) => {
                                const lectureId = values?.[dindex]?.[cindex]
                                const lectureIndex = lectures.map(i => i.id).indexOf(lectureId);
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
                })
            }
        </div>
    )
}
export default Schedule;