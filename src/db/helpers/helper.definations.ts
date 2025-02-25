import { OneOrArray } from '../../common.definitions';

export interface IDateRangeFilter {
  start: string;
  end: string;
}

export type FilterFields = OneOrArray<string>;
