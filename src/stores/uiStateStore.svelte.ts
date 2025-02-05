import type { Tabs } from "../types";
import { dataStore } from "./store.svelte";

type SidebarCategory = "filters" | "selectedProperty";

const initialTab: Tabs = "Map";
export const tabsList: Tabs[] = ["Map", "Properties", "Buyers", "Owners"];

class UiStateStore {
  // State values
  activeTab: Tabs = $state(initialTab);
  highlightFiltersContainer: boolean = $state(false);

  propertyFormVisible: boolean = $state(false);
  clientFormVisible: boolean = $state(false);
  ownerFormVisible: boolean = $state(false);

  // Derived values
  selectedSidebarCategory: SidebarCategory = $derived<SidebarCategory>(
    dataStore.selectedPropertyIds.length > 0 ? "selectedProperty" : "filters"
  );
}

export const uiStateStore = new UiStateStore();
