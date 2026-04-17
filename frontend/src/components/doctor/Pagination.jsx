export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="d-flex justify-content-center mt-4 gap-2">

            {/* Prev */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="pagination-btn"
            >
                ‹
            </button>

            {/* Pages */}
            {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;

                return (
                    <button
                        key={i}
                        onClick={() => onPageChange(page)}
                        className={`pagination-btn ${isActive ? "active" : ""}`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="pagination-btn"
            >
                ›
            </button>

        </div>
    );
}