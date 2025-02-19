import { z } from "zod";
import type { Client, Property } from "../../types";
import { dataStore } from "./store.svelte";

export const FiltersSchema = z.object({
  polygons: z.array(
    z.array(
      z.object({
        lat: z.number(),
        lng: z.number(),
      })
    )
  ),
  type: z.array(z.enum(["Apartment", "House", "Land", "Commercial"])),
  action: z.array(z.enum(["Rent", "Sale"])),
  maxPrice: z.coerce.number(),
  minPrice: z.coerce.number(),
  maxArea: z.coerce.number(),
  minArea: z.coerce.number(),
  visibility: z.array(z.enum(["Visible", "Hidden"])),
  status: z.array(z.enum(["available", "processing", "sold"])),
  agentIds: z.array(z.string()),
});

export const FiltersSchemaWithDefaults = FiltersSchema.partial().transform((data) => ({
  ...getEmptyFilters(),
  ...data,
}));

const FavoritePropertiesSchema = z.array(z.string());

export type Filter = z.infer<typeof FiltersSchema>;
export type FilterDifferences = Record<
  keyof Filter | "favoriteProperties",
  { removed: any[]; added: any[] }
>;

function getEmptyFilters(): Filter {
  return {
    polygons: [],
    type: [],
    action: [],
    maxPrice: 0,
    minPrice: 0,
    maxArea: 0,
    minArea: 0,
    visibility: [],
    status: [],
    agentIds: [],
  };
}

class FiltersStore {
  filters = $state<Filter>(getEmptyFilters());
  favoriteProperties = $state<Property["id"][]>([]);
  belongsToClientId = $state<Client["id"] | undefined>();

  ////////
  // General methods
  ////////

  resetFilters = (
    additional: { favorites?: boolean; belongsToClient?: boolean } = {}
  ) => {
    this.filters = getEmptyFilters();
    if (additional.favorites) this.resetFavoriteProperties();
    if (additional.belongsToClient) this.belongsToClientId = undefined;
  };

  setField = (field: keyof Filter, newValue: any) => {
    // Validate the field using the zod schema
    const fieldSchema = FiltersSchema.shape[field];
    const zodResult = fieldSchema.safeParse(newValue);
    if (zodResult.success) {
      this.filters[field] = zodResult.data as any;
    } else {
      console.log(zodResult.error);
    }
  };

  removeEmptyFilterFields = (data?: Filter): Partial<Filter> => {
    const targetData = data || this.filters; // It can use either the internal state or an external object

    const nonEmptyFields = Object.entries(targetData).filter(
      ([key, value]) => value && (!Array.isArray(value) || value.length > 0)
    );

    return Object.fromEntries(nonEmptyFields);
  };

  isEmpty = (data?: Filter, includeFavorites?: boolean): boolean => {
    const targetData = data || this.filters; // It can use either the internal state or an external object

    const onlyFiltersAreEmpty =
      Object.keys(this.removeEmptyFilterFields(targetData)).length === 0;

    const favoritesAreEmpty = includeFavorites
      ? this.favoriteProperties.length === 0
      : true;
    return onlyFiltersAreEmpty && favoritesAreEmpty;
  };

  loadFiltersFromClient = (client: Client) => {
    const zodResult = FiltersSchemaWithDefaults.safeParse(client.filters);
    const favoritePropertiesResult = FavoritePropertiesSchema.safeParse(
      client.favoriteProperties
    );
    console.log(zodResult);

    if (zodResult.success && favoritePropertiesResult.success) {
      this.filters = zodResult.data;
      this.belongsToClientId = client.id;
      this.favoriteProperties = favoritePropertiesResult.data;
    } else {
      console.log(zodResult.error);
      console.log(favoritePropertiesResult.error);
    }
  };

  // A method to get the differences between two filters. Like a diff method.
  // Returns an object with the differences between two filters, where key is field name and value is {removed: [], added: []}
  getFilterDifferences = (
    baselineFilter: Filter,
    baselineFavoriteProperties: Property["id"][],
    newFilter: Filter,
    newFavoriteProperties: Property["id"][]
  ): FilterDifferences => {
    const differences = {} as FilterDifferences;

    // Simple deep equality check. TODO: Consider using a proper deep equality library if needed.
    const deepEqual = (a: any, b: any): boolean => {
      return JSON.stringify(a) === JSON.stringify(b);
    };

    // Computes differences between two arrays using deep equality.
    const arrayDifference = (
      current: any[],
      newArr: any[]
    ): { removed: any[]; added: any[] } => {
      const removed = current.filter((item) => !newArr.some((x) => deepEqual(x, item)));
      const added = newArr.filter((item) => !current.some((x) => deepEqual(x, item)));
      return { removed, added };
    };

    for (const key in baselineFilter) {
      const currentValue = baselineFilter[key as keyof Filter];
      const newValue = newFilter[key as keyof Filter];

      // If both are numbers.
      if (typeof currentValue === "number" && typeof newValue === "number") {
        if (currentValue !== newValue) {
          differences[key as keyof Filter] = {
            removed: [currentValue],
            added: [newValue],
          };
        }
      }
      // If both are arrays.
      else if (Array.isArray(currentValue) && Array.isArray(newValue)) {
        const diff = arrayDifference(currentValue, newValue);
        if (diff.removed.length > 0 || diff.added.length > 0) {
          differences[key as keyof Filter] = diff;
        }
      }
      // For other types, using deep equality.
      else {
        if (!deepEqual(currentValue, newValue)) {
          differences[key as keyof Filter] = {
            removed: [currentValue],
            added: [newValue],
          };
        }
      }
    }

    // Favorite properties diff
    const favoriteDiff = arrayDifference(
      baselineFavoriteProperties,
      newFavoriteProperties
    );
    if (favoriteDiff.removed.length > 0 || favoriteDiff.added.length > 0) {
      differences.favoriteProperties = favoriteDiff;
    }

    return differences;
  };

  ////////
  // Polygon methods
  ////////

  addPolygon = (newPolygon: Filter["polygons"][0]) => {
    this.setField("polygons", [...this.filters.polygons, newPolygon]);
  };

  removePolygon = (polygon: Filter["polygons"][0]) => {
    this.filters.polygons = this.filters.polygons.filter(
      (currentPolygon) => currentPolygon !== polygon
    );
  };

  ////////
  // Favorite properties methods
  ////////
  addFavoriteProperty = (propertyId: Property["id"]) => {
    const property: Property[] = dataStore.getPropertiesByIds([propertyId]);
    if (property.length === 0) return;

    if (this.favoriteProperties.includes(propertyId)) return;

    this.favoriteProperties.push(propertyId);
  };

  removeFavoriteProperty = (propertyId: Property["id"]) => {
    this.favoriteProperties = this.favoriteProperties.filter((id) => id !== propertyId);
  };

  resetFavoriteProperties = () => {
    this.favoriteProperties = [];
  };

  isFavoriteProperty = (propertyId: Property["id"]): boolean => {
    return this.favoriteProperties.includes(propertyId);
  };
}

export const filtersStore = new FiltersStore();
