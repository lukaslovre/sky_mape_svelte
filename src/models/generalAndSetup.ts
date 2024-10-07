import { pocketbaseUrl } from "../PocketBaseInit";

export function transformPocketbaseUrlToAbsolute(
  fileName: string,
  collectionName: string,
  recordId: string
): string {
  //  http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME
  return `${pocketbaseUrl}/api/files/${collectionName}/${recordId}/${fileName}`;
}

// TODO: Ima već neka funkcija koja radi ovo, treba je iskoristiti
