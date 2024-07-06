import type { Property } from "../types";
import { LatLng } from "leaflet";

import { pb, transformPocketbaseUrlToAbsolute } from "./generalAndSetup";

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
//   type: '"House"',
//   updated: '2024-07-05 18:32:11.791Z'
// }

type dbProperty = {
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  id: string;
  lat: number;
  lng: number;
  type: string;
  action: string;
  imgUrl: string[];
  title: string;
  description: string;
  price: number;
  surfaceArea: number;
};
export async function getProperties(): Promise<Property[]> {
  // you can also fetch all records at once via getFullList
  const data = (await pb.collection("Properties").getFullList()) as dbProperty[];

  console.log(data);
  return data.map(transformFromDbToClientProperty);
}

function transformFromDbToClientProperty(dbProperty: dbProperty): Property {
  return {
    id: dbProperty.id,
    latlng: new LatLng(dbProperty.lat, dbProperty.lng),
    type: dbProperty.type as any,
    action: dbProperty.action as any,
    imgUrl: transformPocketbaseUrlToAbsolute(
      dbProperty.imgUrl[0],
      dbProperty.collectionName,
      dbProperty.id
    ),
    titleContent: dbProperty.title,
    descriptionContent: dbProperty.description,
    linkValue: dbProperty.id,
    surfaceArea: dbProperty.surfaceArea,
    price: dbProperty.price,
  };
}
