import React, { useRef, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";

const SearchSection = () => {
    const [inputValue, setInputValue] = useState("");
  console.log("inputValue:-", inputValue);
  return (
    <>
      <InputGroup className="mb-3" style={{ width: "300px", margin: "5px" }}>
        <Form.Control
          placeholder="Search Product/Code/Composition"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </InputGroup>
    </>
  );
};

export default SearchSection;
