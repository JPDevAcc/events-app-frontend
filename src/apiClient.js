import axios from "axios";
const url = "http://localhost:3005";

export default class ApiClient {
	constructor(tokenProvider, logoutHandler) {
		this.tokenProvider = tokenProvider;
		this.logoutHandler = logoutHandler;
	}

	authenticatedCall(method, url, data) {
		return axios({
			method, url, data,
			headers: {
				token: this.tokenProvider()
			}
		}).catch((err) => {
			if (err.response.statis === 401 || err.response.status === 403) {
				this.logoutHandler();
			}
			else throw err;
		});
	}

	// TODO: CHECK THESE ROUTES WORK ON RENDER

	getEvents() {
		return this.authenticatedCall("get", url);
	}

	addEvent(data) {
		return this.authenticatedCall("post",  url, data);
	}

	removeEvent(id) {
		return this.authenticatedCall("delete", `${url}/${id}`);
	}

	updateEvent(id, data) {
		return this.authenticatedCall("put", `${url}/${id}`, data);
	}

	login(username, password) {
		return axios.post(`${url}/auth`, { username, password });
	}
}