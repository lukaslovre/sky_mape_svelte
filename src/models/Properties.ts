import type { Property } from "../types";

import { pb } from "../PocketBaseInit";

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

export async function addProperty(
  property: // all fields optional typescript syntax
  Partial<Property>
): Promise<void> {
  try {
    if (property.id) {
      const res = await pb.collection("Properties").update(property.id, property);
      console.log(res);
    } else {
      const res = await pb.collection("Properties").create(property);
      console.log(res);
    }
  } catch (err) {
    console.error(err.data);
  }
}
