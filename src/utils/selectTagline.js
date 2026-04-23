import { taglineGroups } from "../data/taglineData";

// Main selector
export function selectTagline({ weather, season, mood }) {
  const main = weather?.weather?.[0]?.main || "";

  // 1) MOOD FIRST — personal state overrides everything
  if (mood === "calm") return random(taglineGroups.calmSpirit);
  if (mood === "reflective") return random(taglineGroups.reflectiveSky);
  if (mood === "joyful") return random(taglineGroups.sunshine);
  if (mood === "stormy") return random(taglineGroups.wind);

  // 2) WEATHER SECOND — the world outside shapes the tone
  switch (main) {
    case "Clear":
      return random(taglineGroups.sky);
    case "Clouds":
      return random(taglineGroups.reflectiveSky);
    case "Rain":
    case "Drizzle":
      return random(taglineGroups.rain);
    case "Snow":
      return random(taglineGroups.snow);
    case "Thunderstorm":
      return random(taglineGroups.wind);
    default:
      break;
  }

  // 3) SEASON THIRD — seasonal tint logic
  switch (season) {
    case "spring":
      return random(taglineGroups.calmSpirit);
    case "summer":
      return random(taglineGroups.openRoad);
    case "autumn":
      return random(taglineGroups.reflectiveSky);
    case "winter":
      return random(taglineGroups.snow);
    default:
      break;
  }

  // 4) FALLBACK — freedom is always a good whisper
  return random(taglineGroups.freedom);
}

// Helper
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
