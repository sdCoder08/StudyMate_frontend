import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      formType: 'signup',
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.ConfirmPassword
    }
    // Basic validation
    if (!/^[A-Za-z\s]+$/.test(userInfo.name)) {
      toast.error('Name field only allows character data.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      toast.error('Email is not valid.');
      return;
    }
    if (userInfo.password.length < 8 || userInfo.password.length > 15 ||
      !/[A-Z]/.test(userInfo.password) || !/[!@#$%^&*]/.test(userInfo.password)) {
      toast.error('Password should contain at least one capital letter and special character and be 8-15 characters long.');
      return;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error('Passwords do not match.');
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
            toast.success('signup successful..')
            window.location.href = '/home';
          }
        })
      .catch(
        (error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          }
        })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="SignUp-form-group">
          <input type="hidden" name="formType" value="signup" />
          <div className="input">
            <input type="text" name="name" placeholder="Name" {...register("name", { required: true })} />
            {errors.name && <span>This field is required</span>}
          </div>

          <div className="input">
            <input type="text" name="email" placeholder="Email" {...register("email", { required: true })} />
            {errors.email && <span>This field is required</span>}
          </div>

          <div className="input">
            <input type="password" name="password" placeholder="Password" {...register("password", { required: true })} />
            {errors.password && <span>This field is required</span>}
          </div>

          <div className="input">
            <input type="Password" name="ConfirmPassword" placeholder="Confirm Password" {...register("ConfirmPassword", { required: true })} />
            {errors.ConfirmPassword && <span>This field is required</span>}
          </div>
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} closeOnClick pauseOnHover />
    </>
  );
};

export default SignUp;
