import { ClientResponseError } from "pocketbase";

interface ErrorObject {
  code?: string;
  message?: string;
  [key: string]: unknown;
}

type ErrorResponseData = Record<string, ErrorObject | string>;

export function handlePocketbaseError(err: unknown): Record<string, string> {
  if (err instanceof ClientResponseError) {
    console.error("PocketBase ClientResponseError:", err);
    const responseData = err.response?.data;
    if (responseData && typeof responseData === "object") {
      return parseErrorResponse(responseData as ErrorResponseData);
    } else if (err.message) {
      return { error: err.message };
    }
  } else if (err instanceof Error) {
    console.error("Error:", err);
    return { error: err.message };
  }
  console.error("Unknown error:", err);
  return { error: "An unknown error occurred." };
}

function parseErrorResponse(data: ErrorResponseData): Record<string, string> {
  const errorMessages: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (isErrorObject(value)) {
      const code = value.code || "Unknown code";
      const message = value.message || "Unknown message";
      errorMessages[key] = `${code} - ${message}`;
    } else {
      errorMessages[key] = String(value);
    }
  }
  return errorMessages;
}

function isErrorObject(value: unknown): value is ErrorObject {
  return (
    typeof value === "object" && value !== null && ("code" in value || "message" in value)
  );
}
