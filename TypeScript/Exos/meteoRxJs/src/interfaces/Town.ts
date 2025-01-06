export default interface Town {
  label: string;
  coordinates: [number, number];
}

export interface ApiTown {
  properties: {
    label: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}
