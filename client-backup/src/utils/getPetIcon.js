export const getPetIcon = (petType) => {
  const type = petType?.toLowerCase().trim();

  if (!type) return "🐾";

  if (type.includes("dog") || type.includes("puppy")) return "🐶";
  if (type.includes("cat") || type.includes("kitten")) return "🐱";
  if (type.includes("bird") || type.includes("parrot")) return "🐦";
  if (type.includes("rabbit") || type.includes("bunny")) return "🐰";
  if (type.includes("hamster")) return "🐹";
  if (type.includes("mouse") || type.includes("rat")) return "🐭";
  if (type.includes("fish") || type.includes("goldfish")) return "🐠";
  if (type.includes("turtle")) return "🐢";
  if (type.includes("snake")) return "🐍";
  if (type.includes("lizard") || type.includes("gecko")) return "🦎";
  if (type.includes("horse")) return "🐴";
  if (type.includes("pig")) return "🐷";
  if (type.includes("goat")) return "🐐";
  if (type.includes("chicken")) return "🐔";
  if (type.includes("duck")) return "🦆";
  if (type.includes("frog")) return "🐸";
  if (type.includes("hedgehog")) return "🦔";

  return "🐾";
};