import { get, writable } from "svelte/store";
import type { FormFieldType, Property } from "../types";
import { agents, users } from "./store";
import { getCurrentUser } from "../auth";

function createFormStore() {
  const { subscribe, set, update } = writable<FormFieldType[]>([]);

  return {
    subscribe,
    set,
    update,
    initializeFields: (fields: FormFieldType[]) => {
      const currentUser = getCurrentUser();
      set(
        fields.map((field) => {
          if (field.databaseFieldName === "agent_id") {
            field.options = get(agents).map((agent) => ({
              value: agent.id,
              label: agent.name,
            }));
            field.value = [currentUser.id];
            field.disabled = currentUser.role === "agent";
          }
          if (field.databaseFieldName === "ownerId") {
            field.options = get(users).map((user) => ({
              value: user.id,
              label: user.name,
            }));
          }
          return field;
        })
      );
    },
    updateField: (fieldName: string, value: any) => {
      update((fields) =>
        fields.map((field) =>
          field.databaseFieldName === fieldName ? { ...field, value } : field
        )
      );
    },
    setFieldValues: (property: Property) => {
      update((fields) =>
        fields.map((field) => {
          const value = property[field.databaseFieldName];

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
            field.databaseFieldName === "agent_id"
              ? [getCurrentUser().id]
              : field.inputElement === "select"
              ? []
              : field.inputElement === "checkbox"
              ? false
              : "",
          error: null,
        }))
      );
    },
    setErrors: (errors: Record<string, string>) => {
      update((fields) =>
        fields.map((field) => ({
          ...field,
          error: errors[field.databaseFieldName] || null,
        }))
      );
    },
  };
}

export const propertyFormStore = createFormStore();
