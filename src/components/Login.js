import { useFormik } from "formik";

import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LoginSchema } from "../schema/validation";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";

const initialValues = {
  email: "",
  password: "",
};
function Login() {
  const dispatch = useDispatch();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,

      onSubmit: (values, actions) => {
        console.log("values:-", values);

        const payload = { email: values.email, password: values.password };
        axios
          .post(
            "https://alkemapi.indusnettechnologies.com/api/employee/login",
            payload
          )
          .then((res) => {
            console.log(res)
            dispatch({ type: "LOGIN", payload: res.data.token })
          })
          .catch((errors) => {
            console.log(errors);
            actions.setErrors(errors.response.data.errors);
          });
      },
    });

  const Navigate = useNavigate();
  const LoggedData = useSelector((state) => state.isLoggedIng);
  console.log("LoggedData:", LoggedData);


  useEffect(() => {
    if (!LoggedData) {
      Navigate("/");
    } else {
      Navigate("/home");
    }
  }, [LoggedData]);

  return (
    <Container >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Inter your Login details</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {errors.email && touched.email ? (
          <p style={{ color: "red" }}>{errors.email}</p>
        ) : null}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {errors.password && touched.password ? (
          <p style={{ color: "red" }}>{errors.password}</p>
        ) : null}
        <Button type="submit">Log In</Button>
      
      </Form>
    </Container>
  );
}

export default Login;
