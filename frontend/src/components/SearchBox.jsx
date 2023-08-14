// Search Box Component

// Importing Helpers
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

// Functional Component
const SearchBox = () => {
  // State variables
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();

    // Check if keyword is not empty
    if (keyword.trim()) {
      navigate("/search/" + keyword);
    }
  };

  // Return
  return (
    //   Form
    <Form onSubmit={submitHandler} className="d-flex">
      {/* Search Field */}
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      {/* Search Button */}
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

// Export Default
export default SearchBox;
