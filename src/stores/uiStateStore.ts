import { writable, type Writable } from "svelte/store";

type SidebarCategory = "filters" | "selectedProperty";

// let initialSidebarCategory: SidebarCategory = "filters";
let initialSidebarCategory: SidebarCategory = "selectedProperty";

export const selectedSidebarCategory: Writable<SidebarCategory> =
  writable(initialSidebarCategory);

// Actions

export function setSidebarCategory(category: SidebarCategory) {
  selectedSidebarCategory.set(category);
}
