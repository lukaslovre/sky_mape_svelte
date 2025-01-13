import { z } from "zod";

// 1. Make a zod schema for the Filters type and infer the type from zod
// 2. Create a store for the Filters type, which will have validations and methods for handling filters
// 3. Replace the current Filter implementations with the new store

const FiltersSchema = z.object({
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

type Filter = z.infer<typeof FiltersSchema>;

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

  // method for resetting filters
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
}

export const filtersStore = new FiltersStore();

// filtersStore.setField("maxArea", )
