import { get, writable } from "svelte/store";
import { getCurrentUser } from "../auth";
import type { FormFieldType, Property, Client, InputValidator } from "../types";
import { createFormStore } from "./formStoreCreator";
import { agents, users } from "./store";
import { number, z } from "zod";
import { parseValueWithSuffix } from "../utils/numbers";
import { parse } from "svelte/compiler";

// Call the createFormStore function with the appropriate type parameter
// export const propertyFormStore = createFormStore<Property>();

// type FormFieldType<T> = {
//   label: string;
//   inputElement: InputElement;
//   databaseFieldName: keyof T; // Should I define this if not every field/input is directly mapped to the database? For example, the "latLngMapInput" inputElement is not directly mapped to the database. It is 1 form item for 2 database fields. What would be the best way to handle this?
//   value: any;
//   parsingFunction: InputParsingFunction;
//   validators: InputValidator[];

//   options?: { value: string; label: string }[];
//   placeholder?: string;
//   helperText?: string;
//   required?: boolean;
//   disabled?: boolean;
//   hidden?: boolean;
//   defaultValue?: any;
//   error?: string;
// };

const optionsShape = z.array(
  z.object({
    value: z.string(),
    label: z.string(),
  })
);

const validators: Record<string, InputValidator> = {
  imageSizeValidator: (value: File | undefined) => {
    const maxSizeMb = 10;

    if (value && value.size > maxSizeMb * 1024 * 1024) {
      return `Image size must be less than ${maxSizeMb}MB (current size: ${
        value.size / 1024 / 1024
      }MB)`;
    }
    return null;
  },
  numberValidator: (value: string) => {
    if (!z.number().safeParse(value).success) {
      return "Value must be a number";
    }
    return null;
  },
  urlValidator: (value: string) => {
    if (!z.string().url().safeParse(value).success) {
      return "Value must be a valid URL";
    }
    return null;
  },
};

export const propertyFormFields: FormFieldType<Property>[] = [
  {
    label: "ID",
    inputElement: "input",
    databaseFieldName: "id",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => value.trim(),
    validators: [],
    disabled: true,
  },
  {
    label: "Lat & Lng",
    inputElement: "latLngMapInput",
    databaseFieldName: "lat",
    value: {
      lat: 45.815011,
      lng: 15.981919,
    },
    defaultValue: {
      lat: 45.815011,
      lng: 15.981919,
    },
    validators: [],
    required: true,
  },
  {
    label: "Agent",
    inputElement: "select",
    databaseFieldName: "agent_id",
    value: [],
    defaultValue: [],
    validators: [],
    options: [],
    required: true,
  },
  {
    label: "Property Type",
    inputElement: "select",
    databaseFieldName: "type",
    value: ["House"],
    defaultValue: ["House"],
    options: [
      { value: "House", label: "House" },
      { value: "Apartment", label: "Apartment" },
      { value: "Land", label: "Land" },
      { value: "Commercial", label: "Commercial" },
    ],
    validators: [],
    required: true,
  },
  {
    label: "Action",
    inputElement: "select",
    databaseFieldName: "action",
    value: [],
    defaultValue: [],
    options: [
      { value: "Sale", label: "Sale" },
      { value: "Rent", label: "Rent" },
    ],

    validators: [],
    required: true,
  },
  {
    label: "Image (max 10MB)",
    inputElement: "imageInput",
    databaseFieldName: "imgUrl",
    value: "",
    defaultValue: "",
    // parsingFunction: (value: File) => {
    //   // TODO: check flow
    //   // console.log("Original value:", value);
    //   // const parsedValue = value || undefined;
    //   // console.log("Parsed value:", parsedValue);
    //   // return parsedValue;
    // },
    validators: [validators.imageSizeValidator],
  },
  {
    label: "Price (€) (može se koristiti slovo 'k' ili 'm')",
    inputElement: "input",
    databaseFieldName: "price",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => parseFloat(parseValueWithSuffix(value)),
    validators: [validators.numberValidator],
  },
  {
    label: "Surface Area (m²) (može se koristiti slovo 'k' ili 'm')",
    inputElement: "input",
    databaseFieldName: "surfaceArea",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => parseFloat(parseValueWithSuffix(value)),
    validators: [validators.numberValidator],
  },
  {
    label: "Website URL",
    inputElement: "input",
    databaseFieldName: "websiteUrl",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => value.trim(),
    validators: [validators.urlValidator],
  },
  {
    label: "Hidden on Website",
    inputElement: "checkbox",
    databaseFieldName: "hiddenOnWebsite",
    value: false,
    defaultValue: false,
    parsingFunction: (value: boolean) => !!value,
    validators: [],
  },
  {
    label: "Bedrooms",
    inputElement: "input",
    databaseFieldName: "bedrooms",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => parseInt(value),
    validators: [validators.numberValidator],
  },
  {
    label: "Bathrooms",
    inputElement: "input",
    databaseFieldName: "bathrooms",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => parseInt(value),
    validators: [validators.numberValidator],
  },
  {
    label: "Owner",
    inputElement: "select",
    databaseFieldName: "ownerId",
    value: [],
    defaultValue: [],
    options: [],
    validators: [],
  },
  {
    label: "Property Notes",
    inputElement: "textarea",
    databaseFieldName: "propertyNotes",
    value: "",
    defaultValue: "",
    placeholder: "# Naslov\nInformacije o nekretnini",
    parsingFunction: (value: string) => value.trim(),
    validators: [],
  },
  {
    label: "Seller Notes",
    inputElement: "textarea",
    databaseFieldName: "sellerNotes",
    value: "",
    defaultValue: "",
    placeholder: "# Naslov\nInformacije o prodavaču",
    parsingFunction: (value: string) => value.trim(),
    validators: [],
  },
  {
    label: "Status",
    inputElement: "select",
    databaseFieldName: "status",
    value: ["available"],
    defaultValue: ["available"],
    options: [
      { value: "available", label: "Available" },
      { value: "processing", label: "Processing" },
      { value: "sold", label: "Sold" },
    ],
    validators: [],
    required: true,
  },
];

