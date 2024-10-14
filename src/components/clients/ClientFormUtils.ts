import type { ClientFormFieldType } from "../../types";

// For reference:
// type UserData = {
//   name: string;
//   phone: string;
//   email: string;
//   note: string;
//   filters: Filters | null;
//   favoriteProperties: Property["id"][];
//   userType: "seller" | "buyer";
//   payment_method: "credit" | "cash";
//   agency_id: string;
// } & PocketbaseAttributes;

export const clientFormFields: ClientFormFieldType[] = [
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
    required: true,
    parsingFunction: (value: string) => value.trim(),
    error: null,
  },
  {
    label: "Telefon",
    inputElement: "input",
    databaseFieldName: "phone",
    value: "",
    required: true,
    parsingFunction: (value: string) => value.trim(),
    error: null,
  },
  {
    label: "Tip klijenta",
    inputElement: "select",
    databaseFieldName: "userType",
    value: [],
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
    required: true,
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
    parsingFunction: (value: string) => value,
    error: null,
  },
];

export function transformFields(fields: ClientFormFieldType[]): Record<string, any> {
  return fields.reduce((acc, field) => {
    const parsedValue = field.parsingFunction
      ? field.parsingFunction(field.value)
      : field.value;

    if (parsedValue != undefined) {
      acc[field.databaseFieldName] = parsedValue;
    }

    return acc;
  }, {} as Record<string, any>);
}
