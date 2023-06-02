import axios from "axios";
// const url = "http://localhost:3005";
// const url = "https://events-app-backend-fg69.onrender.com";
const url = process.env.REACT_APP_URL;


export default class ApiClient {
	constructor(tokenProvider, logoutHandler, errHandler = null) {
		this.tokenProvider = tokenProvider;
		this.logoutHandler = logoutHandler;
		this.errHandler = errHandler;
		this.setFilters();
		axios.defaults.withCredentials = true; // Send cookies
	}

	errHandlerInternal(err) {
		if (this.errHandler) this.errHandler(err.response.data.message);
		else console.error(err);
		throw (err); // (rethrow)
	}

	authenticatedCall(method, url, data) {
		return axios({
			method, url, data,
			headers: {
				token: this.tokenProvider()
			}
		})
			.then((response) => {
				this.errHandler(null);  // Clear error on success
				return response;
			})
			.catch((err) => {
				if (err.response.status === 401 || err.response.status === 403) { // Logout on Unauthorized / Forbidden
					this.logoutHandler();
				}
				else this.errHandlerInternal(err); // Handle error
			});
	}

	setFilters(filters = {}) {
		this.filters = filters;
	}

	getFilters() {
		return { ...this.filters };
	}

	getEvents() {
		/* Search criteria format: f1=fieldName1&s1=searchValue1&f2=fieldName2&s2=searchValue2... */
		let argsStr = '';
		for (const [i, [fieldName, searchValue]] of Object.entries(this.filters).entries()) {
			argsStr += ('&f' + i + '=') + encodeURI(fieldName) + ('&s' + i + '=') + encodeURI(searchValue.trim());
		}
		argsStr = argsStr.substring(1);

		if (argsStr) return this.authenticatedCall("get", `${url}/search/and?` + argsStr);
		else return this.authenticatedCall("get", url);
	}

	addEvent(data) {
		return this.authenticatedCall("post", url, data);
	}

	removeEvent(id) {
		return this.authenticatedCall("delete", `${url}/${id}`);
	}

	updateEvent(id, data) {
		return this.authenticatedCall("put", `${url}/${id}`, data);
	}

	login(username, password) {
		return axios.post(`${url}/auth`, { username, password })
			.then(this.errHandler(null)).catch((err) => this.errHandlerInternal(err));
	}
}