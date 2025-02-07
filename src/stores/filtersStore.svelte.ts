import { z } from "zod";
import type { Client } from "../types";

export const FiltersSchema = z.object({
  maxArea: z.coerce.number(),
  minArea: z.coerce.number(),
  maxPrice: z.coerce.number(),
  minPrice: z.coerce.number(),
  type: z.array(z.enum(["Apartment", "House", "Land", "Commercial"])),
  action: z.array(z.enum(["Rent", "Sale"])),
  visibility: z.array(z.enum(["Visible", "Hidden"])),
  status: z.array(z.enum(["available", "processing", "sold"])),
  agentIds: z.array(z.string()),
  polygons: z.array(
    z.array(
      z.object({
        lat: z.number(),
        lng: z.number(),
      })
    )
  ),
});

export const FiltersSchemaWithDefaults = FiltersSchema.partial().transform((data) => ({
  ...emptyFilters,
  ...data,
}));

export type Filter = z.infer<typeof FiltersSchema>;
export type FilterDifferences = Record<keyof Filter, { removed: any[]; added: any[] }>;

// TODO: maybe make this a function that returns a new object
const emptyFilters: Filter = {
  maxArea: 0,
  minArea: 0,
  maxPrice: 0,
  minPrice: 0,
  type: [],
  action: [],
  visibility: [],
  status: [],
  agentIds: [],
  polygons: [],
};

class FiltersStore {
  filters = $state<Filter>(emptyFilters);
  belongsToClientId = $state<Client["id"] | undefined>();

  ////////
  // General methods
  ////////

  resetFilters = () => {
    this.filters = emptyFilters;
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

  removeEmptyFilterFields: (data?: Filter) => Partial<Filter> = (data) => {
    // The values are either number or array, so we have to check for falsy values and empty arrays

    const targetData = data || this.filters; // It can use either the internal state or an external object

    const nonEmptyFields = Object.entries(targetData).filter(
      ([key, value]) => value && (!Array.isArray(value) || value.length > 0)
    );

    return Object.fromEntries(nonEmptyFields);
  };

  isEmpty = () => {
    return Object.keys(this.removeEmptyFilterFields()).length === 0;
  };

  loadFiltersFromClient = (client: Client) => {
    const zodResult = FiltersSchema.safeParse(client.filters);
    console.log(zodResult);
    if (zodResult.success) {
      this.filters = zodResult.data;
      this.belongsToClientId = client.id;
    } else {
      console.log(zodResult.error);
    }
  };

  // A method to get the differences between two filters. Like a diff method.
  // It should return an object with the differences between the two filters, where the key is the field name and the value is an array with the differences in the form of {removed: [], added: []}
  // The method should be able to compare two filters and return the differences between them

  getFilterDifferences = (
    baselineFilter: Filter,
    newFilter: Filter
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
}

export const filtersStore = new FiltersStore();
