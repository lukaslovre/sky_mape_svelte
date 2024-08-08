import { get } from "svelte/store";
import { properties } from "../store";
import type { Property } from "../types";

export function getPropertyFromId(id: Property["id"]) {
  return get(properties).find((property) => property.id === id);
}
