const handleRequest = (db) => (req, res) => {

	//Get the ip address
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	//Log a new request
	console.log(`${ip} ${req.url} New request: `, req.body);

	//Get the session key
	const {sessionKey, uid} = req.body;

	//Handle a null session key
	if (sessionKey === 'undefined' || sessionKey === undefined || sessionKey === null){
		//If it's not a route that doesn't require a key - kill the request
		if (req.url !== '/login' && req.url !== '/register'){
			log(uid, req.url, "No session key given for path");
			return false;
		}
		//Otherwise let it pass through
		log('', req.url, "No session key request granted");
		return true;
	} else { //else handle the key
		return db.one('SELECT sessionkey FROM online WHERE userid=$1', uid)
		.then(user => {
			if (user.sessionkey === sessionKey){
				log(uid, req.url, "Validated session key");
				return true;
			} else {
				log(uid, req.url, "Invalid session key");
				return false;
			}
		}).catch(error => {
			log(uid, req.url, error);
			return false;
		});
	}
};

const log = (user, route, message) => {
	console.log(`${user} ${route}`, message);
}

module.exports = {
	log: log,
	handleRequest: handleRequest,
}