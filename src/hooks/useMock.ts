import { Point } from "@customtypes/map";

export const useMock = () => {
  const points: Point[] = [
    {
      type: "sanitation",
      coordinates: [-1.3680755834664953, -48.47771036265044],
      description: "Sempre falta agua aqui",
      createdAt: new Date(),
    },
    {
      type: "sanitation",
      coordinates: [-1.4553612582017175, -48.44918612212591],
      description: "Sempre falta agua aqui",
      createdAt: new Date(),
    },
    {
      type: "sanitation",
      coordinates: [-1.4518119502804123, -48.44994476538367],
      description: "Sempre falta agua aqui",
      createdAt: new Date(),
    },
    {
      type: "sanitation",
      coordinates: [-1.4543298359621628, -48.45316141279659],
      description: "Sempre falta agua aqui",
      createdAt: new Date(),
    },
    {
      type: "courteous",
      coordinates: [-1.3630648201222184, -48.4761319362582],
      description: "Cortaram uma árvore linda :(",
      createdAt: new Date(),
    },
    {
      type: "courteous",
      coordinates: [-1.4488086852848998, -48.458775373007114],
      description: "Cortaram uma árvore linda :(",
      createdAt: new Date(),
    },
    {
      type: "trash",
      coordinates: [-1.3664976090582104, -48.474276597540516],
      description: "Derrubaram lixo aqui",
      createdAt: new Date(),
    },
    {
      type: "flood",
      coordinates: [-1.3630021006720876, -48.479374437919674],
      description: "Não passa carro",
      createdAt: new Date(),
    },
    {
      type: "flood",
      coordinates: [-1.3614410821963085, -48.47320288283111],
      description: "Alagado demais!!",
      createdAt: new Date(),
    },
    {
      type: "flood",
      coordinates: [-1.473277362052848, -48.45402198205382],
      description: "Alagado demais!!",
      createdAt: new Date(),
    },
    {
      type: "flood",
      coordinates: [-1.3614410821963085, -48.47320288283111],
      description: "Alagado demais!!",
      createdAt: new Date(),
    },
    {
      type: "flood",
      coordinates: [-1.4476179831430422, -48.44685497513186],
      description: "Alagado demais!!",
      createdAt: new Date(),
    },
    {
      type: "flood",
      coordinates: [-1.472111882903073, -48.451713220057485],
      description: "Alagado demais!!",
      createdAt: new Date(),
    },
    {
      type: "trash",
      coordinates: [-1.459135749200749, -48.44521666660536],
      description: "Alagado demais!!",
      createdAt: new Date(),
    },
    {
      type: "trash",
      coordinates: [-1.4539748668681427, -48.44779197596527],
      description: "Alagado demais!!",
      createdAt: new Date(),
    },
    {
      type: "courteous",
      coordinates: [-1.456393997508228, -48.44020052382071],
      description: "Muita árvore cortada",
      createdAt: new Date(),
    },
    {
      type: "courteous",
      coordinates: [-1.4553838776625243, -48.44063357212145],
      description: "Muita árvore cortada",
      createdAt: new Date(),
    },
    {
      type: "courteous",
      coordinates: [-1.4517041515435773, -48.43915399042725],
      description: "Muita árvore cortada",
      createdAt: new Date(),
    },
  ];

  return { points };
};
