import {IDateUtil, IRelativeTime, RelativeTimeKind} from "./Interface/IDateUtil";

export class DateUtil implements IDateUtil {
	public toRelative (date: Date): string {

		const {kind, value} = this.getRelativeTimeMatch(date);
		switch (kind) {
			case RelativeTimeKind.JUST_NOW:
				return "just now";
			case RelativeTimeKind.SECONDS_AGO:
				return `${value} seconds ago`;
			case RelativeTimeKind.MINUTE_AGO:
				return "a minute ago";
			case RelativeTimeKind.MINUTES_AGO:
				return `${value} minutes ago`;
			case RelativeTimeKind.HOUR_AGO:
				return "an hour ago";
			case RelativeTimeKind.HOURS_AGO:
				return `${value} hours ago`;
			case RelativeTimeKind.YESTERDAY:
				return "yesterday";
			case RelativeTimeKind.THE_DAY_BEFORE_YESTERDAY:
				return "2 days ago";
			case RelativeTimeKind.DAYS_AGO:
				return `${value} days ago`;
			case RelativeTimeKind.LAST_WEEK:
				return "last week";
			case RelativeTimeKind.WEEKS_AGO:
				return `${value} weeks ago`;
			case RelativeTimeKind.LAST_MONTH:
				return "last month";
			case RelativeTimeKind.MONTHS_AGO:
				return `${value} months ago`;
			case RelativeTimeKind.FULL_DATE:
				return (<Date>value).toTimeString();
		}
	}

	private getRelativeTimeMatch (date: Date): IRelativeTime {
		const TIME_NOW = Date.now();
		const normalizedTimestamp = date.getTime();

		const secondsAgo = Math.floor((TIME_NOW - normalizedTimestamp) / 1000);
		const minutesAgo = Math.floor(secondsAgo / 60);
		const hoursAgo = Math.floor(minutesAgo / 60);
		const daysAgo = Math.floor(hoursAgo / 24);
		const weeksAgo = Math.floor(daysAgo / 7);
		const monthsAgo = Math.floor(weeksAgo / 4);

		if (secondsAgo <= 1) return {kind: RelativeTimeKind.JUST_NOW, value: secondsAgo};
		if (secondsAgo < 60) return {kind: RelativeTimeKind.SECONDS_AGO, value: secondsAgo};
		if (minutesAgo === 1) return {kind: RelativeTimeKind.MINUTE_AGO, value: minutesAgo};
		if (minutesAgo < 60) return {kind: RelativeTimeKind.MINUTES_AGO, value: minutesAgo};
		if (hoursAgo === 1) return {kind: RelativeTimeKind.HOUR_AGO, value: hoursAgo};
		if (hoursAgo < 24) return {kind: RelativeTimeKind.HOURS_AGO, value: hoursAgo};
		if (daysAgo === 1) return {kind: RelativeTimeKind.YESTERDAY, value: daysAgo};
		if (daysAgo === 2) return {kind: RelativeTimeKind.THE_DAY_BEFORE_YESTERDAY, value: daysAgo};
		if (daysAgo < 7) return {kind: RelativeTimeKind.DAYS_AGO, value: daysAgo};
		if (weeksAgo === 1) return {kind: RelativeTimeKind.LAST_WEEK, value: weeksAgo};
		if (weeksAgo < 4) return {kind: RelativeTimeKind.WEEKS_AGO, value: weeksAgo};
		if (monthsAgo === 1) return {kind: RelativeTimeKind.LAST_MONTH, value: monthsAgo};
		if (monthsAgo < 4) return {kind: RelativeTimeKind.MONTHS_AGO, value: monthsAgo};
		else return {kind: RelativeTimeKind.FULL_DATE, value: date};
	}
}