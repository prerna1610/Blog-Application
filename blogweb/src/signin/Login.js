import React, { useState, useEffect } from "react";

import axios from "axios";
import "../dashboard/components/header/Profile/profile.css"

import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const error = validateForm(user);
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  
    if (Object.keys(error).length === 0) {
      try {
        // Send a POST request to the backend login endpoint
        const response = await axios.post('http://localhost:8080/login', user);
        const foundUser = response.data;
  
        if (foundUser) {
          localStorage.setItem('jwtToken',foundUser.jwtToken)
          alert("Login successful");
  
          // Update the user state or perform any necessary actions
          setUserState(foundUser);
  
          // Navigate to the desired page
          navigate("/home");
        } else {
          console.log("Invalid email or password");
        }
      } catch (error) {
        console.error(error);
        // Handle any errors from the Axios request
      }
    }
  };

  

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
    }
  }, [isSubmit, navigate, formErrors]);
  return (
    <section className="color vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className=" card log text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-2 mt-md-2 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                    <input placeholder="Email" value={user.email} onChange={changeHandler} type="email" id="typeEmail" name="email" className="form-control form-control-lg" />
                    <span className="text-danger">{formErrors.email}</span>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input placeholder="Password" value={user.password} onChange={changeHandler} type="password" id="typePassword" name="password" className="form-control form-control-lg" />
                    <span className="text-danger">{formErrors.password}</span>
                  </div>


                  <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={loginHandler}>Login</button>

                  <div className="mt-3">
                    <p className="mb-0"><NavLink to="/signup">Not yet registered? Register Now</NavLink></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};
export default Login;