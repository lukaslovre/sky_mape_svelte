import type { Property } from "../types";

import { pb } from "../PocketBaseInit";
import { ClientResponseError } from "pocketbase";
import { handlePocketbaseError } from "./errorHandling";
import { addPropertyToStore, updatePropertyInStore } from "../stores/actions";

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
      updatePropertyInStore(res);
    } else {
      // Create new property
      const res = await collection.create(property);
      console.log("Property created:", res);
      addPropertyToStore(res);
    }
  } catch (err) {
    console.error("Error adding/updating property:", err);
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
  } catch (err) {
    console.log(err);
    alert("Error deleting property");
  }
}
