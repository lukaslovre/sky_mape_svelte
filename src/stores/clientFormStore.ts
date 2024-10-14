import { writable } from "svelte/store";
import type { ClientFormFieldType, UserData } from "../types";

import { getCurrentUser } from "../auth";

function createFormStore() {
  const { subscribe, set, update } = writable<ClientFormFieldType[]>([]);

  return {
    subscribe,
    set,
    update,
    initializeFields: (fields: ClientFormFieldType[]) => {
      const currentUser = getCurrentUser();
      set(
        fields.map((field) => {
          return field;
        })
      );
    },
    updateField: (fieldName: keyof UserData, value: any) => {
      update((fields) =>
        fields.map((field) =>
          field.databaseFieldName === fieldName ? { ...field, value } : field
        )
      );
    },
    setFieldValues: (user: UserData) => {
      update((fields) =>
        fields.map((field) => {
          const value = user[field.databaseFieldName];

          if (value != undefined && value !== "") {
            if (field.inputElement === "imageInput") {
              return { ...field, value: "" };
            } else if (field.inputElement === "select") {
              return { ...field, value: [value] };
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
        })
      );
    },

    clearFields: () => {
      update((fields) =>
        fields.map((field) => ({
          ...field,
          value:
            field.inputElement === "select"
              ? []
              : field.inputElement === "checkbox"
              ? false
              : "",
          error: null,
        }))
      );
    },
    setErrors: (errors: Record<keyof UserData, string>) => {
      update((fields) =>
        fields.map((field) => ({
          ...field,
          error: errors[field.databaseFieldName] || null,
        }))
      );
    },
  };
}

export const clientFormStore = createFormStore();
