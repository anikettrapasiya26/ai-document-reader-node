import { URL } from 'url';

export default class UrlHelper {
  static getHost(url: string): string {
    try {
      url = new URL(url).hostname;
    } catch {
      // ignore url parsing error
    }
    return url;
  }
}
