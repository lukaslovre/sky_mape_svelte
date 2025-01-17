import { derived, writable, type Readable, type Writable } from "svelte/store";
import type { Tabs } from "../types";
import { dataStore } from "./store.svelte";

type SidebarCategory = "filters" | "selectedProperty";

class UiStateStore {
  selectedSidebarCategory = $derived<SidebarCategory>(
    dataStore.selectedPropertyIds.length > 0 ? "selectedProperty" : "filters"
  );
}

export const uiStateStore = new UiStateStore();

// Actions

const initialTab: Tabs = "Map";
export const tabsList: Tabs[] = ["Map", "Properties", "Buyers", "Owners"];
export const activeTab: Writable<Tabs> = writable(initialTab);
