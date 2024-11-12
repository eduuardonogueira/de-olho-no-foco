import { Point } from "@customtypes/map";
import { LatLngExpression } from "leaflet";

export const useLocalStorage = () => {
  function setLocation(id: string, coord: LatLngExpression): boolean {
    localStorage.setItem(id, JSON.stringify(coord));
    return true;
  }

  function getLocation(id: string): LatLngExpression {
    const location = localStorage.getItem(id);

    if (location) {
      const {lat, lng} = JSON.parse(location);
      const parseLocation: LatLngExpression = [lat, lng]
      return parseLocation;
    }

    return [-1.4548981866300403, -48.44616551421902];
  }

  function getLocalPoints(id: string) {
    const points = localStorage.getItem(id)

    if(points) {
      const parsePoints = JSON.parse(points)
      return parsePoints
    }
    return undefined
  }

  function setLocalPoints(id: string, points: Point[]) {
    localStorage.setItem(id, JSON.stringify(points))
    return true
  }

  function updateLocalPoints(id: string, point: Point) {
    const points: Point[] | undefined = getLocalPoints(id)
    
    if(points) {
      points.push(point)
      setLocalPoints(id, points)
      console.log("atualizado")
      return points
    }

    return undefined
  }

  return { setLocation, getLocation, getLocalPoints, setLocalPoints, updateLocalPoints };
};
