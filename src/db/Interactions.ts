import type { Interaction } from "../types";

import { pb } from "./generalAndSetup";

export async function getInteractionsFromDb(): Promise<Interaction[]> {
  // you can also fetch all records at once via getFullList
  const data = await pb.collection<Interaction>("Interactions").getFullList({
    expand: "agent_id,user_id,property_id",
  });

  console.log(data);

  return data;
}

// function parsePropertyData(property: Property): Property {
//   return {
//     ...property,
//     imgUrl: property.imgUrl.map((url) =>
//       transformPocketbaseUrlToAbsolute(url, property.collectionName, property.id)
//     ),
//   };
// }
