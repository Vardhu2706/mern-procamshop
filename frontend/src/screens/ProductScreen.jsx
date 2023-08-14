import { useParams, useNavigate } from "react-router-dom";
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
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Product from "../components/Product";
import Socials from "../components/Socials";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetProductsQuery,
} from "../slices/productAPISlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

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
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const {
    data: newProducts,
    loadingNewProducts,
    errorLoadingNewProducts,
  } = useGetProductsQuery();

  const addToCarthandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Meta title={`${product.name} Search | ProCam Shop`} />
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
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCarthandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer Review</h2>
                  {loadingReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select ...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                        <Button
                          disabled={loadingReview}
                          type="submit"
                          variant="primary w-100"
                        >
                          Submit
                        </Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Sign In</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <h1>Recently launched</h1>
            {newProducts &&
              newProducts
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

export default ProductScreen;
