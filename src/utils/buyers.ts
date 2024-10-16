import type { UserData } from "../types";

export function parsePocketbaseUserData(data: UserData[]): Partial<UserData>[] {
  return data.map((user) => {
    const { collectionId, collectionName, ...columnsToKeep } = user;

    return {
      ...columnsToKeep,
      created: new Date(columnsToKeep.created).toLocaleDateString("hr-HR"),
      updated: new Date(columnsToKeep.updated).toLocaleDateString("hr-HR"),
    };
  });
}
