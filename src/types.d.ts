import type { LatLng } from "leaflet";

type Filters = {
  maxArea: number;
  minArea: number;
  maxPrice: number;
  minPrice: number;
  type: string[];
  action: string[];
  polygons: LatLng[][];
};

type Property = {
  id: string;
  popupData: {
    imgUrl: string;
    titleContent: string;
    descriptionContent: string;
    linkValue: string;
    surfaceArea: number;
    price: number;
  };
  latlng: LatLng;
  type: string;
  action: string;
};

type UserData = {
  name: string;
  contact: string;
  note: string;
  filters: Filters;
  favoriteProperties: string[]; // propertyId
};
