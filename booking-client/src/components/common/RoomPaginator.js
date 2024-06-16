

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    return (
        <>
            <nav>
                <ul className="pagination,justify-content-center">
                    {pageNumbers.map((pageNumbers) => (
                        <li key={pageNumbers} className={`page-item ${currentPage === pageNumbers ? "active" : ""}`}>
                            <button onClick={() => onPageChange(pageNumbers)} className="page-link">
                                {pageNumbers}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
export default RoomPaginator