import { useEffect } from "react";
import useGetUsers from "../hooks/useGetUsers";

const Dashboard = () => {
  const { users, getUsers } = useGetUsers();

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div className=" bg-gray-900 text-white p-4 w-full h-screen ">
      <h1 className="text-4xl font-semibold m-4"> Dashboard</h1>

      {/* orders */}
      <div className=" flex flex-wrap justify-between ">
        <div className="max-w-sm p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Total Orders
          </h5>
          <h1 className="mb-3 text-5xl font-normal text-gray-500 dark:text-gray-400">
            orders.count $
          </h1>
        </div>

        {/* total sales */}

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Total Revenue
          </h5>
          <h1 className="mb-3 text-5xl font-normal text-gray-500 dark:text-gray-400">
            profits $
          </h1>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Total Users
          </h5>
          <h1 className="mb-3 text-5xl font-normal text-gray-500 dark:text-gray-400">
          {users?.length ?? 0}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
