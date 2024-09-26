import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  simple?: boolean;
  rounded?: boolean;
  icons?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  simple = false,
  rounded = false,
  icons = false,
  className,
}) => {
  const MAX_PAGES_TO_SHOW = 3;

  const generatePages = (): (number | null)[] => {
    if (totalPages <= MAX_PAGES_TO_SHOW) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftLimit = Math.max(
      currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2),
      1,
    );
    const rightLimit = Math.min(leftLimit + MAX_PAGES_TO_SHOW - 1, totalPages);

    const pages: (number | null)[] = [];

    if (leftLimit > 2) {
      pages.push(1);
      pages.push(2);
      if (leftLimit > 1) {
        pages.push(null);
      }
    }

    for (let i = leftLimit; i <= rightLimit; i++) {
      pages.push(i);
    }

    if (rightLimit < totalPages) {
      if (rightLimit < totalPages - 1) {
        pages.push(null);
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number): void => {
    onPageChange(page);
  };

  const pages = generatePages();

  return (
    <ul className="flex items-center space-x-2">
      <li>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`h-8 w-8 rounded-lg border flex-center-center hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-50 ${
            currentPage === 1 ? "pointer-events-none select-none" : ""
          }`}
        >
          {icons ? <FiChevronLeft /> : "Prev"}
        </button>
      </li>

      {!simple && (
        <>
          {pages.map((page, index) => (
            <li key={index}>
              {page === null ? (
                <span className="pointer-events-none select-none">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(page)}
                  className={`grid h-8 w-8 place-items-center rounded-lg border hover:bg-accent/80 ${
                    className || ""
                  } ${rounded ? "rounded-full" : ""} ${
                    page === currentPage
                      ? "border-transparent !bg-brand text-white"
                      : ""
                  }`}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
        </>
      )}

      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`h-8 w-8 rounded-lg border flex-center-center hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-50 ${
            currentPage === totalPages ? "pointer-events-none select-none" : ""
          }`}
        >
          {icons ? <FiChevronRight /> : "Next"}
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
