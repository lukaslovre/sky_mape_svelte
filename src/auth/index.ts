import { pb } from "../PocketBaseInit";
import type { Agent } from "../types";

export function userIsAuthenticated(): boolean {
  return pb.authStore.isValid;
}

export async function authorizeWithUserAndPass(username: string, password: string) {
  const authData = await pb.collection("users").authWithPassword(username, password);
  console.log(authData);
}

export function logOut() {
  pb.authStore.clear();
}

export function getCurrentUser() {
  return pb.authStore.model as Agent;
}
