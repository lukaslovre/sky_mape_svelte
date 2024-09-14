import type { LatLng } from "leaflet";

type Tabs = "Map" | "Properties" | "Buyers";
type DialogType = "saveBuyer";

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
} & PocketbaseAttributes;

type UserData = {
  name: string;
  phone: string;
  email: string;
  note: string;
  filters: Filters | null;
  favoriteProperties: Property["id"][];
} & PocketbaseAttributes;

type PocketbaseAttributes = {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
};
