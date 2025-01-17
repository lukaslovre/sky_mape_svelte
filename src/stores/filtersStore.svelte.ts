import { z } from "zod";

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

  removeEmptyFilterFields: () => Partial<Filter> = () => {
    // The values are either number or array, so we have to check for falsy values and empty arrays

    const nonEmptyFields = Object.entries(this.filters).filter(
      ([key, value]) => value && (!Array.isArray(value) || value.length > 0)
    );

    return Object.fromEntries(nonEmptyFields);
  };

  isEmpty = () => {
    return Object.keys(this.removeEmptyFilterFields()).length === 0;
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

// filtersStore.setField("maxArea", )
