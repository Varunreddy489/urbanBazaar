import SearchBar from "../../components/SearchBar";
import Products from "./Products";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-900">
      <SearchBar />
      <Products />
    </div>
  );
};

export default Home;
