import { get } from "svelte/store";
import { agents } from "../../../stores/store";
import type { FormFieldType, Property } from "../../../types";

export const propertyFormFields: FormFieldType[] = [
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
    options: get(agents).map((agent) => ({
      value: agent.id,
      label: agent.name,
    })),
    disabled: false,
    parsingFunction: (value: string[]) => value[0],
    error: null,
  },
  {
    label:
      "Latitude (Shift+Click na `Karta` kopira koordinate u međuspremnik, Ctrl+V za paste)",
    inputElement: "input",
    databaseFieldName: "lat",
    value: "",
    required: true,
    parsingFunction: (value: string) => parseFloat(value),
    error: null,
  },
  {
    label: "Longitude",
    inputElement: "input",
    databaseFieldName: "lng",
    value: "",
    required: true,
    parsingFunction: (value: string) => parseFloat(value),
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
    label: "Image URLs",
    inputElement: "imageInput",
    databaseFieldName: "imgUrl",
    value: "",
    required: false,
    parsingFunction: (value: File) => value,
    error: null,
  },
  {
    label: "Price (€)",
    inputElement: "input",
    databaseFieldName: "price",
    value: "",
    required: false,
    parsingFunction: (value: string) => parseFloat(value),
    error: null,
  },
  {
    label: "Surface Area (m²)",
    inputElement: "input",
    databaseFieldName: "surfaceArea",
    value: "",
    required: false,
    parsingFunction: (value: string) => parseFloat(value),
    error: null,
  },
  {
    label: "Website URL",
    inputElement: "input",
    databaseFieldName: "websiteUrl",
    value: "",
    required: false,
    parsingFunction: (value: string) => value,
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
    parsingFunction: (value: string) => parseInt(value),
    error: null,
  },
  {
    label: "Bathrooms",
    inputElement: "input",
    databaseFieldName: "bathrooms",
    value: "",
    required: false,
    parsingFunction: (value: string) => parseInt(value),
    error: null,
  },
  {
    label: "Owner",
    inputElement: "select",
    databaseFieldName: "ownerId",
    value: [],
    required: false,
    options: [{ value: "John Doe", label: "John Doe" }], // TODO: It should be fetched from the database
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

export function cleanErrors(fields: FormFieldType[]) {
  fields.forEach((field) => {
    field.error = null;
  });
}

export function clearFields(fields: FormFieldType[]) {
  fields.forEach((field) => {
    if (field.inputElement === "select") {
      field.value = [];
    } else if (field.inputElement === "checkbox") {
      field.value = false;
    } else {
      field.value = "";
    }
  });
}

export function fillPropertyFormFields(property: Property) {
  propertyFormFields.forEach((field) => {
    if (field.inputElement === "select") {
      if (!property[field.databaseFieldName]) {
        field.value = [];
      } else {
        field.value = [property[field.databaseFieldName]];
      }
    } else if (field.inputElement === "imageInput") {
      field.value = undefined;
    } else {
      field.value = property[field.databaseFieldName];
    }
  });
}
