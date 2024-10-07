import type { FormFieldType } from "../../../types";

export const propertyFormFields: FormFieldType[] = [
  {
    label: "Latitude",
    inputElement: "input",
    databaseFieldName: "lat",
    value: "",
    inputType: "number",
    required: true,
  },
  {
    label: "Longitude",
    inputElement: "input",
    databaseFieldName: "lng",
    value: "",
    inputType: "number",
    required: true,
  },
  {
    label: "Property Type",
    inputElement: "select",
    databaseFieldName: "type",
    value: [],
    required: true,
    options: [
      { value: "house", label: "House" },
      { value: "apartment", label: "Apartment" },
      { value: "condo", label: "Condominium" },
      { value: "townhouse", label: "Townhouse" },
      // Add other PropertyType options as needed
    ],
  },
  {
    label: "Action",
    inputElement: "select",
    databaseFieldName: "action",
    value: [],
    required: true,
    options: [
      { value: "sale", label: "Sale" },
      { value: "rent", label: "Rent" },
      // Add other PropertyAction options as needed
    ],
  },
  {
    label: "Image URLs",
    inputElement: "input",
    databaseFieldName: "imgUrl",
    value: "",
    required: false,
    // Consider using a specialized component for multiple URLs
  },
  // {
  //   label: "Title",
  //   inputElement: "input",
  //   databaseFieldName: "title",
  //   value: "",
  //   inputType: "text",
  //   required: true,
  // },
  {
    label: "Price",
    inputElement: "input",
    databaseFieldName: "price",
    value: "",
    inputType: "number",
    required: true,
  },
  // {
  //   label: "Description",
  //   inputElement: "textarea",
  //   databaseFieldName: "description",
  //   value: "",
  //   required: true,
  // },
  {
    label: "Surface Area (sq ft)",
    inputElement: "input",
    databaseFieldName: "surfaceArea",
    value: "",
    inputType: "number",
    required: true,
  },
  {
    label: "Website URL",
    inputElement: "input",
    databaseFieldName: "websiteUrl",
    value: "",
    inputType: "url",
    required: false,
  },
  {
    label: "Hidden on Website",
    inputElement: "checkbox",
    databaseFieldName: "hiddenOnWebsite",
    value: false,
    required: false,
  },
  {
    label: "Bedrooms",
    inputElement: "input",
    databaseFieldName: "bedrooms",
    value: "",
    inputType: "number",
    required: true,
  },
  {
    label: "Bathrooms",
    inputElement: "input",
    databaseFieldName: "bathrooms",
    value: "",
    inputType: "number",
    required: true,
  },
  {
    label: "Owner",
    inputElement: "select",
    databaseFieldName: "ownerId",
    value: [],
    required: true,
    options: [
      // Populate with UserData IDs and Names
      // Example:
      // { value: "user1", label: "John Doe" },
      // { value: "user2", label: "Jane Smith" },
    ],
    disabled: false,
  },
  {
    label: "Property Notes",
    inputElement: "textarea",
    databaseFieldName: "propertyNotes",
    value: "",
    required: false,
  },
  {
    label: "Seller Notes",
    inputElement: "textarea",
    databaseFieldName: "sellerNotes",
    value: "",
    required: false,
  },
  {
    label: "Agent",
    inputElement: "select",
    databaseFieldName: "agent_id",
    value: [],
    required: true,
    options: [
      // Populate with Agent IDs and Names
      // Example:
      // { value: "agent1", label: "Agent A" },
      // { value: "agent2", label: "Agent B" },
    ],
    disabled: false,
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
  },
];
