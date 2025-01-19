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
  // Function to generate page numbers with ellipses
  const generatePages = () => {
    const visiblePages = [];
    const range = 2; // Show 2 pages before and after the current page
    const startPage = Math.max(2, currentPage - range);
    const endPage = Math.min(totalPages - 1, currentPage + range);

    // Handle left ellipsis
    visiblePages.push(1);
    if (startPage > 2) {
      visiblePages.push('...');
    }

    // Add the pages in the range
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    // Handle right ellipsis
    if (endPage < totalPages - 1) {
      visiblePages.push('...');
    }
    if (totalPages > 1) visiblePages.push(totalPages);

    return visiblePages;
  };

  const pages = generatePages();

  return (
    <nav aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        {/* Previous Button */}
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

        {/* Page Numbers */}
        {pages.map((page, index) =>
          page === '...' ? (
            <li key={index} className="px-4 py-2">...</li>
          ) : (
            <li key={page}>
              <button
                onClick={() => onPageChange(Number(page))}
                className={`px-4 py-2 rounded-md ${page === currentPage
                  ? "bg-emerald-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* Next Button */}
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
