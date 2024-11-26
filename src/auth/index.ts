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
  // TODO: set .avatar to have a valid url

  let user = pb.authStore.model as Agent;

  if (user?.avatar) {
    user.avatar = pb.files.getUrl(user, user.avatar, { thumb: "100x100" });
  }

  return user;

  // if (pb?.authStore?.model?.avatar) {
  //   const newUrl = pb.files.getUrl(pb.authStore.model, pb.authStore.model.avatar, {
  //     thumb: "100x100",
  //   });

  //   console.log(newUrl);
  // }

  // return pb.authStore.model as Agent;
}
