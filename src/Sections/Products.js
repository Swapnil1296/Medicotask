import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Products = ({
  divCode,
  dist_id,
  cfaNumber,

  disableThree,
  valueForHolder,
  disabledOther,
  clearProThree,
}) => {
  // console.log("data in Products page:-", divCode, dist_id, cfaNumber);
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");
  console.log("inputValue:-", inputValue);
  const handleValue = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (disabledOther || disableThree || clearProThree) {
      setData("");
    }
  }, [disabledOther, disableThree, clearProThree]);

  const Token = useSelector((state) => state.Auth);
  const handleData = () => {
    axios
      .get(
        `https://alkemapi.indusnettechnologies.com/api/product/all_product_list/E/${cfaNumber}?dist_id=${dist_id}&page=${1}&sv=&div_code=${divCode}&product_nm=`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
      .then(function (response) {
        // console.log("response data in Products Page:-", response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchData = (value = "", cfaNumber, dist_id, divCode) => {
    axios
      .get(
        `https://alkemapi.indusnettechnologies.com/api/product/all_product_list/E/${cfaNumber}?dist_id=${dist_id}&page=${1}&sv=&div_code=${divCode}&product_nm=${value}`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
      .then(function (response) {
        // console.log("response data in Products Page:-", response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const debounce = (fn, delay) => {
    // console.log(fn)
    let timerId;
    return (...args) => {
      // console.log(args);
      timerId && clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };
  const debouncedHandler = useCallback(debounce(searchData, 1500), []);

  useEffect(() => {
    console.log("api hit");
    if (valueForHolder !== "") {
      handleData();
      console.log("api hit again");
    }
    if (valueForHolder === "") {
      setData("");
    }
  }, [valueForHolder, divCode]);

  return (
    <>
      <InputGroup className="mb-3" style={{ width: "300px", margin: "5px" }}>
        <Form.Control
          placeholder="Search Product/Code/Composition"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            debouncedHandler(e.target.value, cfaNumber, dist_id, divCode);
          }}
        />
      </InputGroup>
      {data &&
        data.map((item, i) => (
          <Row className="border border-primary m-2" key={i}>
            <Col>
              <span className="fw-bold text-primary">{item.product_name}</span>
              <span className="fw-bold">({item.pro_code})</span>
            </Col>
          </Row>
        ))}
    </>
  );
};

export default Products;
