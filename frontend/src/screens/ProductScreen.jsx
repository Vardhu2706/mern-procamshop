import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Carousel,
  Table,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Product from "../components/Product";
import Socials from "../components/Socials";
import axios from "axios";
import { useEffect, useState } from "react";

const FeaturesTable = ({ features }) => {
  return (
    <>
      <Table striped bordered size="sm" responsive className="table-responsive">
        <tbody>
          {Object.entries(features).map((feature) => {
            return (
              <tr key={feature}>
                {feature[0].length !== 1 ? (
                  <td>
                    <h6 className="feat">{feature[0]}</h6>
                  </td>
                ) : (
                  <></>
                )}
                <td>
                  <h6>{feature[1]}</h6>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

const ProductScreen = () => {
  const [product, setProduct] = useState({});

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
      <Row>
        <h1>{product.name}</h1>
        <Col md={5}>
          {product.showcase ? (
            <Carousel pause="hover" className="bg-light carousel">
              {product.showcase.map((path) => (
                <Carousel.Item key={path} className="carousel-item">
                  <Image
                    src={path}
                    alt={product.name}
                    fluid
                    className="d-block w-100"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <></>
          )}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            {/* Rating */}
            {/*  */}
            {/* Description */}
            <ListGroup.Item>
              <h5>Features:</h5>
              {/* <p>{product.features}</p> */}
              {product.features ? (
                <FeaturesTable features={product.features} />
              ) : (
                <></>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="bn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row></Row>
      {/* <Row>
        <h4>Customers Also Viewed</h4>
        {products
          .filter((item) => item._id !== product._id)
          .slice(4, 8)
          .map((item) => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={item} />
            </Col>
          ))}
      </Row> */}
      <Row>
        <h4>Featured</h4>
      </Row>
      <Row>
        <h4>Your recently viewed items</h4>
      </Row>
      <Row>
        <Socials />
      </Row>
    </>
  );
};

export default ProductScreen;
