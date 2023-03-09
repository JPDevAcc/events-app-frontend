import axios from "axios";
const url = "http://localhost:3005";

export default class ApiClient {
	constructor(tokenProvider, logoutHandler) {
		this.tokenProvider = tokenProvider;
		this.logoutHandler = logoutHandler;
		this.setFilters() ;
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

	setFilters(filters = {}) {
		this.filters = filters ;
	}

	getFilters() {
		return {...this.filters} ;
	}

	// TODO: CHECK THESE ROUTES WORK ON RENDER

	getEvents() {
		/* Search criteria format: f1=fieldName1&s1=searchValue1&f2=fieldName2&s2=searchValue2... */
		let argsStr = '' ;
		for (const [i, [fieldName, searchValue]] of Object.entries(this.filters).entries()) {
			argsStr += ('&f' + i + '=') + encodeURI(fieldName) + ('&s' + i + '=') + encodeURI(searchValue.trim()) ;
		}
		argsStr = argsStr.substring(1) ;

		if (argsStr) return this.authenticatedCall("get", `${url}/search/and?` + argsStr) ;
		else return this.authenticatedCall("get", url);
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