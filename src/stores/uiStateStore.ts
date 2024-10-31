import { derived, writable, type Readable, type Writable } from "svelte/store";
import { selectedPropertyIds } from "./store";

type SidebarCategory = "filters" | "selectedProperty";

// let initialSidebarCategory: SidebarCategory = "filters";
let initialSidebarCategory: SidebarCategory = "selectedProperty";

// selectedSidebarCategory should actually be a derived value that depends on selectedPropertyIds
export const selectedSidebarCategory: Readable<SidebarCategory> = derived(
  selectedPropertyIds,
  ($selectedPropertyIds) =>
    $selectedPropertyIds.length > 0 ? "selectedProperty" : "filters"
);

// Actions
