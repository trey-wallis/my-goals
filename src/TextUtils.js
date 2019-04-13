/*
* Returns a date based on a certain day offset from the current date
*/
export const date = (dayOffset) => {
		const today = new Date();
		const later = new Date(today.getDate() + (dayOffset)); //If we were to use millis instead of date it is not daylight savings safe
		let dd = later.getDate();
		let mm = later.getMonth() + 1; //January is 0!
		const yyyy = later.getFullYear();

		if (dd < 10)
			dd = '0' + dd

		if (mm < 10)
		 	mm = '0' + mm

		 const formatted = '' + yyyy + '-' + mm + '-' + dd + '';
		 return formatted;
};

export const upperCaseFirst = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getLastSunday = (startDate) => { //Reset the time so it's at midnight. This will allow better date comparisons
	const today = new Date(startDate);
	today.setHours(0,0,0,0);
	today.setDate(today.getDate() - today.getDay());
	return today;
}

export const getWeekDates = (startDate) => {
	const dates = [];
	for (let i = 0; i < 7; i++){
		const currentDate = getLastSunday(startDate);
		currentDate.setDate(currentDate.getDate() + i);
		dates.push(currentDate);
	}
	return dates;
}

export const getDayName = (day) => {
	switch(day){
		case 1:
			return 'mon'
		case 2:
			return 'tues';
		case 3:
			return 'weds';
		case 4:
			return 'thurs';
		case 5:
			return 'fri';
		case 6:
			return 'sat';
		default:
			return 'sun';
	}
}