import { pb } from "../PocketBaseInit";
import type { Agent } from "../types";

export async function getAgentsFromDb(): Promise<Agent[]> {
  const data = await pb.collection<Agent>("users").getFullList();

  console.log(data);

  return data.map(parseAgentData);
}

function parseAgentData(agent: Agent): Agent {
  return {
    ...agent,
    avatar: pb.files.getUrl(agent, agent.avatar),
  };
}
