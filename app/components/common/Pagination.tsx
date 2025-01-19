import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

type CustomPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function CustomPagination({
  totalPages,
  currentPage,
  onPageChange,
}: CustomPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-md ${page === currentPage
                  ? "bg-emerald-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
