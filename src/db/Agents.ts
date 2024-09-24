import type { PocketbaseAttributes, Agent } from "../types";

import { pb } from "./generalAndSetup";

export async function getAgentsFromDb(): Promise<Agent[]> {
  const data = await pb.collection<Agent>("Agents").getFullList();

  console.log(data);

  return data;
}
