import specials from "../helpers/specials.json";

export const getIsFemale = (pokemon, force) => {
  if (["nidoran-f", "nidorina", "nidoqueen"].includes(pokemon)) {
    return true;
  } else if (["nidoran-m", "nidorino", "nidoking"].includes(pokemon)) {
    return false;
  } else if (typeof force !== "undefined") {
    return force;
  } else {
    return Math.random() > 0.5;
  }
};

export const hasFemaleSprite = (pokemon) => {
  return specials.females.includes(pokemon);
};

export const getBallType = ({ name, data }) => {
  let types = [];
  if (data && data.types) {
    types = data.types.map((e) => e.type.name);
  }
  if (specials.buddies.includes(name) || specials.eevees.includes(name)) {
    return "love";
  } else if (specials.starters.includes(name)) {
    return "poke";
  } else if (name === "snorlax") {
    return "dream";
  } else if (specials.rare.includes(name)) {
    return "master";
  } else if (specials.safari.includes(name)) {
    return "safari";
  } else if (specials.bug.includes(name)) {
    return "sport";
  } else if (
    name.includes("iggly") ||
    name.startsWith("clef") ||
    name.startsWith("nido")
  ) {
    return "moon";
  } else if (data && data.stats && data.stats[5].base_stat > 120) {
    return "fast";
  } else if (data && data.weight > 2000) {
    return "heavy";
  } else if (types.includes("water")) {
    let balls = "dive,lure,net".split(",");
    return balls[Math.floor(Math.random() * balls.length)];
  } else if (
    types.includes("flying") &&
    (types.length === 1 || types.includes("normal"))
  ) {
    return "nest";
  } else if (specials.medium.includes(name)) {
    return "great";
  } else if (specials.large.includes(name)) {
    return "ultra";
  }
  return 1 / 4 > Math.random() ? "premier" : "poke";
};

export const style = (pokemon) => {
  let isShiny = Math.random() < 1 / 50;
  let isFemale = getIsFemale(pokemon);
  let size = "small";
  let ball = "poke";

  if (["gyarados", "magikarp"].includes(pokemon)) {
    isShiny = true;
  }

  if (specials.medium.includes(pokemon)) {
    size = "medium";
  } else if (specials.large.includes(pokemon)) {
    size = "large";
  }

  return {
    isShiny,
    isFemale,
    size,
    ball
  };
};
