import { useEffect } from "react";

import { UserTypes } from "../types/types";
import Usercard from "../components/Usercard";
import useGetUsers from "../hooks/useGetUsers";
import Spinner from "../components/Spinner";

const Users = () => {
  const { loading, users, getUsers } = useGetUsers();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-black text-white text-center h-full ">
      <div className="flex">
        {loading ? (
          <Spinner />
        ) : (
          users?.map((user: UserTypes) => (
            <Usercard key={user._id} user={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
