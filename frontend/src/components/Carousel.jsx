// Brand Carousel

// Importing Helpers
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { categories_data } from "../data";

const BrandCarousel = () => {
  return (
    <div>
      <Carousel pause="hover" className="bg-dark my-3" fade={true}>
        {categories_data.map((category) => (
          <Carousel.Item key={category.id}>
            <Link to={category.link}>
              <Image
                src={category.image}
                alt={category.name}
                fluid
                style={{ width: "100%" }}
              />
              <Carousel.Caption
                className="carousel-caption"
                style={{ color: "white" }}
              >
                <h1 style={{ color: "white" }}>{category.caption}</h1>
              </Carousel.Caption>
              <Carousel.Caption className="carousel-caption light"></Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BrandCarousel;
