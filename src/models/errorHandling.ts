import { ClientResponseError } from "pocketbase";

interface ErrorObject {
  code?: string;
  message?: string;
  [key: string]: unknown;
}

type ErrorResponseData = Record<string, ErrorObject | string>;

/**
 * Handle errors that might come from a PocketBase client or a general JavaScript error.
 * Returns a record of error messages keyed by field or "error".
 * @param err - The caught error (unknown type).
 * @returns A record of parsed error messages.
 */
export function handlePocketbaseError(err: unknown): Record<string, string> {
  if (err instanceof ClientResponseError) {
    console.log("type ClientResponseError:", err);
    const responseData = err.response?.data;
    if (responseData && typeof responseData === "object") {
      // If there's a known PocketBase error response, parse it.
      return parsePocketbaseResponse(responseData as ErrorResponseData);
    } else if (err.message) {
      // If there's a general error message, return it.
      return { error: err.message };
    }
  } else if (err instanceof Error) {
    return { error: err.message };
  }
  return { error: "An unknown error occurred." };
}

function parsePocketbaseResponse(data: ErrorResponseData): Record<string, string> {
  const errorMessages: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (isPocketbaseErrorObject(value)) {
      const code = value.code || "Unknown code";
      const message = value.message || "Unknown message";
      errorMessages[key] = `${code} - ${message}`;
    } else {
      errorMessages[key] = String(value);
    }
  }
  return errorMessages;
}

function isPocketbaseErrorObject(value: unknown): value is ErrorObject {
  return (
    typeof value === "object" && value !== null && ("code" in value || "message" in value)
  );
}
