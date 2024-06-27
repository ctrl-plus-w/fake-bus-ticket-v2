import { formatNumber } from '@/helper/string.helper';

export interface ITime {
  hours: number;
  minutes: number;

  toString(separator?: string): string;
  asSeconds(): number;
}

class Time implements ITime {
  hours: number;

  minutes: number;

  constructor(hours: number, minutes: number) {
    this.hours = hours;
    this.minutes = minutes;
  }

  /**
   * Transform a Time instance into a String
   * @param separator The separator
   * @returns A string
   */
  toString(separator = ':'): string {
    return [this.hours, this.minutes]
      .map((el) => formatNumber(el))
      .join(separator);
  }

  asSeconds(): number {
    return this.hours * 60 * 60 + this.minutes * 60;
  }

  static fromDate(date: Date): ITime {
    return new Time(date.getHours(), date.getMinutes());
  }
}

export default Time;
