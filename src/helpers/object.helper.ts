export default class ObjectHelper {
  static isObject(item: unknown): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
}
