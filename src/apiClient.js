import axios from "axios";
const url = "http://localhost:3005/";

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

	getEvents() {
		return this.authenticatedCall("get", url);
	}

	addEvent(name, price) {
		return this.authenticatedCall("post", url, { name, price });
	}

	removeEvent(id) {
		return this.authenticatedCall("delete", `${url}${id}`);
	}

	updateEvent(id, name, price) {
		return this.authenticatedCall("put", `${url}${id}`, { name, price });
	}

	login(username, password) {
		return axios.post(`${url}auth`, { username, password });
	}
}