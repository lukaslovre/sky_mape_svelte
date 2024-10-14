import { getCurrentUser } from "../auth";
import type { FormFieldType, UserData } from "../types";
import { createFormStore } from "./formStoreCreator";

export const clientFormStore = createFormStore<UserData>();

export const clientFormFields: FormFieldType<UserData>[] = [
  {
    label: "Agency ID",
    inputElement: "input",
    databaseFieldName: "agency_id",
    value: getCurrentUser()?.agency_id || "",
    required: true,
    disabled: true,
    parsingFunction: (value: string) => value,
    error: null,
  },
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
    label: "Ime",
    inputElement: "input",
    databaseFieldName: "name",
    value: "",
    required: true,
    parsingFunction: (value: string) => value.trim(),
    error: null,
  },
  {
    label: "Email",
    inputElement: "input",
    databaseFieldName: "email",
    value: "",
    required: false,
    parsingFunction: (value: string) => value.trim(),
    error: null,
  },
  {
    label: "Telefon",
    inputElement: "input",
    databaseFieldName: "phone",
    value: "",
    required: false,
    parsingFunction: (value: string) => value.trim(),
    error: null,
  },
  {
    label: "Tip klijenta",
    inputElement: "select",
    databaseFieldName: "userType",
    value: ["buyer"],
    required: true,
    options: [
      { value: "seller", label: "Prodavatelj" },
      { value: "buyer", label: "Kupac" },
    ],
    parsingFunction: (value: string[]) => value[0],
    error: null,
  },
  {
    label: "Način plaćanja",
    inputElement: "select",
    databaseFieldName: "payment_method",
    value: [],
    required: false,
    options: [
      { value: "credit", label: "Kredit" },
      { value: "cash", label: "Gotovina" },
    ],
    parsingFunction: (value: string[]) => value[0],
    error: null,
  },
  {
    label: "Bilješka",
    inputElement: "textarea",
    databaseFieldName: "note",
    value: "",
    required: false,
    parsingFunction: (value: string) => value.trim(),
    error: null,
  },
];

clientFormStore.initializeFields(clientFormFields);
