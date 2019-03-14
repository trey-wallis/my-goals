class Connection {

	constructor(profile){
		this.profile = profile;
		this.connected = false;
		this.error = null;
		this.localhost = true;
	}

	get domain(){
		if (this.localhost)
			return "http://localhost:3006";
		else
			return "https://my-goals-api.herokuapp.com";
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
		const sessionKey = this.profile.sessionKey;
		const uid = this.profile.uid;

		const session = {
			sessionKey: sessionKey,
			uid: uid
		};
		
		var joined = Object.assign({}, session, body);
		return this.post(route, joined);
	}
}

export default Connection;