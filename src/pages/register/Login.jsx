import React, {useEffect, useState} from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../../utils/APIRoutes';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
  }

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (event) => {
    console.log("In validation", loginRoute);
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        //pass the user information to local storage

        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };

  //validations
  const handleValidation = () => {
    //destucture 
    const { password, username } = values;
    if (password === "") {
      toast.error("Username and password required")
      return false;
    }
    else if (username.length === "") {
      toast.error("Username and password required.", toastOptions);
      return false;
    }
    return true;
  }
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className='form-container'>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <h1>Chat APP</h1>
          </div>
          <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} min="3"/>
          <input type="passowrd" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
          
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}
