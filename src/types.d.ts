import type { LatLng } from "leaflet";
import type { RecordModel } from "pocketbase";

//////////////
// Pocketbase Collection Types/Schemas
//////////////

type PocketbaseAttributes = RecordModel & {
  created: string;
  updated: string;
};

type Agent = {
  email: string;
  emailVisibility: boolean?;
  verified: boolean?;

  username: string;
  name: string;
  avatar: string?;
  phone: string?;
  role: "admin" | "agent";
  agency_id: Agency["id"];
} & PocketbaseAttributes;

type Agency = {
  name: string;
  active: boolean;
} & PocketbaseAttributes;

type Client = {
  name: string;
  phone: string?;
  email: string?;
  note: string?;
  filters: Filters?;
  favoriteProperties: Property["id"][]; // Returns empty array if not set
  userType: "seller" | "buyer";
  payment_method: "credit" | "cash" | null;
  agency_id: Agency["id"];
} & PocketbaseAttributes;

type Property = {
  lat: number;
  lng: number;
  type: "Apartment" | "House" | "Land" | "Commercial";
  action: "Rent" | "Sale";
  imgUrl: string[]; // Returns empty array if not set
  surfaceArea: number?;
  price: number?;
  websiteUrl: string?;
  hiddenOnWebsite: boolean?;
  bedrooms: number?;
  bathrooms: number?;
  ownerId: Client["id"]?;
  propertyNotes: string?;
  sellerNotes: string?;
  status: "available" | "processing" | "sold";
  agent_id: Agent["id"];
} & PocketbaseAttributes;

// TODO: Use Zod for Filters
type PropertyVisibilityOptions = "Visible" | "Hidden";

type Filters = {
  maxArea: number;
  minArea: number;
  maxPrice: number;
  minPrice: number;
  type: PropertyType[];
  action: PropertyAction[];
  visibility: PropertyVisibilityOptions[];
  status: Property["status"][];
  agentIds: Agent["id"][];
  polygons: LatLng[][];
};

// type InteractionType =
//   | "Contacted"
//   | "PropertyViewingScheduled"
//   | "PropertyViewingCompleted"
//   | "OfferMade"
//   | "OfferReceived"
//   | "Negotiation"
//   | "ContractSigned"
//   | "SaleClosed"
//   | "FollowUp"
//   | "InquiryReceived"
//   | "EmailSent"
//   | "PhoneCall"
//   | "MeetingScheduled"
//   | "DocumentSent"
//   | "PaymentReceived"
//   | "InspectionScheduled"
//   | "AppraisalScheduled"
//   | "Other";

// type Interaction = {
//   agent_id: Agent["id"];
//   user_id?: UserData["id"];
//   property_id?: Property["id"];
//   type: InteractionType;
//   note: string;
//   date?: string;
//   expand?: {
//     agent_id: Agent;
//     user_id?: UserData;
//     property_id?: Property;
//   };
// } & PocketbaseAttributes;

//////////////
// UI Types
//////////////

type Tabs = "Map" | "Properties" | "Buyers" | "Owners"; // | "Interactions" | "Admin";
type DialogType = "saveBuyer" | "saveProperty";
type MenuItem = {
  label: string;
  href?: string;
  icon?: ComponentType;
  disabledIfCount: (count: number) => boolean;
};

//////////////
// Form Types
//////////////

type InputElement =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "imageInput"
  | "latLngMapInput";

type InputParsingFunction = (value: any) => any | undefined;
type InputValidator = (value: any) => string | null; // String is the error message. Null means OK.

type FormFieldType<T> = {
  label: string;
  inputElement: InputElement;
  databaseFieldName: keyof T & string; // Should I define this if not every field/input is directly mapped to the database? For example, the "latLngMapInput" inputElement is not directly mapped to the database. It is 1 form item for 2 database fields. What would be the best way to handle this?
  value: any;
  parsingFunction?: InputParsingFunction;
  validators: InputValidator[];

  options?: { value: string; label: string }[];
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: any;
  error?: string;
};
