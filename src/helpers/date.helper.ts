import Time, { ITime } from "@/class/Time";
import { getCloserOddOrIncrement, getOdds } from "@/helper/number.helper";
import { formatNumber } from "@/helper/string.helper";

/**
 * Format a date to the format dd/mm/yyyy
 * @param {Date} date The date to format
 * @returns A string
 */
export const getFormatedDate = (date: Date): string => {
  const day = formatNumber(date.getDate());
  const month = formatNumber(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Convert an hour string to an amount of seconds
 * @param {string} hour The hour to convert (format: 'hh:ss')
 * @returns A number
 */
export const getHourAsSeconds = (hour: string): number => {
  const [h, m] = hour.split(":").map(parseInt);

  return h * 60 * 60 + m * 60;
};

/**
 * Format a date to the format hh:ss
 * @param {Date} date The date to format
 * @returns A string
 */
export const formatHour = (date: Date): string => {
  const h = date.getHours();
  const m = date.getMinutes();

  return `${formatNumber(h)}:${formatNumber(m)}`;
};

/**
 * Get the rounded hour before now
 * @param {Date} date Get the round hour before
 * @returns A Time instance
 */
export const getBeforeHour = (date: Date): ITime => {
  const h = date.getHours();
  const m = date.getMinutes();

  const hour = getCloserOddOrIncrement(getOdds(24), m > 8 ? h : h - 1, -1);

  return new Time(hour, 0);
};

/**
 * Get the rounded hour after now
 * @param {Date} date Get the round after before
 * @returns A Time instance
 */
export const getAfterHour = (date: Date): ITime => {
  const h = date.getHours();
  const m = date.getMinutes();

  const hour = getCloserOddOrIncrement(getOdds(24), m > 8 ? h + 1 : h, 1);

  return new Time(hour, 0);
};

/**
 * Add hours to a date
 * @param date The date to add hours to
 * @param hours The amount of hours to add
 */
export const addHours = (date: Date, hours: number): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
};
