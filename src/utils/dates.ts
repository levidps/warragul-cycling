const isValidDate = (date: number): boolean => !!(date && !isNaN(date));

export const dateFormat = (date: number): string => {
	if (!isValidDate(date))
		return;

	const d = new Date(date * 1000);
	const day = d.getDate();
	const m = d.getMonth();
	const ds = d.getDay();
	const dayMap = {0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thur', 5: 'fri', 6: 'sat'};

	return `${dayMap[ds]} ${day}/${m}`
}

export const hourFormat = (date: number): string => {
	if (!isValidDate(date))
		return;

	const d = new Date(date * 1000);
	const h = d.getHours();
	return `${(h > 12) ? h % 12 : h}${h < 12 ? 'AM' : 'PM'}`;
}