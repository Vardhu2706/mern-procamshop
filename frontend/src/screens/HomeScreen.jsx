import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import BrandCarousel from "../components/Carousel.jsx";
import Socials from "../components/Socials.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
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
        {/* To-Do */}
      </Row>
      <Row>
        <Socials />
      </Row>
    </>
  );
};

export default HomeScreen;
