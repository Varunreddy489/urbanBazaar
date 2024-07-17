import Products from "./Products";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <div className="bg-slate-900">
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
