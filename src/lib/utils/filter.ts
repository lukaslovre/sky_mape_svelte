import type { Filters } from "../../types";

export function emptyFiltersObject(): Filters {
  return {
    action: [],
    type: [],
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
    polygons: [],
  };
}
