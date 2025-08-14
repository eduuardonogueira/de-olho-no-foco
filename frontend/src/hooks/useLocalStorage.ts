import { ICurrentLocationContextProps } from "@contexts/CurrentLocation/CurrentLocationContext";
import { ICoordinates, IMapPoint } from "@customtypes/map";

export const useLocalStorage = () => {
  function setLocation(
    id: string,
    coord: Partial<ICurrentLocationContextProps>
  ): boolean {
    localStorage.setItem(id, JSON.stringify(coord));
    return true;
  }

  function getLocation(id: string): ICoordinates | null {
    const location = localStorage.getItem(id);

    if (location) {
      const parseLocation = JSON.parse(location);
      return parseLocation;
    }

    return null;
  }

  function getLocalPoints(id: string) {
    const points = localStorage.getItem(id);

    if (points) {
      const parsePoints = JSON.parse(points);
      return parsePoints;
    }
    return undefined;
  }

  function setLocalPoints(id: string, points: IMapPoint[]) {
    localStorage.setItem(id, JSON.stringify(points));
    return true;
  }

  function updateLocalPoints(id: string, newPoints: IMapPoint | IMapPoint[]) {
    const localPoints: IMapPoint[] | undefined = getLocalPoints(id);

    if (localPoints) {
      if (Array.isArray(newPoints)) {
        newPoints.map((newPoint) => {
          const findedPoint = localPoints.find(
            (localPoint) => newPoint.id === localPoint.id
          );

          !findedPoint ? localPoints.push(newPoint) : "";
        });
      } else {
        const findedPoint = localPoints.find(
          (localPoint) => newPoints.id === localPoint.id
        );

        !findedPoint ? localPoints.push(newPoints) : "";
      }

      setLocalPoints(id, localPoints);
      return localPoints;
    }

    const ArrayPoint = Array.isArray(newPoints) ? newPoints : [newPoints];
    setLocalPoints(id, ArrayPoint);

    return ArrayPoint;
  }

  return {
    setLocation,
    getLocation,
    getLocalPoints,
    setLocalPoints,
    updateLocalPoints,
  };
};
