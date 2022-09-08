import Lectures from 'components/Lectures';
import Schedule from 'components/Schedule';
import { NextPage } from 'next/types';

const Home: NextPage = () => {
    return (
        <div className="min-w-[100vw] min-h-[100vh]" >
            <Lectures />
            <Schedule />
        </div>
    )
}


export default Home;