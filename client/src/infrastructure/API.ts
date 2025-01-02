export class API {
  private static BASE_PATH = "/api";

  public static URL = {
    processImage: () => `${this.BASE_PATH}/ocr/process_image`,
  };

  public static createURL(url: string): string {
    return `${process.env.REACT_APP_API_BASE_URL}${url}`;
  }
}
console.log("API URL:", API.createURL(API.URL.processImage()));
