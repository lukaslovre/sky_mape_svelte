import type { Client } from "../types";
import { pb } from "../PocketBaseInit";
import { handlePocketbaseError } from "./errorHandling";
import {
  addClientToStore,
  removeClientFromStore,
  updateClientInStore,
} from "../stores/actions";

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

export async function getUsers(): Promise<Client[]> {
  try {
    const data = await pb
      .collection<Client>("Clients")
      .getFullList({ batch: 1000, sort: "-updated" });
    console.log(data);
    return data;
  } catch (err) {
    throw handlePocketbaseError(err);
  }
}

// CREATE
export async function createUser(data: Partial<Client>): Promise<void> {
  try {
    const collection = pb.collection<Client>("Clients");
    if (data.id) {
      // Update existing user
      const res = await collection.update(data.id, data);
      console.log("User updated:", res);
      updateClientInStore(res);
    } else {
      // Create new user
      const res = await collection.create(data);
      console.log("User created:", res);
      addClientToStore(res);
    }
  } catch (err) {
    throw handlePocketbaseError(err);
  }
}

// DELETE
export async function deleteUser(id: string): Promise<void> {
  if (!id) {
    throw new Error("Id is required");
  }

  try {
    const collection = pb.collection<Client>("Clients");
    const res = await collection.delete(id);
    console.log("User deleted:", res);
    removeClientFromStore(id);
  } catch (err) {
    throw handlePocketbaseError(err);
  }
}
