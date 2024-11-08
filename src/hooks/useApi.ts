import { Point } from "@customtypes/map";
import { useMock } from "./useMock";

export const useApi = () => {
  const { points } = useMock();

  async function getPoints(): Promise<Point[]> {
    return points;
  }

  return { getPoints };
};
