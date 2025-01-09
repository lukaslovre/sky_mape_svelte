import type { Client } from "../types";

export function parsePocketbaseUserData(data: Client[]): Partial<Client>[] {
  return data.map((user) => {
    const { collectionId, collectionName, ...columnsToKeep } = user;

    return {
      ...columnsToKeep,
      created: new Date(columnsToKeep.created).toLocaleDateString("hr-HR"),
      updated: new Date(columnsToKeep.updated).toLocaleDateString("hr-HR"),
    };
  });
}
