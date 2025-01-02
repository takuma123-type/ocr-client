import axios from "axios";
import { API } from "../API";
import { handleError } from "./errors";

export class OcrRepository {
  /**
   * 画像ファイルをAPIに送信してOCR結果を取得
   * @param file 画像ファイル
   * @returns APIからのレスポンスデータ
   * @throws エラー時には `handleError` を通じてエラーを処理
   */
  async processImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // APIリクエスト
      const response = await axios.post(API.createURL(API.URL.processImage()), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      // ステータスコードの確認
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }

      // ステータスコードが想定外の場合
      throw new Error(`Unexpected response status: ${response.status}`);
    } catch (error) {
      // エラーハンドリング
      console.error("Error during file upload:", error);
      handleError(error);
    }
  }
}
