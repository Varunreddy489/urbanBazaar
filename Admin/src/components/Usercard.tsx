import { UserTypes } from "../types/types";

const Usercard = ({ user }: { user: UserTypes }) => {
  return (
    <div className="m-4 p-4 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Name
            </th>
            <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Email
            </th>
            <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Gender
            </th>
            <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Username
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              {user.name}
            </td>
            <td className="py-2 px-4 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </td>
            <td className="py-2 px-4 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              {user.gender}
            </td>
            <td className="py-2 px-4 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              {user.username}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4">
        {user.orders && user.orders.length > 0 ? (
          <table className="min-w-full bg-white dark:bg-gray-800 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Street
                </th>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Pincode
                </th>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Locality
                </th>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  City
                </th>
                <th className="py-2 px-4 border-b dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map((order, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    {order.address.streetName}
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    {order.address.pincode}
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    {order.address.localityName}
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    {order.address.city}
                  </td>
                  <td className="py-2 px-4 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    {order.address.state}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Usercard;
