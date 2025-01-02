import { OcrRepository } from "../infrastructure/repository/OcrRepository";
import { ProcessImageItem } from "../models/presentation/ProcessImageItem";
import { OcrItem } from "../models/presentation/OcrItem";

export class ProcessImageUsecase {
  private ocrRepository: OcrRepository;

  constructor(ocrRepository: OcrRepository) {
    this.ocrRepository = ocrRepository;
  }

  async process(input: ProcessImageItem): Promise<OcrItem> {
    try {
      const response = await this.ocrRepository.processImage(input.file);

      // APIレスポンスをマッピング
      return new OcrItem({
        storeName: response.store_name, // サーバー側のキーに合わせる
        registrationNumber: response.registration_number,
        phoneNumber: response.phone_number,
        address: response.address,
        date: response.date,
        amount: response.amount,
        fileName: response.file_name || "N/A", // file_nameが存在しない場合デフォルト値
      });
    } catch (error) {
      console.error("Error processing image:", error);
      throw error;
    }
  }
}
