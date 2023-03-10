import { useState } from "react";
import React from 'react';
import Logo from './logo.js'
import './style.css';

export default function Login(props) {
  const [disabled, changeDisabled] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    changeDisabled(true);

    props.client.login(e.target.username.value, e.target.password.value)
      .then((response) => {
        changeDisabled(false);
        props.login(response.data.token);
      })
      .catch((err) => {
        console.error(err);
        changeDisabled(false);
      });
  };
  return (
    <>
      <div className="login-container">
        <Logo />
        <br />
        <form onSubmit={(e) => submitHandler(e)}>
          Username
          <br />
          <input type="text" name="username" className="input-box" disabled={disabled} />
          <br />
          Password
          <br />
          <input type="password" name="password" className="input-box" disabled={disabled} />
          <br />
          <br />
          <button type="submit" className="submit-btn" disabled={disabled}>
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </>
  );
}