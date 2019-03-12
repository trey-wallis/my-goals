class Profile {

	saveProfile(sessionKey, uid){
		window.sessionStorage.setItem('sessionKey', sessionKey);
		window.sessionStorage.setItem('uid', uid);
	}

	clearProfile(){
		window.sessionStorage.setItem('sessionKey', 'undefined');
		window.sessionStorage.setItem('uid', 'undefined');
	}

	get uid(){
		return parseInt(window.sessionStorage.getItem('uid'));
	}

	get sessionKey(){
		return window.sessionStorage.getItem('sessionKey');
	}
}

export default Profile;