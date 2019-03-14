class Connection {

	constructor(){
		this.connected = false;
		this.error = null;
		this.localhost = true;
	}

	get domain = () => {
		if (this.localhost)
			return "http://localhost:3006";
		else
			return "https://my-goals-api.herokuapp.com";
	}

	saveProfile = (sessionKey, uid) => {
		window.sessionStorage.setItem('sessionKey', sessionKey);
		window.sessionStorage.setItem('uid', uid);
	}

	clearProfile = () => {
		window.sessionStorage.setItem('sessionKey', 'undefined');
		window.sessionStorage.setItem('uid', 'undefined');
	}

	get uid = () => {
		return parseInt(window.sessionStorage.getItem('uid'));
	}

	get sessionKey = () => {
		return window.sessionStorage.getItem('sessionKey');
	}

	post = (route, body) => {
		let status;
		return fetch(`${this.domain}/${route}`, {
		 	method: 'post',
		 	headers: {'Content-Type': 'application/json'},
		 	body: JSON.stringify(body)
		 })
		 .then(response => {
		 	status = response.status;
		 	return response.json();
		 })
		 .then(data => {
		 	return {
		 		status: status,
		 		data: data
		 	}
		 });
	}

	postAuthorized = (route, body) => {
		const sessionKey = this.sessionKey;
		const uid = this.uid;

		const session = {
			sessionKey: sessionKey,
			uid: uid
		};
		
		var joined = Object.assign({}, session, body);
		return this.post(route, joined);
	}
}

export default Connection;