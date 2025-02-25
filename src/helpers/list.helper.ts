interface IBooleanMap<TBool extends boolean> {
  [field: string]: TBool;
}

export default class ListHelper {
  static generateTrueMap(list: any[] = []): IBooleanMap<true> {
    return ListHelper.toMap(list, () => true);
  }

  static unique<T = any>(list: T[] = []): T[] {
    return [...new Set(list)];
  }

  static sortBy<T = any>(
    list: T[] = [],
    propKeyOrFn: string | number | ((item: T) => any) = (item) => item,
  ): T[] {
    const getSortByValue =
      typeof propKeyOrFn === 'function'
        ? propKeyOrFn
        : (item) => item[propKeyOrFn];
    return list.sort((itemA, itemB) => {
      let valA = getSortByValue(itemA);
      let valB = getSortByValue(itemB);
      if (typeof valA === 'string') valA = valA.toUpperCase();
      if (typeof valB === 'string') valB = valB.toUpperCase();
      return valA < valB ? -1 : valA > valB ? 1 : 0;
    });
  }

  static uniqueBy<T = any>(
    list: T[] = [],
    propKeyOrFn: string | number | ((item: T) => any),
  ): T[] {
    const getUniqByValue =
      typeof propKeyOrFn === 'function'
        ? propKeyOrFn
        : (item) => item[propKeyOrFn];
    const itemsMap = list.reduce((uniqMap, item) => {
      const key = item ?? getUniqByValue(item);
      if (!uniqMap.has(key)) uniqMap.set(key, item);
      return uniqMap;
    }, new Map());
    return [...itemsMap.values()];
  }

  static toMap<TItem = any, TValue = TItem, TKey extends string = string>(
    list: TItem[] = [],
    valueFn: (item: TItem) => TValue,
    keyFn?: (item: TItem) => TKey,
  ): { [key: string]: TValue } {
    if (!keyFn) keyFn = (item) => `${item}` as TKey;
    return list.reduce((map, item) => {
      const key = keyFn(item);
      if (!key) return map;
      return { ...map, [keyFn(item)]: valueFn(item) };
    }, {});
  }

  static groupBy<TItem = any, TResult = TItem>(
    list: TItem[] = [],
    propertyOrKeyFunc: keyof TItem | ((item: TItem) => string),
    propertyOrValueFunc?: keyof TItem | ((item: TItem) => TResult),
  ): { [key: string]: TResult[] } {
    return list.reduce((map, item: TItem) => {
      const key =
        typeof propertyOrKeyFunc === 'function'
          ? propertyOrKeyFunc(item)
          : `${item[propertyOrKeyFunc]}`;
      const value =
        typeof propertyOrValueFunc === 'function'
          ? propertyOrValueFunc(item)
          : propertyOrValueFunc
          ? `${item[propertyOrValueFunc]}`
          : item;
      map[key] ??= [];
      map[key].push(value);
      return map;
    }, {});
  }
}
