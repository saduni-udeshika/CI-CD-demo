import React, {useState, useEffect} from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../../utils/APIRoutes';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

    useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
    }, []);
  
  const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
  }
  const handleSubmit = async (event) => {
    console.log("In validation", registerRoute);
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
    const { password, confirmPassword, username, email } = values;
    if (username.length < 3) {
      toast.error("Username should be grater than three characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should have minimum eight characters.", toastOptions);
      return false;
    }else if(password !== confirmPassword) {
      toast.error("Password and confirm password did not match.", toastOptions);
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
          <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
          <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
          <input type="passowrd" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
          <input type="passowrd" placeholder="Confirm Password" name="confirmPassword" onChange={(e) => handleChange(e)} />
          
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}