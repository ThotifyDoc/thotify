
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


export const adminSignatures : AdminSignatures = {
    "morgan": {
    name: "Morgan",
    email: "devendev.pro@gmail.com",
    words: "Développeur passionné",
    github: "https://github.com/mangozmorgan",
    image: "https://github.com/mangozmorgan.png"
  }};

  