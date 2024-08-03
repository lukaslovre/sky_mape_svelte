import type { PocketbaseAttributes, UserData } from "../types";
// import { LatLng } from "leaflet";

import { pb, transformPocketbaseUrlToAbsolute } from "./generalAndSetup";

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
  const data = await pb.collection<UserData>("Clients").getFullList();

  console.log(data);

  return data;
}

// CREATE

export async function createUser(
  data: Omit<UserData, keyof PocketbaseAttributes>
): Promise<UserData> {
  const record = await pb.collection<UserData>("Clients").create(data);

  return record;
}
