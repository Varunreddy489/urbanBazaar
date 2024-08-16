import { FC } from "react";
import Spinner from "./Spinner";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  loading?: boolean; // Optional, if you want to show a spinner during page change
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
  loading,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
        <h1>Loading</h1>
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="p-4">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <a
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index + 1}>
              <a
                href="#"
                onClick={() => handlePageChange(index + 1)}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${
                  currentPage === index + 1
                    ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                aria-current={currentPage === index + 1 ? "page" : undefined}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
