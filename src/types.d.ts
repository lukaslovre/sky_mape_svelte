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
  latlng: LatLng;
  type: string;
  action: string;
  popupData: {
    imgUrl: string;
    titleContent: string;
    descriptionContent: string;
    linkValue: string;
    surfaceArea: number;
    price: number;
  };
};

type UserData = {
  name: string;
  contact: string;
  note: string;
  filters: Filters | null;
  favoriteProperties: Property["id"][];
};
