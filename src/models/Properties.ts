import type { Property } from "../types";

import { pb } from "../PocketBaseInit";
import { handlePocketbaseError } from "./errorHandling";
import {
  addPropertyToStore,
  removePropertyFromStore,
  updatePropertyInStore,
} from "../stores/actions";

export async function getProperties(): Promise<Property[]> {
  try {
    const data = await pb.collection<Property>("Properties").getFullList();

    console.log(data);

    return data.map(parsePropertyData);
  } catch (err) {
    throw handlePocketbaseError(err);
  }
}

// Adds absolute URLs to the image URLs
const parsePropertyData = (property: Property): Property => {
  return {
    ...property,
    imgUrl: property.imgUrl.map((url) =>
      pb.files.getURL(property, url, { thumb: "256x256" })
    ),
  };
};

export function removeThumbFromUrl(url: string): string {
  if (!url) return url;
  const index = url.indexOf("?thumb");
  if (index === -1) return url;
  return url.slice(0, index);
}

export async function addProperty(property: Partial<Property>): Promise<void> {
  try {
    const collection = pb.collection<Property>("Properties");
    if (property.id) {
      // Update existing property
      const res = await collection.update(property.id, property);
      console.log("Property updated:", res);
      updatePropertyInStore(parsePropertyData(res));
    } else {
      // Create new property
      const res = await collection.create(property);
      console.log("Property created:", res);
      addPropertyToStore(parsePropertyData(res));
    }
  } catch (err: unknown) {
    throw handlePocketbaseError(err);
  }
}

export async function deleteProperty(id: string): Promise<void> {
  if (!id) {
    throw new Error("Id is required");
  }

  try {
    const collection = pb.collection<Property>("Properties");
    const res = await collection.delete(id);
    console.log("Property deleted:", res);
    removePropertyFromStore(id);
  } catch (err) {
    throw handlePocketbaseError(err);
  }
}
