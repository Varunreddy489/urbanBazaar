import { CiLogout } from "react-icons/ci";
import useLogout from "../hooks/useLogout";

const Logout = () => {
  const { loading, logout } = useLogout();
  return (
    <div className=" flex text-center">
      {!loading ? (
        <CiLogout
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      <span className="ml-2">{loading ? "Logging out..." : "Logout"}</span>
    </div>
  );
};

export default Logout;
