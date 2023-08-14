import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Socials from "../components/Socials";
import { useGetProductsByCategoryQuery } from "../slices/productAPISlice";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Meta from "../components/Meta";

const CategoriesScreen = () => {
  const { category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsByCategoryQuery(category);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    ? products.slice(indexOfFirstProduct, indexOfLastProduct)
    : {};

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      {" "}
      <>
        {/* <Helmet>
          <title>ProCam Shop | Categories</title>
        </Helmet> */}
        <Meta title={categoryName + " | ProCam Shop"} />
        <Link className="btn btn-light my-3" to="/">
          Back
        </Link>
        <h2 className="mt-3">SHOP {category.toUpperCase()}</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {currentProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Row>
              {products ? (
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <></>
              )}
            </Row>
          </>
        )}
        <Row>
          <Socials />
        </Row>
      </>
    </>
  );
};

export default CategoriesScreen;
