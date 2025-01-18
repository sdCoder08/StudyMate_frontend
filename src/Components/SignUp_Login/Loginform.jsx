import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loginform = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      formType: 'login',
      email: data.email,
      password: data.password
    }
    if (data.email === "" && data.password === "") {
      toast.error('Please fill in the required fields.');
      return;
    }
    else if (!/\S+@\S+\.\S+/.test(data.email)) {
      toast.error('Email is not valid.');
      return;
    }

    await axios
      .post(
        'https://backend-3282.onrender.com/user/auth',
        userInfo
      )
      .then(
        (response) => {
          if (response.data && response.data.userId) {
            sessionStorage.setItem('userId', response.data.userId);
            // toast.success('signup successful..')
            toast.success(response.data.message);
            window.location.href = '/home';
          }
        })
      .catch(
        (error) => {
          if (error.response) {
            console.log(error)
            toast.error(error.response.data.message);
          }
        }
      )
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <input type="hidden" name="formType" value="login" />

          <input type="text" name="email" placeholder="Email" {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}

          <input type="password" name="password" placeholder="Password" {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} closeOnClick pauseOnHover />
    </>
  );
};

export default Loginform;
