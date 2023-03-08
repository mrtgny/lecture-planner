import Lectures from "components/Lectures";
import Planner from "components/Planner";
import { NextPage } from "next/types";

const Home: NextPage = () => {
  return (
    <div className="min-w-[100vw] min-h-[100vh]">
      <Lectures />
      <Planner />
    </div>
  );
};

export default Home;
