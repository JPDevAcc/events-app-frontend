// Message component (adapted from booklist frontend)

import { Alert } from 'react-bootstrap';
import React from "react"

export default function Message({msgData, setMsgData}) {
	return (
		<>
		{(msgData.msg) ?
			<Alert className="py-0" variant={msgData.type === 'msg' ? 'success' : 'danger'} onClose={() => setMsgData({msg: null})} dismissible>
				<Alert.Heading>{msgData.type === 'msg' ? 'Success' : 'Error'}</Alert.Heading>
				<p>{msgData.msg}</p>
			</Alert> :
			<Alert className="invisible py-0">
				<Alert.Heading>&nbsp;</Alert.Heading>
				<p>&nbsp;</p>
			</Alert>
			}
		</>
	) ;
}