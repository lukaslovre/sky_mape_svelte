import type { PocketbaseAttributes, UserData } from "../types";
// import { LatLng } from "leaflet";

import { pb } from "../PocketBaseInit";
import { ClientResponseError } from "pocketbase";

// EXAMPLE DATA
// {
//     "collectionId": "zp7401tafuzep0j",
//     "collectionName": "Clients",
//     "email": "pero@gmail.com",
//     "phone": "0987654321",
//     "created": "2024-07-06 16:38:32.192Z",
//     "favoriteProperties": [
//       "e46cmbco64m8h29"
//     ],
//     "filters": {
//       "minArea": 15,
//       "maxArea": 50,
//       "maxPrice": 0,
//       "minPrice": 0,
//       "type": [
//         "House"
//       ],
//       "action": [],
//       "polygons": []
//     },
//     "id": "0n218xkwkfhv7wl",
//     "name": "Lukas",
//     "note": "Želi nešto vrlo jako i prostrano. Elegantno",
//     "updated": "2024-07-06 16:38:32.192Z"
//   }

export async function getUsers(): Promise<UserData[]> {
  try {
    const data = await pb.collection<UserData>("Clients").getFullList();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw handleClientError(err);
  }
}

function handleClientError(err: unknown): Error | Record<string, string> {
  if (err instanceof ClientResponseError) {
    console.log("ClientResponseError details:");
    if (err.response?.data && typeof err.response.data === "object") {
      return parseErrorResponse(err.response.data);
    } else if (err.message) {
      return { error: err.message };
    }
  }
  console.log(err);
  return err as Error;
}

function parseErrorResponse(data: Record<string, unknown>): Record<string, string> {
  const errorObject: Record<string, string> = {};
  Object.entries(data).forEach(([key, value]) => {
    if (isErrorObject(value)) {
      const { code = "Unknown code", message = "Unknown message" } = value;
      errorObject[key] = `${code} - ${message}`;
    } else {
      errorObject[key] = String(value);
    }
  });
  return errorObject;
}

function isErrorObject(value: unknown): value is { code?: string; message?: string } {
  return (
    typeof value === "object" && value !== null && ("code" in value || "message" in value)
  );
}

// CREATE

export async function createUser(data: Partial<UserData>): Promise<UserData> {
  const record = await pb.collection<UserData>("Clients").create(data);

  console.log("User created:", record);

  return record;
}
