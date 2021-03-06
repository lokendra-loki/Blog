import React, { useContext } from "react";
import { registerSchema } from "./formValidationSchema";
import axios from "axios";
import "./register.css";
import { Context } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { useFormik } = require("formik");

function Register() {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const notifySuccess = () =>
    toast.success("Register Successful", { theme: "colored" }, {});

  const onSubmit = async (values, actions) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      await new Promise((resolve) => setTimeout(resolve, 1000)); //wait 1 sec
      actions.resetForm();
      navigate("/");
      notifySuccess();
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      toast.error("Username & Email must be unique", { theme: "colored" });
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="form">
      <span className="RegisterLarge">Register .</span>
      <label htmlFor="username" className="registerInputLabel">
        Username
      </label>
      <input
        type="text"
        id="username"
        placeholder="Username"
        value={values.username}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur} //blur when leave the input
        className={
          errors.username && touched.username ? "input-error" : "registerInputs"
        }
      />
      {errors.username && touched.username && (
        <p className="error">{errors.username}</p>
      )}

      <label htmlFor="email" className="registerInputLabel">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        value={values.email}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.email && touched.email ? "input-error" : "registerInputs"
        }
      />
      {errors.email && touched.email && <p className="error">{errors.email}</p>}

      <label htmlFor="password" className="registerInputLabel">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={values.password}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.password && touched.password ? "input-error" : "registerInputs"
        }
      />
      {errors.password && touched.password && (
        <p className="error">{errors.password}</p>
      )}

      <label htmlFor="confirmPassword" className="registerInputLabel">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        placeholder="Confirm password"
        value={values.confirmPassword}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.confirmPassword && touched.confirmPassword
            ? "input-error"
            : "registerInputs"
        }
      />
      {errors.confirmPassword && touched.confirmPassword && (
        <p className="error">{errors.confirmPassword}</p>
      )}

      <button
        className="registerSubmitBut"
        type="submit"
        disabled={isSubmitting}
      >
        Register
      </button>
      <span className="alreadyAcc">Already have an account</span>
      <Link to="/login" className="link ">
        <button className="loginButton1">Login</button>
      </Link>
    </form>
  );
}

export default Register;
