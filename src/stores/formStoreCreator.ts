// Import necessary functions and types
import { get, writable } from "svelte/store";
import type { FormFieldType } from "../types";
import { getCurrentUser } from "../auth";

// Create a custom store for managing form fields
export function createFormStore<T>() {
  // Initialize a writable store with an empty array of PropertyFormFieldType
  const { subscribe, set, update } = writable<FormFieldType<T>[]>([]);

  // Return an object with methods to interact with the store
  return {
    subscribe,
    set,
    update,
    // Initialize form fields with given fields and set some default values
    initializeFields: (fields: FormFieldType<T>[]) => {
      set(fields);
    },
    // Update a specific field's value
    updateFieldValue: (fieldName: keyof T, value: any) => {
      update((fields) =>
        fields.map((field) =>
          field.databaseFieldName === fieldName ? { ...field, value } : field
        )
      );
    },
    // Update the options of a select field
    updateFieldOptions: (
      fieldName: keyof T,
      options: { value: string; label: string }[]
    ) => {
      update((fields) =>
        fields.map((field) =>
          field.databaseFieldName === fieldName ? { ...field, options } : field
        )
      );
    },
    // Set field values based on a given object
    setFieldValues: (data: Partial<T>) => {
      update((fields) =>
        fields.map((field) => {
          // Special case for latLng input, will refactor in the future
          if (field.databaseFieldName === "lat") {
            // If the field is lat, it means the data is a latLng object, so we need to split it and set the values of lat and lng
            //  access the lat and lng values from the data object
            const lat = data["lat"];
            const lng = data["lng"];

            // If the values are not undefined, set the values of the lat and lng fields
            if (lat != undefined && lng != undefined) {
              return {
                ...field,
                value: { lat, lng },
              };
            } else {
              return field;
            }
          } else {
            const value = data[field.databaseFieldName];

            if (
              value != undefined &&
              value !== "" &&
              (!Array.isArray(value) || value.length > 0)
            ) {
              if (field.inputElement === "imageInput") {
                return { ...field, value: "" };
              } else if (field.inputElement === "select") {
                if (!Array.isArray(value)) {
                  return { ...field, value: [value] };
                } else {
                  return { ...field, value };
                }
              } else {
                return { ...field, value };
              }
            } else {
              if (field.inputElement === "select") {
                return { ...field, value: [] };
              } else {
                return { ...field, value: "" };
              }
            }
          }
        })
      );
    },

    // Clear all field values and errors
    clearFields: () => {
      update((fields) =>
        fields.map((field) => {
          let defaultValue;

          switch (field.databaseFieldName) {
            case "agent_id":
              defaultValue = getCurrentUser()?.id ? [getCurrentUser().id] : undefined;
              break;
            case "agency_id":
              defaultValue = getCurrentUser()?.agency_id || "";
              break;
            case "lat":
              defaultValue = {
                lat: 45.815011,
                lng: 15.981919,
              };
              break;
            case "status":
              defaultValue = ["available"];
              break;
            case "type":
              defaultValue = ["House"];
              break;
            default:
              switch (field.inputElement) {
                case "select":
                  defaultValue = [];
                  break;
                case "checkbox":
                  defaultValue = false;
                  break;
                default:
                  defaultValue = "";
              }
          }

          return {
            ...field,
            value: defaultValue,
            error: null,
          };
        })
      );
    },
    // Set error messages for fields
    setErrors: (errors: Partial<Record<keyof T, string>>) => {
      update((fields) =>
        fields.map((field) => ({
          ...field,
          error: errors[field.databaseFieldName] || null,
        }))
      );
    },
    // Transform the fields to a record of values
    getAndTransformFields: () => {
      const fields = get({ subscribe });

      return fields
        .map((field) => {
          const value = field.parsingFunction
            ? field.parsingFunction(field.value)
            : field.value;

          // If it's undefined, don't include it
          if (value == undefined) {
            return {};
          }

          // If its the special latLng input, split it into lat and lng
          // (Need special case because its 1 field but 2 values)
          if (field.inputElement === "latLngMapInput") {
            // Value is now {lat: number, lng: number}
            return {
              lat: value.lat,
              lng: value.lng,
            };
          }

          return { [field.databaseFieldName]: value };
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as Partial<T>;
    },
  };
}
