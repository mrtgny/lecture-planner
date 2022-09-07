import Lectures from 'components/Lectures';
import Schedule from 'components/Schedule';
import { NextPage } from 'next/types';

const Home: NextPage = () => {
    const onDoubleClick = () => {
        localStorage.removeItem("lectures");
        localStorage.removeItem("values");
    }
    return (
        <div className="min-w-[100vw] min-h-[100vh]" onDoubleClick={onDoubleClick}>
            <Lectures />
            <Schedule />
        </div>
    )
}


export default Home;