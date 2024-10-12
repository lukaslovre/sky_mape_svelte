import type { Property } from "../types";

import { pb } from "../PocketBaseInit";
import { ClientResponseError } from "pocketbase";

// EXAMPLE DATA
// {
//   action: 'Sale',
//   collectionId: '1xq5g1wyjzp8jk7',
//   collectionName: 'Properties',
//   created: '2024-07-05 18:32:11.791Z',
//   description: 'Izvrsna vila smještena u živahnom centru Zagreba. Ovaj šarmantni dom ima prostrani vrt, moderne sadržaje i blizinu kulturnih znamenitosti.',
//   id: '9tkur0jfmzle2kz',
//   imgUrl: [ 'most_beautiful_house_in_the_world_0_1200_tznUy5KIOS.jpg' ],
//   lat: 45.81,
//   lng: 15.98,
//   price: 350000,
//   surfaceArea: 76,
//   title: 'Elegantna Vila u Središtu Zagreba',
//   type: 'House',
//   updated: '2024-07-05 18:32:11.791Z'
// }

export async function getProperties(): Promise<Property[]> {
  // you can also fetch all records at once via getFullList
  const data = await pb.collection<Property>("Properties").getFullList();

  console.log(data);

  return data.map(parsePropertyData);
}

// Adds absolute URLs to the image URLs
function parsePropertyData(property: Property): Property {
  return {
    ...property,
    imgUrl: property.imgUrl.map((url) => pb.files.getUrl(property, url)),
  };
}

export async function addProperty(property: Partial<Property>): Promise<void> {
  try {
    const collection = pb.collection("Properties");
    const res = property.id
      ? await collection.update(property.id, property)
      : await collection.create(property);
    console.log(res);
  } catch (err) {
    console.error("Error adding/updating property:", err);

    if (err instanceof ClientResponseError) {
      console.log("ClientResponseError details:");

      if (err.response && typeof err.response.data === "object") {
        const errorObject: { [key: string]: string } = {};
        Object.entries(err.response.data).forEach(([key, value]) => {
          if (
            typeof value === "object" &&
            value !== null &&
            "code" in value &&
            "message" in value
          ) {
            const code = value.code ?? "Unknown code";
            const message = value.message ?? "Unknown message";
            errorObject[key] = `${code} - ${message}`;
          } else {
            errorObject[key] = String(value);
          }
        });
        throw errorObject;
      } else if (err.message) {
        throw { error: err.message };
      }
    }
    throw err; // Re-throw the error for the caller to handle
  }
}

export async function deleteProperty(id: string): Promise<void> {
  if (!id) {
    throw new Error("Id is required");
  }
  try {
    await pb.collection("Properties").delete(id);
  } catch (err) {
    console.log(err);
    alert("Error deleting property");
  }
}
