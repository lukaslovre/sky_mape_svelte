import PocketBase from "pocketbase";

export const pocketbaseUrl = "http://49.13.64.0:9992";

export const pb = new PocketBase(pocketbaseUrl);

export function transformPocketbaseUrlToAbsolute(
  fileName: string,
  collectionName: string,
  recordId: string
): string {
  //  http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME
  return `${pocketbaseUrl}/api/files/${collectionName}/${recordId}/${fileName}`;
}
