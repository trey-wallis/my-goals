/*
* Returns a date based on a certain day offset from the current date
*/
export const date = (dayOffset) => {
		const today = new Date();
		const later = new Date(today.getTime() + (1000 * 60 * 60 * 24 * dayOffset));
		let dd = later.getDate();
		let mm = later.getMonth()+1; //January is 0!
		const yyyy = later.getFullYear();

		if (dd < 10)
			dd = '0' + dd

		if (mm < 10)
		 	mm = '0' + mm

		 const formatted = '' + yyyy + '-' + mm + '-' + dd + '';
		 return formatted;
};