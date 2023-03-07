import { useEffect, useState } from "react";
import AddUpdateDel from "./AddUpdateDel";

export default function Dashboard(props) {
	const [ads, changeAds] = useState([]) ;
	const [current, changeCurrent] = useState(undefined) ;
	
	const refreshList = () => {
		props.client.getAds().then(response => {
			changeAds(response.data) ;
		}) ;
	}

	const removeAdvert = (id) => {
		props.client.removeAd(id).then(() => refreshList()) ;
	}

	const updateAdvert = (ad) => {
		changeCurrent(ad) ;
	}

	useEffect(() => {
		refreshList() ;
	}, []) ;


	const buildRows = () => {
		return ads?.map(ad => {
			return (
				<tr key={ad._id}>
					<td>{ad.name}</td>
					<td>{ad.price}</td>
					<td>
						<button onClick={() => updateAdvert(ad)}>Edit</button>
						<button onClick={() => removeAdvert(ad._id)}>Delete</button>
					</td>
				</tr>
			)
		})
	};


	return (
		<div>
			Dashboard
			<table>
				<thead>
					<tr>
						<th>Advert name</th>
						<th>Advert price</th>
					</tr>
				</thead>
				<tbody>
					{buildRows()}
				</tbody>
			</table>
			<br /><br /><br /><br />
			<AddUpdateDel client={props.client} currentAd={current} refreshList={() => {
				refreshList() ;
				changeCurrent(undefined) ;
			}} />
		</div>
	)
}