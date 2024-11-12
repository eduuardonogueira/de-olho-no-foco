import { CreatePoint, Point } from "@customtypes/map";
import { useMock } from "./useMock";

export const useApi = () => {
  const { points } = useMock();

  async function getPoints(): Promise<Point[]> {
    return points;
  }

  async function createPoint(point: CreatePoint) {
    console.log(point);
    return true;
  }

  return { getPoints, createPoint };
};
