import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <form className="flex items-center max-w-md mt-4 mx-auto w-full">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <CiSearch className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Products in a go . . ."
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
