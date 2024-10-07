const isValidDate = (date: number): boolean => !!(date && !isNaN(date));

export const dateFormat = (date: number): string | null => {
	if (!isValidDate(date))
		return null;

	const d = new Date(date * 1000);
	const day = d.getDate();
	const m = d.getMonth() + 1;
	const ds = d.getDay();
	const dayMap = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];

	return `${dayMap[ds]} ${day}/${m}`
}

export const hourFormat = (date: number): string | null => {
	if (!isValidDate(date))
		return null;

	const d = new Date(date * 1000);
	const h = d.getHours();
	return `${(h > 12) ? h % 12 : h}${h < 12 ? 'AM' : 'PM'}`;
}