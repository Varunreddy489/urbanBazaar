// import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      {/* <Sidebar /> */}
      <Home />
      <Toaster />
    </div>
  );
};

export default App;
