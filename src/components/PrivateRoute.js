import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { Component } = props;
  const LoggedData = useSelector((state) => state.isLoggedIng);
  console.log("LoggedData: ", LoggedData);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handledLogOut = () => {
    window.localStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    let login = LoggedData;
    if (!login) {
      Navigate("/");
    }
  }, [LoggedData]);

  return (
    <>
      <Row className="d-flex justify-content-center align-items-center border border-1 border-dark bg-black " style={{height:"60px"}}>
        <Col>
          <Button className="btn btn-danger m-3" onClick={handledLogOut}>
            LogOut
          </Button>
        </Col>
      </Row>
      <Component />
    </>
  );
};

export default PrivateRoute;
