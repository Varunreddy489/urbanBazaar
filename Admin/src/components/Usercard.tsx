import { UserTypes } from "../types/types";

const Usercard = ({ user }: { user: UserTypes }) => {
  return (
    <div className="flex space-x-5 space-y-2.5">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="p-8 rounded-t-lg"
            src={user.profilePic}
            alt={`Profile picture of ${user.name}`}
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight capitalize text-gray-900 dark:text-white">
              {user.name}
            </h5>
          </a>
          <div className="flex items-center mt-2.5 mb-2">
            <p className="text-gray-700 dark:text-gray-400">{user.email}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg capitalize font-bold text-gray-900 dark:text-white">
              Gender: {user.gender}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Username: {user.username}
            </span>
          </div>
          {/* Additional Features */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {/* Joined: {new Date(user.createdAt).toLocaleDateString()} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
