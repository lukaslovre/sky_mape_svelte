import type { Tabs } from "../types";
import { dataStore } from "./store.svelte";

type SidebarCategory = "filters" | "selectedProperty";

const initialTab: Tabs = "Map";
export const tabsList: Tabs[] = ["Map", "Properties", "Buyers", "Owners"];

class UiStateStore {
  activeTab = $state(initialTab);
  highlightFiltersContainer = $state(false);

  selectedSidebarCategory = $derived<SidebarCategory>(
    dataStore.selectedPropertyIds.length > 0 ? "selectedProperty" : "filters"
  );
}

export const uiStateStore = new UiStateStore();
