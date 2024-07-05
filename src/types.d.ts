import type { LatLng } from "leaflet";

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
  imgUrl: string;
  titleContent: string;
  descriptionContent: string;
  linkValue: string;
  surfaceArea: number;
  price: number;
};

type UserData = {
  name: string;
  contact: string;
  note: string;
  filters: Filters | null;
  favoriteProperties: Property["id"][];
};
