import { Point } from "@customtypes/map";

export const useMock = () => {
  const points: Point[] = [
    {
      type: "sanitation",
      coordinates: [-1.3680755834664953, -48.47771036265044],
      description: "Aqui tem muito problema de Agua",
      createdAt: new Date(),
    },
    {
      type: "courteous",
      coordinates: [-1.3630648201222184, -48.4761319362582],
      description: "Aqui tem muito problema de Agua",
      createdAt: new Date(),
    },
    {
      type: "trash",
      coordinates: [-1.3664976090582104, -48.474276597540516],
      description: "Aqui tem muito problema de Agua",
      createdAt: new Date(),
    },
    {
      type: "flood",
      coordinates: [-1.3630021006720876, -48.479374437919674],
      description: "Aqui tem muito problema de Agua",
      createdAt: new Date(),
    },
    {
      type: "flood",
      coordinates: [-1.3614410821963085, -48.47320288283111],
      description: "Aqui tem muito problema de Agua",
      createdAt: new Date(),
    },
  ];

  return { points };
};
