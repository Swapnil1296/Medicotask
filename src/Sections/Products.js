import axios from "axios";

import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Products = ({
  divCode,
  dist_id,
  cfaNumber,
  validateThree,
  clearField,
  clearData,
  valueForHolder,
  disabledOther,
}) => {
  // console.log("data in Products page:-", divCode, dist_id, cfaNumber);
  const [data, setData] = useState('');
   useEffect(() => {
     if (disabledOther) {
       setData('');
     }
   }, [disabledOther]);
   useEffect(() => {
     if (cfaNumber !== 0 && divCode !== 0 && dist_id !== 0 && !disabledOther) {
       handleData();
     }
   }, [cfaNumber, divCode, dist_id]);
  const Token = useSelector((state) => state.Auth);
  const handleData = () => {
    axios
      .get(
        `https://alkemapi.indusnettechnologies.com/api/product/all_product_list/E/${cfaNumber}?dist_id=${dist_id}&page=${1}&sv=&div_code=${divCode}&product_nm=`,
        {
          headers: {Authorization: `Bearer ${Token}`},
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
 

  // useEffect(() => {
  //   if (clearField) {
  //     setData('');
  //   }
  // }, [clearField]);
  // console.log("clearField in products:-",clearField);
 
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
