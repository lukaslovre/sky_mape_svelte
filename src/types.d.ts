type Filters = {
  maxArea: number;
  minArea: number;
  maxPrice: number;
  minPrice: number;
  type: string[];
  action: string[];
};

type Property = {
  popupData: {
    imgUrl: string;
    titleContent: string;
    descriptionContent: string;
    linkValue: string;
    surfaceArea: number;
    price: number;
  };
  latlng: number[];
  type: string;
  action: string;
};
