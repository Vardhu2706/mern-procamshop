import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Socials from "../components/Socials.jsx";
import { useGetProductsQuery } from "../slices/productAPISlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Meta from "../components/Meta";

const SearchResultsScreen = () => {
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery(keyword);

  return (
    <>
      <Meta title="Search | ProCam Shop" />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Back
          </Link>
          <h1>Search Results for "{keyword}"</h1>
          <Row>
            {products[0] &&
              products
                .filter((product) => product.rating > 4)
                .slice(0, 8)
                .map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
          </Row>
          <Row>
            {products.length === 0 ? (
              <Message>
                No results found <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <></>
            )}
          </Row>
          <Row>
            <Socials />
          </Row>
        </>
      )}
    </>
  );
};

export default SearchResultsScreen;
