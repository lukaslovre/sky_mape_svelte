import { pb } from "../PocketBaseInit";
import type { Agent } from "../types";

export async function getAgentsFromDb(): Promise<Agent[]> {
  const data = await pb.collection<Agent>("users").getFullList();

  console.log(data);

  return data.map(parseAgentData);
}

const parseAgentData = (agent: Agent): Agent => {
  return {
    ...agent,
    avatar: agent.avatar ? pb.files.getURL(agent, agent.avatar) : agent.avatar,
  };
};
