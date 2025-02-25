import { DateTime } from 'luxon';
import { IDateRangeFilter } from './helper.definations';

export default class FiltersReducers {
  private static parseDateRangeFilter({
    start,
    end,
  }: IDateRangeFilter): [Date, Date] {
    return [
      DateTime.fromISO(start).toUTC().startOf('day').toJSDate(),
      DateTime.fromISO(end).toUTC().endOf('day').toJSDate(),
    ];
  }
}
