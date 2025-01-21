import { getCurrentUser } from "../auth";
import type { FormFieldType, Property } from "../types";
import { z } from "zod";
import { parseValueWithSuffix } from "../utils/numbers";
import { validators } from "./utils/validators";

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

const propertyFormFields: FormFieldType<Property>[] = [
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
    value: ["Sale"],
    defaultValue: ["Sale"],
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
    placeholder: "€ 123456",
  },
  {
    label: "Surface Area (m²) (može se koristiti slovo 'k' ili 'm')",
    inputElement: "input",
    databaseFieldName: "surfaceArea",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => parseFloat(parseValueWithSuffix(value)),
    validators: [validators.numberValidator],
    placeholder: "123 m²",
  },
  {
    label: "Website URL",
    inputElement: "input",
    databaseFieldName: "websiteUrl",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => value.trim(),
    validators: [validators.urlValidator],
    placeholder: "https://example.com",
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
    placeholder: "3 spavaće sobe",
  },
  {
    label: "Bathrooms",
    inputElement: "input",
    databaseFieldName: "bathrooms",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => parseInt(value),
    validators: [validators.numberValidator],
    placeholder: "2 kupaonice",
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

class PropertyFormStore {
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
      // 1. Set values to default values

      // If it's an refence type, make a deep copy
      if (Array.isArray(field.defaultValue)) {
        field.value = [...field.defaultValue];
      } else if (typeof field.defaultValue === "object") {
        field.value = { ...field.defaultValue };
      } else {
        field.value = field.defaultValue;
      }

      // If agent_id field, set it to the current user
      if (field.databaseFieldName === "agent_id") {
        const currentUser = getCurrentUser();
        if (currentUser) {
          field.value = [currentUser.id];
        }
      }

      // 2. Reset errors
      field.error = undefined;
    });
  };

  formatForUploadingToDatabase = () => {
    const formattedData = this.fields.reduce((acc, field) => {
      // Handle special cases

      // Lat & Lng - split the one field into 2 seperate (lat, lng) fields
      if (field.databaseFieldName === "lat") {
        return {
          ...acc,
          lat: field.value.lat,
          lng: field.value.lng,
        };
      } else {
        return {
          ...acc,
          [field.databaseFieldName]: field.value,
        };
      }
    }, {} as Property);

    return formattedData;
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

  setError = (fieldName: keyof Property, error: string) => {
    // Validate that both fieldName and error are strings
    if (typeof fieldName !== "string" || typeof error !== "string") {
      console.error(
        "fieldName and error must be strings when calling the setError method"
      );
      return;
    }

    const field = this.fields.find((field) => field.databaseFieldName === fieldName);
    if (field) {
      field.error = error;
    }
  };

  setFieldValuesFromPropertyObject = (property: Property) => {
    this.fields.forEach((field) => {
      if (field.databaseFieldName === "lat") {
        field.value = {
          lat: property.lat,
          lng: property.lng,
        };
      } else if (field.databaseFieldName === "imgUrl") {
        field.value = "";
      } else if (Array.isArray(field.value)) {
        field.value =
          property[field.databaseFieldName] === ""
            ? []
            : [property[field.databaseFieldName]];
      } else {
        field.value = property[field.databaseFieldName];
      }
    });
    console.log("Fields after setting values from property object:", this.fields);
  };
}

export const propertyFormStore = new PropertyFormStore();
