import { useState } from "react";
import React from 'react';
import Logo from './logo.js'
import './style.css';

export default function Login(props) {
  const [disabled, changeDisabled] = useState(false);
	const [formValid, changeFormValid] = useState(false);
		const [formData, changeFormData] = useState({
		username: '',
		password: '',
	});

	function handleChange(e) {
		const newFormData = ({ ...formData, [e.target.name]: e.target.value }) ;
		const allPresent = Object.values(newFormData).reduce((acc, cur) => acc && cur, true) ;
		changeFormValid(allPresent) ;
		changeFormData(formData => ({ ...formData, [e.target.name]: e.target.value }));
	}

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
      <main className="login-container">
        <Logo />
        <br />
        <form onSubmit={(e) => submitHandler(e)}>
          Username
          <br />
          <input name="username" value={formData.name} onChange={handleChange} className="input-box" disabled={disabled} />
          <br />
          Password
          <br />
          <input type="password" value={formData.password} onChange={handleChange} name="password" className="input-box" disabled={disabled} />
          <br />
          <br />
          <button type="submit" className="submit-btn" disabled={disabled || !formValid}>
            {" "}
            Submit{" "}
          </button>
        </form>
      </main>
    </>
  );
}