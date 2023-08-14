import { Link } from "react-router-dom";

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination  justify-content-center">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={"page-item " + (number === currentPage ? "active" : "")}
          >
            <Link
              onClick={() => {
                paginate(number);
                window.scrollTo(0, 0);
              }}
              to="#"
              className="page-link active"
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
