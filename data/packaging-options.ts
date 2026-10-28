export const bagOptions = {
  pouch: "Пакет с устойчивым дном",
  handle: "Пакет с ручкой",
  paper: "Бумажный пакет",
};
export const colorOptions = {
  sage: { name: "Шалфей", hex: "#b7c9a8" },
  peach: { name: "Персик", hex: "#ebc6ad" },
  blue: { name: "Голубой", hex: "#b7cfdb" },
  cream: { name: "Кремовый", hex: "#e9dfc8" },
};
export function parseDesign(value: unknown) {
  if (typeof value !== "string") return "";
  const [bag, color] = value.split(":");
  if (!Object.hasOwn(bagOptions, bag) || !Object.hasOwn(colorOptions, color))
    return "";
  return (
    bagOptions[bag as keyof typeof bagOptions] +
    ", цвет «" +
    colorOptions[color as keyof typeof colorOptions].name +
    "»"
  );
}
