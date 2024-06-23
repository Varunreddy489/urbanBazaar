import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div className="flex" >
     <Sidebar/>
     <Dashboard/>
    </div>
  );
};

export default Home;
