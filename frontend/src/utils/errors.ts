import { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const serverError = error.response?.data as
      | { error?: string; message?: string }
      | undefined;

    return (
      serverError?.error ??
      serverError?.message ??
      error.message ??
      "Unknown Axios error"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}
