import type { LatLng } from "leaflet";

export type Tabs = "Map" | "Properties" | "Buyers";

type PropertyType = "Apartment" | "House" | "Land" | "Commercial";
type PropertyAction = "Rent" | "Sale";

type Filters = {
  maxArea: number;
  minArea: number;
  maxPrice: number;
  minPrice: number;
  type: PropertyType[];
  action: PropertyAction[];
  polygons: LatLng[][];
};

type Property = {
  id: string;
  latlng: LatLng;
  type: PropertyType;
  action: PropertyAction;
  imgUrl: string[];
  titleContent: string;
  descriptionContent: string;
  linkValue: string;
  surfaceArea: number;
  price: number;
} & PocketbaseAttributes;

type UserData = {
  id: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  filters: Filters | null;
  favoriteProperties: Property["id"][];
};

type PocketbaseAttributes = {
  id: string;
  created: string;
  updated: string;
};
