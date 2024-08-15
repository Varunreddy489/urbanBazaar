/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import useGetUsers from "../hooks/useGetUsers";
import { MdOutlineDelete } from "react-icons/md";

const UsersTable = () => {
  const { loading, users, getUsers } = useGetUsers();

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-black text-white h-full p-10">
      <h1 className="text-5xl mb-10">Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md">Email</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Gender
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Username
              </th>
              <th className="border border-slate-600 rounded-md">Address</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.name}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.email}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {user.gender}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {user.username}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.orders && user.orders.length > 0 ? (
                    <ul>
                      {user.orders.map((order, index) => (
                        <li key={index} className="mb-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.address.streetName},{" "}
                            {order.address.localityName}, {order.address.city},{" "}
                            {order.address.state}, {order.address.pincode}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No address available
                    </p>
                  )}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <button>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </button>
                    <button>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
