import { LatLngExpression } from "leaflet";

export const useLocalStorage = () => {
  function setLocation(id: string, coord: LatLngExpression): boolean {
    localStorage.setItem(id, JSON.stringify(coord));
    console.log("set", coord)
    return true;
  }

  function getLocation(id: string): LatLngExpression {
    const location = localStorage.getItem(id);

    if (location) {
      const {lat, lng} = JSON.parse(location);
      const parseLocation: LatLngExpression = [lat, lng]
      console.log("get", parseLocation)
      return parseLocation;
    }

    return [-1.4548981866300403, -48.44616551421902];
  }

  return { setLocation, getLocation };
};
