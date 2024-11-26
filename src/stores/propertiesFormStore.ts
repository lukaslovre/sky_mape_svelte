import { getCurrentUser } from "../auth";
import type { FormFieldType, Property, UserData } from "../types";
import { createFormStore } from "./formStoreCreator";
import { agents, users } from "./store";

// Call the createFormStore function with the appropriate type parameter
export const propertyFormStore = createFormStore<Property>();

export const propertyFormFields: FormFieldType<Property>[] = [
  {
    label: "ID",
    inputElement: "input",
    databaseFieldName: "id",
    value: "",
    required: false,
    disabled: true,
    parsingFunction: (value: string) => value,
    error: null,
  },
  {
    label: "Agent",
    inputElement: "select",
    databaseFieldName: "agent_id",
    value: [],
    required: true,
    options: [],
    disabled: false,
    parsingFunction: (value: string[]) => value[0],
    error: null,
  },
  {
    label: "Lat & Lng",
    inputElement: "latLngMapInput",
    databaseFieldName: "lat",
    value: {
      lat: 45.815011,
      lng: 15.981919,
    },
    required: true,
    parsingFunction: (value: { lat: number; lng: number }) => value,
    error: null,
  },
  {
    label: "Property Type",
    inputElement: "select",
    databaseFieldName: "type",
    value: [],
    required: true,
    options: [
      { value: "House", label: "House" },
      { value: "Apartment", label: "Apartment" },
      { value: "Land", label: "Land" },
      { value: "Commercial", label: "Commercial" },
    ],
    parsingFunction: (value: string[]) => value[0],
    error: null,
  },
  {
    label: "Action",
    inputElement: "select",
    databaseFieldName: "action",
    value: [],
    required: true,
    options: [
      { value: "Sale", label: "Sale" },
      { value: "Rent", label: "Rent" },
    ],
    parsingFunction: (value: string[]) => value[0],
    error: null,
  },
  {
    label: "Image (max 10MB)",
    inputElement: "imageInput",
    databaseFieldName: "imgUrl",
    value: "",
    required: false,
    parsingFunction: (value: File) => {
      console.log("Original value:", value);
      const parsedValue = value || undefined;
      console.log("Parsed value:", parsedValue);
      return parsedValue;
    },
    error: null,
  },
  {
    label: "Price (€) (može se koristiti slovo 'k' ili 'm')",
    inputElement: "input",
    databaseFieldName: "price",
    value: "",
    required: false,
    parsingFunction: (value: string) => {
      const parsedValue = parseFloat(value);
      return isNaN(parsedValue) ? undefined : parsedValue;
    },
    error: null,
  },
  {
    label: "Surface Area (m²) (može se koristiti slovo 'k' ili 'm')",
    inputElement: "input",
    databaseFieldName: "surfaceArea",
    value: "",
    required: false,
    parsingFunction: (value: string) => {
      const parsedValue = parseFloat(value);
      return isNaN(parsedValue) ? undefined : parsedValue;
    },
    error: null,
  },
  {
    label: "Website URL",
    inputElement: "input",
    databaseFieldName: "websiteUrl",
    value: "",
    required: false,
    parsingFunction: (value: string) => (value ? value : undefined),
    error: null,
  },
  {
    label: "Hidden on Website",
    inputElement: "checkbox",
    databaseFieldName: "hiddenOnWebsite",
    value: false,
    required: false,
    parsingFunction: (value: boolean) => !!value,
    error: null,
  },
  {
    label: "Bedrooms",
    inputElement: "input",
    databaseFieldName: "bedrooms",
    value: "",
    required: false,
    parsingFunction: (value: string) => {
      const parsedValue = parseInt(value);
      return isNaN(parsedValue) ? undefined : parsedValue;
    },
    error: null,
  },
  {
    label: "Bathrooms",
    inputElement: "input",
    databaseFieldName: "bathrooms",
    value: "",
    required: false,
    parsingFunction: (value: string) => {
      const parsedValue = parseInt(value);
      return isNaN(parsedValue) ? undefined : parsedValue;
    },
    error: null,
  },
  {
    label: "Owner",
    inputElement: "select",
    databaseFieldName: "ownerId",
    value: [],
    required: false,
    options: [],
    disabled: false,
    parsingFunction: (value: string[]) => value[0],
    error: null,
  },
  {
    label: "Property Notes",
    inputElement: "textarea",
    databaseFieldName: "propertyNotes",
    value: "",
    required: false,
    parsingFunction: (value: string) => value.trim(),
    error: null,
  },
  {
    label: "Seller Notes",
    inputElement: "textarea",
    databaseFieldName: "sellerNotes",
    value: "",
    required: false,
    parsingFunction: (value: string) => value.trim(),
    error: null,
  },
  {
    label: "Status",
    inputElement: "select",
    databaseFieldName: "status",
    value: ["available"],
    required: true,
    options: [
      { value: "available", label: "Available" },
      { value: "processing", label: "Processing" },
      { value: "sold", label: "Sold" },
    ],
    parsingFunction: (value: string[]) => value[0],
    error: null,
  },
];

propertyFormStore.initializeFields(propertyFormFields);

// Subscribe to the agents and users stores and update the options of the select fields
agents.subscribe((agents) => {
  if (Array.isArray(agents)) {
    // Set the options of the "agent_id" field to the agents
    propertyFormStore.updateFieldOptions(
      "agent_id",
      agents.map((agent) => ({
        value: agent.id,
        label: agent.name,
      }))
    );
  }

  // Set the value of the "agent_id" field to the current user
  const currentUser = getCurrentUser()?.id ? [getCurrentUser().id] : undefined;
  if (currentUser) {
    propertyFormStore.updateFieldValue("agent_id", currentUser);
  }
});

users.subscribe((users) => {
  if (Array.isArray(users)) {
    propertyFormStore.updateFieldOptions(
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
