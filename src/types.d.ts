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
  title: string;
  description: string;
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

type inputElement = "input" | "textarea" | "select" | "checkbox" | "imageInput";

type FormFieldType = {
  label: string;
  inputElement: inputElement;
  databaseFieldName: keyof Property;
  value: any;
  required: boolean;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  parsingFunction: (value: any) => any;
  hidden?: boolean;
  default?: any;
};
