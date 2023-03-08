import { useState } from "react";

export default function Login(props) {
const [disabled, changeDisabled] = useState(false) ;

	const submitHandler = async (e) => {
		e.preventDefault();
		changeDisabled(true);

		props.client.login(e.target.username.value, e.target.password.value)
		.then((response) => {
			changeDisabled(false);
			props.login(response.data.token);
		})
		.catch((err) => {
			console.error(err) ;
			alert("an error occursed, please try again");
			changeDisabled(false);
		});
	};

	return (
    <>
      Login
      <br />
      <form onSubmit={(e) => submitHandler(e)}>
        username
        <br />
        <input type="text" name="username" disabled={disabled} />
        <br />
        password
        <br />
        <input type="password" name="password" disabled={disabled} />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}