import { getCurrentUser } from "../auth";
import type { Client, FormFieldType } from "../types";
import { FiltersSchemaWithDefaults, filtersStore } from "./filtersStore.svelte";
import { dataStore } from "./store.svelte";
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

const clientFormFields: FormFieldType<Client>[] = [
  {
    label: "Agency ID",
    inputElement: "input",
    databaseFieldName: "agency_id",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => value.trim(),
    validators: [],
    required: true,
    disabled: true,
  },
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
    label: "Tip klijenta",
    inputElement: "select",
    databaseFieldName: "userType",
    value: ["buyer"],
    defaultValue: ["buyer"],
    options: [
      { value: "seller", label: "Prodavač" },
      { value: "buyer", label: "Kupac" },
    ],
    validators: [],
    required: true,
  },
  {
    label: "Ime i prezime",
    inputElement: "input",
    databaseFieldName: "name",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => value.trim(),
    validators: [],
    required: true,
    placeholder: "John Doe",
  },
  {
    label: "Email",
    inputElement: "input",
    databaseFieldName: "email",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => value.trim(),
    validators: [validators.emailValidator],
    placeholder: "example@gmail.com",
  },
  {
    label: "Telefon",
    inputElement: "input",
    databaseFieldName: "phone",
    value: "",
    defaultValue: "",
    parsingFunction: (value: string) => value.trim(),
    validators: [],
    placeholder: "098 123 4567",
  },

  {
    label: "Način plaćanja",
    inputElement: "select",
    databaseFieldName: "payment_method",
    value: [],
    defaultValue: [],
    options: [
      { value: "credit", label: "Kredit" },
      { value: "cash", label: "Gotovina" },
    ],
    validators: [],
  },
  {
    label: "Bilješka",
    inputElement: "textarea",
    databaseFieldName: "note",
    value: "",
    defaultValue: "",
    placeholder: "#Naslov\nInformacije o klijentu",
    parsingFunction: (value: string) => value.trim(),
    validators: [],
  },
];

class ClientFormStore {
  fields = $state(clientFormFields);

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

      // If agency_id field, set it to the current agency
      if (field.databaseFieldName === "agency_id") {
        const currentAgencyId = getCurrentUser()?.agency_id;
        if (currentAgencyId) {
          field.value = currentAgencyId;
        }
      }

      // 2. Reset errors
      field.error = undefined;
    });
  };

  //   Napravljeno nabrzinu, možda ima neki edge case
  formatForUploadingToDatabase = () => {
    const formattedData = this.fields.reduce((acc, field) => {
      return {
        ...acc,
        [field.databaseFieldName]: field.value,
      };
    }, {} as Client);

    // Add filters and favorited properties
    formattedData.filters = filtersStore.filters;
    formattedData.favoriteProperties = dataStore.favoriteProperties;

    return formattedData;
  };

  setFieldValue = (fieldName: keyof Client, value: any) => {
    console.log("Setting field value:", fieldName, value);

    const field = this.fields.find((field) => field.databaseFieldName === fieldName);
    if (field) {
      field.value = value;
    }
  };

  setError = (fieldName: keyof Client, error: string) => {
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

  //   TODO: postavit i filter i favorite properties?? (razmislit)
  setFieldValuesFromClientObject = (client: Client) => {
    this.fields.forEach((field) => {
      if (Array.isArray(field.value)) {
        field.value =
          client[field.databaseFieldName] === "" ? [] : [client[field.databaseFieldName]];
      } else {
        field.value = client[field.databaseFieldName];
      }
    });

    console.log("Fields after setting values from client object:", this.fields);

    // Set filters and favorite properties
    const zodResponse = FiltersSchemaWithDefaults.safeParse(client.filters);
    if (zodResponse.success) {
      filtersStore.filters = zodResponse.data;
    } else {
      console.log(zodResponse.error);
    }

    dataStore.favoriteProperties = client.favoriteProperties;
  };
}

export const clientFormStore = new ClientFormStore();
