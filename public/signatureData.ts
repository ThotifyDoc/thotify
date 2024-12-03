export type AdminSignature = {
  name: string;
  email: string;
  words: string;
  github: string;
  image: string;
};

export type AdminSignatures = {
  [key: string]: AdminSignature;
};

export const adminSignatures: AdminSignatures = {
  morgan: {
    name: "Morgan",
    email: "devendev.pro@gmail.com",
    words: "Développeur passionné",
    github: "https://github.com/mangozmorgan",
    image: "https://github.com/mangozmorgan.png",
  },
  aurelie: {
    name: "Aurélie",
    email: "aurelie.preaud@laplateforme.io",
    words: "Dev et sushis forever !",
    github: "https://github.com/Aurelily/",
    image: "https://avatars.githubusercontent.com/u/79448947?v=4",
  },
  joris: {
    name: "Hardjojo",
    email: "joris.verguldezoone.pro@laplateforme.io",
    words: "Karate dancer, support violent dancing",
    github: "https://github.com/joris-verguldezoone",
    image: "https://avatars.githubusercontent.com/u/71430046?v=4",
  },
};
