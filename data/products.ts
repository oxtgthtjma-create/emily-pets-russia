export type ShowcaseProduct = {
  id: string;
  name: string;
  category: "cat-litter" | "bedding";
  image: string;
  description: string;
  inputs: string[];
  source: string;
};
export const showcaseProducts: ShowcaseProduct[] = [
  {
    id: "tofu",
    name: "Тофу",
    category: "cat-litter",
    image: "/products/tofu.webp",
    description: "Растительное направление для кошачьих наполнителей.",
    inputs: [
      "Состав и код образца",
      "Размер гранул и аромат",
      "Фасовка и партия",
    ],
    source: "https://emilypets.com/product/",
  },
  {
    id: "bentonite",
    name: "Бентонит",
    category: "cat-litter",
    image: "/products/bentonite.webp",
    description: "Минеральное направление для вашего ассортимента.",
    inputs: [
      "Состав и фракция",
      "Фасовка и версия оформления",
      "Количество упаковок",
    ],
    source: "https://emilypets.com/product/",
  },
  {
    id: "pine",
    name: "Древесные гранулы",
    category: "cat-litter",
    image: "/products/pine.webp",
    description: "Древесное направление для кошачьих наполнителей.",
    inputs: [
      "Материал и размер гранул",
      "Масса или объём пачки",
      "Транспортная упаковка",
    ],
    source: "https://emilypets.com/product/",
  },
  {
    id: "cassava",
    name: "Маниока",
    category: "cat-litter",
    image: "/products/cassava.webp",
    description:
      "Направление на основе маниоки, включая смеси по спецификации.",
    inputs: ["Состав смеси", "Код образца и фасовка", "Упаковка и партия"],
    source: "https://emilypets.com/product/",
  },
  {
    id: "wood-shaving",
    name: "Древесная стружка",
    category: "bedding",
    image: "/products/wood-shaving.webp",
    description: "Древесная подстилка для обсуждения нужного исполнения.",
    inputs: [
      "Порода древесины и назначение",
      "Фракция и код образца",
      "Фасовка и упаковка",
    ],
    source: "https://py-pet.com/product/wood-shaving/",
  },
  {
    id: "aspen",
    name: "Осиновая стружка",
    category: "bedding",
    image: "/products/aspen.webp",
    description: "Отдельная позиция для спецификации подстилок.",
    inputs: [
      "Состав по спецификации",
      "Фракция и назначение",
      "Фасовка и партия",
    ],
    source: "https://py-pet.com/product/aspen-shaving/",
  },
];
export function getShowcaseProduct(id: string | undefined) {
  return showcaseProducts.find((product) => product.id === id);
}
