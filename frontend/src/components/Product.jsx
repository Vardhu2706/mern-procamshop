// Importing Helpers
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";
import Rating from "./Rating";

// Functional Component
const Product = ({ product }) => {
  const price = product.price;

  return (
    <Card className="my-3 p-3 rounded">
      {/* Product Image */}
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        {/* Product Title */}
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* Product Rating */}
        <Card.Text as="div">
        <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        {/* Product Price */}
        <Card.Text as="h3">${price.toLocaleString("en-US")}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Default Export
export default Product;
