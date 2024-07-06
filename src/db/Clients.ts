import type { UserData } from "../types";
// import { LatLng } from "leaflet";

import { pb, transformPocketbaseUrlToAbsolute } from "./generalAndSetup";

// EXAMPLE DATA
// {
//     "collectionId": "zp7401tafuzep0j",
//     "collectionName": "Clients",
//     "contact": "098766886",
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

type dbClient = {
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  id: string;
} & UserData;

export async function getUsers(): Promise<UserData[]> {
  const data = (await pb.collection("Clients").getFullList()) as dbClient[];
  console.log(data);
  const transformedData = data.map(transformFromDbToClientType);
  console.log(transformedData);

  return transformedData;
}

function transformFromDbToClientType(dbClient: dbClient): UserData {
  return {
    id: dbClient.id,
    name: dbClient.name,
    contact: dbClient.contact,
    note: dbClient.note,
    filters: dbClient.filters,
    favoriteProperties: dbClient.favoriteProperties,
  };
}
