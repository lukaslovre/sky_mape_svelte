import { pb } from "../PocketBaseInit";
import type { Agent } from "../types";

export async function getAgentsFromDb(): Promise<Agent[]> {
  const data = await pb.collection<Agent>("Agents").getFullList();

  console.log(data);

  return data;
}
