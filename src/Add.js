import { useState } from "react";

export default function Add(props) {

	const [disabled, changeDisabled] = useState(false) ;

	const submitHandler = (e) => {
		e.preventDefault() ;
		changeDisabled(true) ;

		let result ;

		if (props.currentAd) {
			result = props.client.updateAd(
				props.currentAd._id,
				e.target.adName.value,
				e.target.adPrice.value
			) ;
		}
		else {
			result = props.client.addAd(
				e.target.adName.value,
				e.target.adPrice.value
			) ;
		}

		result.then(() => {
			changeDisabled(false) ;
			document.getElementById("addForm").reset() ;
			props.refreshList() ;
		}).catch(err => {
			changeDisabled(false) ;
			alert("You messed up big time pal") ;
		}) ;
	} ;


	return (
		<div>
			<form onSubmit={submitHandler} id="addForm">
				Name:{" "}
				<input name="adName" 
					defaultValue={props.currentAd?.name}
					disabled={disabled}
				/>
				<br />
				Price:{" "}
				<input name="adPrice" 
					defaultValue={props.currentAd?.price}
					disabled={disabled}
				/>
				<br />
				<button type="submit" disabled={disabled}>
					Add advert
				</button>
			</form>
		</div>
	)
}