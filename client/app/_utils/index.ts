export function getNearestDayTime(dayName: string, startHour: string, endHour: string) {
	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase();

	if (!weekdays.includes(dayName)) {
		return null;
	}

	const now = new Date();
	const currentWeekday = now.getDay();
	const targetWeekday = weekdays.indexOf(dayName);

	let daysUntilTarget = (targetWeekday - currentWeekday + 7) % 7;

	if (daysUntilTarget === 0) {
		const endHourParts = endHour.split(":");
		const currentHour = now.getHours();
		const currentMinute = now.getMinutes();
		const endHourHour = parseInt(endHourParts[0]);
		const endHourMinute = parseInt(endHourParts[1]);

		if (currentHour > endHourHour || (currentHour === endHourHour && currentMinute >= endHourMinute)) {
			daysUntilTarget = 7;
		}
	}

	const nextDay = new Date(now.getTime() + daysUntilTarget * 24 * 60 * 60 * 1000);

	nextDay.setHours(parseInt(startHour), 0, 0, 0);

	const day = String(nextDay.getDate()).padStart(2, "0");
	const month = String(nextDay.getMonth() + 1).padStart(2, "0");
	const year = nextDay.getFullYear();

	return `${day}/${month}/${year}`;
}

export function convertDayNamesToPortuguese(text: string): string {
	const dayNamesMap: { [key: string]: string } = {
		Sunday: "Domingo",
		Monday: "Segunda-feira",
		Tuesday: "Terça-feira",
		Wednesday: "Quarta-feira",
		Thursday: "Quinta-feira",
		Friday: "Sexta-feira",
		Saturday: "Sábado"
	};

	const dayNamesRegex = Object.keys(dayNamesMap).join("|");

	const regex = new RegExp(dayNamesRegex, "g");

	return text.replace(regex, (matched) => dayNamesMap[matched]);
}
