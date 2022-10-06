import axios from "axios";

import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Products = ({
  divCode,
  dist_id,
  cfaNumber,
  validateThree,
  clearField,
  clearData,
  valueForHolder,
}) => {
  // console.log("data in Products page:-", divCode, dist_id, cfaNumber);
  const [data, setData] = useState("");
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
  useEffect(() => {
    if (!validateThree) {
      handleData();
    }
  }, [cfaNumber, divCode, dist_id]);
  //   handleData();
  useEffect(() => {
    if (clearField) {
      setData(null);
    }
  }, [clearField]);
  // console.log("clearField in products:-",clearField);
  useEffect(() => {
    if (clearData) {
      setData("");
    }
  }, [clearData]);
  return (
    <>
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
