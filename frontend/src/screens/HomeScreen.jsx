import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import BrandCarousel from "../components/Carousel.jsx";
import Socials from "../components/Socials.jsx";
import { useGetProductsQuery } from "../slices/productAPISlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title="Home | ProCam Shop" />
          <BrandCarousel />
          <h1>Top Rated</h1>
          <Row>
            {products &&
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
            <h1>Recently launched</h1>
            {products &&
              products
                .filter((product) => product.checkIsNew === true)
                .slice(0, 8)
                .map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
          </Row>
          <Row>
            <Socials />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
