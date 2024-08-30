export const dateFormat = (date: number): string => {
	if (!date || isNaN(date))
		return;

	const d = new Date(date * 1000);
	const day = d.getDate();
	const m = d.getMonth();
	const ds = d.getDay();
	const dayMap = {0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thur', 5: 'fri', 6: 'sat'};

	return `${dayMap[ds]} ${day}.${m}`
}