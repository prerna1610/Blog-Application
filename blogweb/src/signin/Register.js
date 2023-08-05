import React, { useState, useEffect } from "react";

import "./App.css";
import { signUp } from "../service/user-service";
import { NavLink, useNavigate } from "react-router-dom";
import "../dashboard/components/header/Profile/profile.css"
const Register = () => {

  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    name: "",
    username: "",
    address: "",
    state: "",
    phone: "",
    zip: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // const changeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setUserDetails({
  //     ...user,
  //     [name]: value,
  //   });
  // };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };




  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\d{10}$/;

    if (!values.name) {
      error.name = "Name is required";
    }
    if (!values.username) {
      error.username = "Username is required";
    }
    if (!values.phone) {
      error.phone = "Phone Number is required";
    } else if (!phoneRegex.test(values.phone)) {
      error.phone = "incorrect format"
    }
    if (!values.address) {
      error.address = "Address is required";

    }
    if (!values.state) {
      error.state = "State is required";

    }
    if (!values.zip) {
      error.zip = "Zip code is required";

    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };


  

  const [showAlert, setShowAlert] = useState(false);
  const signupHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Check if the email already exists
      if (emailAlreadyExists(user.email)) {
        alert("This email has already been used");
        return;
      }
     

      // Save user details in Local Storage
      const newUser = {
        name: user.name,
        username: user.username,
        phone: user.phone,
        email: user.email,
        state: user.state,
        zip: user.zip,
        address: user.address,
        password: user.password,
        confirmPassword: user.cpassword,
      };

      
      signUp(newUser)
        .then(() => {
          alert("Registration successful");
          navigate('/login');
        })
        .catch((error) => {
          console.error(error);
          
        });

         
         if (usernameAlreadyExists(user.username)) {
          alert("Username already exists"); 
          setShowAlert(true); 
          return;

          setShowAlert(false);
        }
    }
  };

  const emailAlreadyExists = (email) => {
   
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const existingEmails = storedUsers.map((user) => user.email);
    return existingEmails.includes(email);
  };
  const usernameAlreadyExists = (username) => {
    
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const existingUsernames = storedUsers.map((user) => user.username);
    return existingUsernames.includes(username);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
    }
  }, [formErrors]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserDetails((prevUser) => ({
        ...prevUser,
        username: storedUser.username,
      }));
    }
  }, []);

  return (
    <section className="gradients-custom">
      <div className="container py-5 h-100 w-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card log text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-2 mt-md-2 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <p className="text-white-50 mb-5">Please enter your information!</p>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="nameInput">Name</label>
                    <input className="form-control form-control-lg" type="text" id="fname" name="name" placeholder="First Name" value={user.name}
                      onChange={changeHandler} />
                    <span className="text-danger">{formErrors.name}</span>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="nameInput">Username</label>
                    <input className="form-control form-control-lg" type="text" id="username" name="username" placeholder="Username" value={user.username}
                      onChange={changeHandler} />
                    <span className="text-danger">{formErrors.username}</span>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="nameInput">Phone Number</label>
                    <input className="form-control form-control-lg" type="text" id="phone" name="phone" placeholder="Phone" value={user.phone}
                      onChange={changeHandler} />
                    <span className="text-danger">{formErrors.phone}</span>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="address" value={user.address}
                      onChange={changeHandler} />
                    <span className="text-danger">{formErrors.address}</span>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <label htmlfor="validationCustom04" className="form-label">State</label>
                    

                    <select className="form-select" id="validationCustom04" name="state" value={user.state}
                      onChange={changeHandler} required>
                      <option selected disabled value="">Choose...</option>
                      <option>Andhra Pradesh</option>
                      <option>Arunachal Pradesh</option>
                      <option>Assam</option>
                      <option>Bihar</option>
                      <option>Chhattisgarh</option>
                      <option>Goa</option>
                      <option>Gujarat</option>
                      <option>Haryana</option>
                      <option>Himachal Pradesh</option>
                      <option>Jharkhand</option>
                      <option>Karnataka</option>
                      <option>Kerala</option>
                      <option>Madhya Pradesh</option>
                      <option>Maharashtra</option>
                      <option>Manipur</option>
                      <option>Meghalaya</option>
                      <option>Mizoram</option>
                      <option>Nagaland</option>
                      <option>Odisha</option>
                      <option>Punjab</option>
                      <option>Rajasthan</option>
                      <option>Sikkim</option>
                      <option>Tamil Nadu</option>
                      <option>Telangana</option>
                      <option>Tripura</option>
                      <option>Uttar Pradesh</option>
                      <option>Uttarakhand</option>
                      <option>West Bengal</option>
                      <option>Andaman and Nicobar Islands</option>
                      <option>Chandigarh</option>
                      <option>Dadra and Nagar Haveli and Daman and Diu</option>
                      <option>Delhi</option>
                      <option>Lakshadweep</option>
                      <option>Puducherry</option>
                    </select>
                    <span className="text-danger">{formErrors.state}</span>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <label htmlFor="validationCustom05" className="form-label">Zip code</label>
                    <input type="text" className="form-control" id="validationCustom06" name="zip" value={user.zip}
                      onChange={changeHandler} required />

                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typeEmail">Email</label>
                    <input placeholder="Email" value={user.email} onChange={changeHandler} type="email" name="email" id="email" className="form-control form-control-lg" />
                    <span className="text-danger">{formErrors.email}</span>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePassword">Password</label>
                    <input placeholder="Password" value={user.password} onChange={changeHandler} type="password"
                      name="password"
                      id="password" className="form-control form-control-lg" />
                    <span className="text-danger">{formErrors.password}</span>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePassword">Confirm Password</label>
                    <input placeholder="Confirm Password" value={user.cpassword} onChange={changeHandler} type="password" id="typePassword" name="cpassword" className="form-control form-control-lg" />
                    <span className="text-danger">{formErrors.cpassword}</span>
                  </div>


                  <button className="btn btn-outline-success btn-lg px-5" type="submit" onClick={signupHandler}>Register</button>

                  <div className="mt-3">
                    <p className="mb-0"><NavLink to="/login">Already registered? Login</NavLink></p>
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
export default Register;