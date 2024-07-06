import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:9991");

export function transformPocketbaseUrlToAbsolute(
  fileName: string,
  collectionName: string,
  recordId: string
): string {
  //  http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME
  return `http://127.0.0.1:9991/api/files/${collectionName}/${recordId}/${fileName}`;
}
