import React, { useState } from 'react'
import './Register.scss'
import { Link, Redirect } from "react-router-dom"; 
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Register() {
  const [redirect, setRedirect] = useState(false); 
   const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      fetch("http://localhost:4000/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then(() => {
          setRedirect(true); // Redirect state'ini true yapın
        })
        .catch(function (res) {
          console.log(res);
        });

      setSubmitting(false);
    }, 400);
  };

  // Redirect state true olduğunda /login sayfasına yönlendirme yapacak JSX
  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
   <>
    <HelmetProvider>
      <Helmet>
        <title>Register Page</title> 
      </Helmet>
  </HelmetProvider>

  <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        })}
        onSubmit={handleSubmit} // onSubmit fonksiyonunu güncellenmiş halde kullanın
      >
        <div className="register-container">
          <Form className="register-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="text" />
              <ErrorMessage name="password" />
            </div>

            <button type="submit" className="register-button">
              Submit
            </button>

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </div>
      </Formik>
   </>
  )
}

export default Register