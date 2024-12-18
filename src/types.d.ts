import type { LatLng } from "leaflet";

type Tabs = "Map" | "Properties" | "Buyers" | "Owners" | "Interactions" | "Admin";
type DialogType = "saveBuyer" | "saveProperty";

type PropertyType = "Apartment" | "House" | "Land" | "Commercial";
type PropertyAction = "Rent" | "Sale";
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

type Property = {
  lat: number;
  lng: number;
  type: PropertyType;
  action: PropertyAction;
  imgUrl: string[];
  // title: string;
  // description: string;
  surfaceArea: number;
  price: number;
  websiteUrl: string;
  hiddenOnWebsite: boolean;
  bedrooms: number;
  bathrooms: number;
  ownerId: UserData["id"];
  propertyNotes: string;
  sellerNotes: string;
  agent_id: Agent["id"];
  status: "available" | "processing" | "sold";
} & PocketbaseAttributes;

type UserData = {
  name: string;
  phone: string;
  email: string;
  note: string;
  filters: Filters | null;
  favoriteProperties: Property["id"][];
  userType: "seller" | "buyer";
  payment_method: "credit" | "cash";
  agency_id: string;
} & PocketbaseAttributes;

type Agent = {
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  phone: string;
  name: string;
  avatar: string;
  phone: string;
  role: "admin" | "agent";
  agency_id: string;
} & PocketbaseAttributes;

type InteractionType =
  | "Contacted"
  | "PropertyViewingScheduled"
  | "PropertyViewingCompleted"
  | "OfferMade"
  | "OfferReceived"
  | "Negotiation"
  | "ContractSigned"
  | "SaleClosed"
  | "FollowUp"
  | "InquiryReceived"
  | "EmailSent"
  | "PhoneCall"
  | "MeetingScheduled"
  | "DocumentSent"
  | "PaymentReceived"
  | "InspectionScheduled"
  | "AppraisalScheduled"
  | "Other";

type Interaction = {
  agent_id: Agent["id"];
  user_id?: UserData["id"];
  property_id?: Property["id"];
  type: InteractionType;
  note: string;
  date?: string;
  expand?: {
    agent_id: Agent;
    user_id?: UserData;
    property_id?: Property;
  };
} & PocketbaseAttributes;

type PocketbaseAttributes = {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
};

type inputElement =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "imageInput"
  | "latLngMapInput";

type FormFieldType<T> = {
  label: string;
  inputElement: inputElement;
  databaseFieldName: keyof T;
  value: any;
  required: boolean;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  // The parsing function is used to transform the value before it is saved to the database.
  // It should also return undefined if the value should not be saved.
  parsingFunction: (value: any) => any | undefined;
  hidden?: boolean;
  default?: any;
  error: string | null;
};

type ClientFormFieldType = FormFieldType<UserData>;
type PropertyFormFieldType = FormFieldType<Property>;

// Component types
interface MenuItem {
  label: string;
  href?: string;
  icon?: ComponentType;
  disabled?: boolean;
}
