export interface Meme {
  type: "gif" | "video" | "image";
  url: string;
  title: string;
  description: string;
  tags: string[];
  characters?: string[];
  id: string;
}
//Temporary location. To be moved to database. For demonstration purposes only

export const memeDatabase: Meme[] = [
  {
    id: "123",
    type: "video",
    url: "https://drive.google.com/uc?id=1uU2wWScbpyMzF25_mEKZVdfUmPfzSwWk",
    title: "Gey Hey we get size?",
    description:
      "Gey Hey we get size? No size! oo I can't hear you. About the brains? About the trophy? Wesley Girls' students morale jama, yellow and green students uniform ",
    tags: ["funny"],
    characters: [],
  },
  {
    id: "12343",
    type: "video",
    url: " https://drive.google.com/uc?id=1EKZqQc48_8Q8JrMMGknhNVJdKXkt5Sad",
    title: "Ei Father Bernard!",
    description: "Woman jumps into grave. Eii father Bernard. Brother Bernard",
    tags: ["funny"],
    characters: [],
  },

  {
    id: "12333",
    type: "video",
    url: "https://drive.google.com/uc?id=10xt_GgFMUFb1OkPihzhPLm2Bwu3hXUkY",
    title: "Not One, Not Two",
    description:
      "Not one, not two but thousand. Joy News. Woman being intervieewed",
    tags: ["funny"],
    characters: [],
  },
  {
    id: "1111122",
    type: "video",
    url: "https://drive.google.com/uc?id=1gSMe7euvxN61IZ0NWV8dfAFbBNcaz_eO",
    title: "Come And See!",
    description:
      "Pampanaa come and see oo. Come and see what the Lord has done. University students morale, jama, macho muscular man wearing (with) helmet",
    tags: ["funny"],
    characters: [],
  },
  {
    id: "11111",
    type: "video",
    url: "https://drive.google.com/uc?id=1fsXvcm5CW_Yx2eHXRhddKDxIhj07bk2g",
    title: "I was overjoyed!",
    description:
      "I was overjoyed. And even up till (uptil) now, the enjoyment is there. Woman giving a soeech on a podium",
    tags: ["funny"],
    characters: [],
  },
  {
    id: "11113331",
    type: "video",
    url: "https://drive.google.com/uc?id=1oDkY-j05_g5aJs0Y9FpXQZc5S-x9-DmW",
    title: "This is facts",
    description: "This is facts. This thing is facts paa",
    tags: ["funny"],
    characters: [],
  },
];