// PLAN: I am creating a propertyFormStore manually (not from the creatFormStore<Property> function) because I want to add some custom logic to it.
class PropertyFormStore {
  // const { set, update, subscribe } =
  //   writable<FormFieldType<Property>[]>(propertyFormFields);

  fields = $state(propertyFormFields);

  print = () => {
    console.log(
      "Fields:",
      this.fields.map((field) => {
        return {
          id: field.databaseFieldName,
          value: field.value,
        };
      })
    );
  };

  resetForm = () => {
    this.fields.forEach((field) => {
      // If it's an refence type, make a deep copy
      if (Array.isArray(field.defaultValue)) {
        field.value = [...field.defaultValue];
      } else if (typeof field.defaultValue === "object") {
        field.value = { ...field.defaultValue };
      } else {
        // Else, just set the value to the default value
        field.value = field.defaultValue;
      }

      // If agent_id field, set it to the current user
      if (field.databaseFieldName === "agent_id") {
        const currentUser = getCurrentUser();
        if (currentUser) {
          field.value = [currentUser.id];
        }
      }
    });
  };

  setFieldOptions = (
    fieldName: keyof Property,
    newOptions: { value: string; label: string }[]
  ) => {
    // Confirm newOptions shape
    const zodResponse = optionsShape.safeParse(newOptions);
    if (!zodResponse.success) {
      console.error(zodResponse.error);
      return;
    }

    // Update the options of the field with the given fieldName

    const field = this.fields.find((field) => field.databaseFieldName === fieldName);
    if (field) {
      field.options = zodResponse.data;
    }
  };

  setFieldValue = (fieldName: keyof Property, value: any) => {
    console.log("Setting field value:", fieldName, value);

    const field = this.fields.find((field) => field.databaseFieldName === fieldName);
    if (field) {
      field.value = value;
    }
  };
}

export const propertyFormStore = new PropertyFormStore();

// propertyFormStore.initializeFields(propertyFormFields);

// Subscribe to the agents and users stores and update the options of the select fields
agents.subscribe((agents) => {
  if (Array.isArray(agents)) {
    // Set the options of the "agent_id" field to the agents
    propertyFormStore.setFieldOptions(
      "agent_id",
      agents.map((agent) => ({
        value: agent.id,
        label: agent.name,
      }))
    );
  }
});

users.subscribe((users) => {
  if (Array.isArray(users)) {
    propertyFormStore.setFieldOptions(
      "ownerId",
      users
        .filter((user) => user.userType === "seller")
        .map((user) => ({
          value: user.id,
          label: user.name,
        }))
    );
  }
});

// TODO:

// Koraci:
// 1. reaktivno ako je korisnik agent onda je disabled
// 2. Kada se stisne clear onda se postavlja na trenutnog korisnika

// const currentUser = getCurrentUser();
//       field.value = [currentUser.id];
//       field.disabled = currentUser.role === "agent";
