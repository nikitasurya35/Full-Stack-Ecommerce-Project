import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;       // 0-based (matches Spring's page param)
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Returns page indices (0-based) or "…" strings
function getPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages: (number | "…")[] = [0];

  if (current > 3) pages.push("…");

  const start = Math.max(1, current - 1);
  const end = Math.min(total - 2, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 4) pages.push("…");

  pages.push(total - 1);
  return pages;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 py-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300
                   text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors
              ${p === currentPage
                ? "bg-blue-700 text-white border border-blue-700"
                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p + 1}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300
                   text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;