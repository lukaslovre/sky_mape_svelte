import { LatLng } from "leaflet";
import type { Property } from "../types";

export const properties: Property[] = [
  {
    id: "1",
    latlng: new LatLng(45.81, 15.98),
    type: "Apartment",
    action: "Sale",
    imgUrl: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
    titleContent: "Elegantna Vila u Središtu Zagreba",
    descriptionContent:
      "Izvrsna vila smještena u živahnom centru Zagreba. Ovaj šarmantni dom ima prostrani vrt, moderne sadržaje i blizinu kulturnih znamenitosti.",
    linkValue: "#",
    surfaceArea: 76,
    price: 350000,
  },
  {
    id: "2",
    latlng: new LatLng(45.82, 15.92),
    type: "House",
    action: "Sale",
    imgUrl: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
    titleContent: "Ugodna Kućica Blizu Zagrebačke Zelene Zone",
    descriptionContent:
      "Šarmantna kućica smještena blizu zelene zone Zagreba. Idealna za ljubitelje prirode, ova kuća nudi mirno okruženje s prekrasnim vrtom i lakim pristupom parkovima.",
    linkValue: "#",
    surfaceArea: 50,
    price: 220000,
  },
  {
    id: "3",
    latlng: new LatLng(45.79, 16.05),
    type: "House",
    action: "Sale",
    imgUrl: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
    titleContent: "Luksuzni Obiteljski Dom u Zagrebačkom Predgrađu",
    descriptionContent:
      "Prekrasna obiteljska kuća smještena u mirnom predgrađu Zagreba. S velikom površinom, lijepo uređenim vrtom i vrhunskim sadržajima.",
    linkValue: "#",
    surfaceArea: 120,
    price: 450000,
  },
  {
    id: "4",
    latlng: new LatLng(45.78, 15.94),
    type: "Commercial",
    action: "Rent",
    imgUrl: "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
    titleContent: "Prostrana Moderan Stan u Središtu Zagreba",
    descriptionContent:
      "Elegantan stan smješten u srcu Zagreba. Ovaj moderan dom ima prostrane sobe, prekrasan pogled i blizinu kulturnih znamenitosti.",
    linkValue: "#",
    surfaceArea: 90,
    price: 320000,
  },
];
