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
    imgUrl: property.imgUrl.map((url) =>
      pb.files.getUrl(property, url, { thumb: "256x256" })
    ),
  };
}

export function removeThumbFromUrl(url: string): string {
  const index = url.indexOf("?thumb");
  if (index === -1) return url;
  return url.slice(0, index);
}

export async function addProperty(property: Partial<Property>): Promise<void> {
  try {
    const collection = pb.collection("Properties");
    const action = property.id ? "update" : "create";
    const res = await collection[action](property.id || "", property);
    console.log(`Property ${action}d:`, res);
  } catch (err) {
    console.error("Error adding/updating property:", err);
    throw handlePropertyError(err);
  }
}

function handlePropertyError(err: unknown): Error | Record<string, string> {
  if (err instanceof ClientResponseError) {
    console.log("ClientResponseError details:");
    if (err.response?.data && typeof err.response.data === "object") {
      return parseErrorResponse(err.response.data);
    } else if (err.message) {
      return { error: err.message };
    }
  }
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
