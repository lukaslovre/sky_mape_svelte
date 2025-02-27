import { pb } from "./client";
import type { Agent } from "../../../types";

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
  let user = pb.authStore.record as Agent | null;

  if (user?.avatar) {
    user.avatar = pb.files.getURL(user, user.avatar, { thumb: "100x100" });
  }

  return user;
}
