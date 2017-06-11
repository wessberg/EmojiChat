export enum RelativeTimeKind {
	JUST_NOW,
	SECONDS_AGO,
	MINUTE_AGO,
	MINUTES_AGO,
	HOUR_AGO,
	HOURS_AGO,
	YESTERDAY,
	THE_DAY_BEFORE_YESTERDAY,
	DAYS_AGO,
	LAST_WEEK,
	WEEKS_AGO,
	LAST_MONTH,
	MONTHS_AGO,
	FULL_DATE
}

export interface IRelativeTime {
	kind: RelativeTimeKind;
	value: number|Date;
}

export interface IDateUtil {
	toRelative (date: Date): string;
}