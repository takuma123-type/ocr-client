// src/errors.ts
import { AxiosError } from "axios";

// 独自エラーの定義
export class ApiError extends Error {
  constructor(public message: string, public status?: number, public details?: any) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends ApiError {}
export class UnauthorizedError extends ApiError {}
export class BadRequestError extends ApiError {}
export class UnknownError extends ApiError {}

// ステータスコードとエラークラスのマッピング
export const errorMap: Record<number, typeof ApiError> = {
  400: BadRequestError,
  401: UnauthorizedError,
  404: NotFoundError,
};

/**
 * エラーを処理して適切なエラークラスをスローする関数
 */
export function handleError(error: unknown): never {
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;

    if (status && errorMap[status]) {
      const ErrorClass = errorMap[status];
      const errorMessage = (axiosError.response?.data as { message?: string })?.message || "Error occurred";
      throw new ErrorClass(errorMessage, status, axiosError.response?.data);
    }

    throw new UnknownError(axiosError.message, status, axiosError.response?.data);
  }

  throw new UnknownError("Non-Axios error occurred", undefined, error);
}
