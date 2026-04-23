// Returns an array of 4 soft rgba colours based on mood → season → default

const palettes = {
  // mood-driven
  calm:       ['rgba(180,160,255,0.22)', 'rgba(160,140,240,0.18)', 'rgba(200,180,255,0.20)', 'rgba(140,120,220,0.18)'],
  reflective: ['rgba(160,185,220,0.22)', 'rgba(140,170,210,0.18)', 'rgba(180,200,230,0.20)', 'rgba(120,155,200,0.18)'],
  joyful:     ['rgba(255,220,100,0.22)', 'rgba(255,190,130,0.20)', 'rgba(255,240,140,0.18)', 'rgba(255,210,160,0.20)'],
  stormy:     ['rgba(160,175,200,0.22)', 'rgba(140,158,185,0.18)', 'rgba(180,192,215,0.20)', 'rgba(120,140,170,0.18)'],
  // season-driven
  spring:     ['rgba(160,230,190,0.22)', 'rgba(180,240,200,0.18)', 'rgba(210,245,210,0.20)', 'rgba(140,220,175,0.18)'],
  summer:     ['rgba(255,220,120,0.22)', 'rgba(255,195,140,0.20)', 'rgba(255,240,160,0.18)', 'rgba(255,210,100,0.20)'],
  autumn:     ['rgba(255,185,100,0.22)', 'rgba(240,160,90,0.20)',  'rgba(255,210,130,0.18)', 'rgba(230,145,80,0.18)'],
  winter:     ['rgba(180,215,245,0.22)', 'rgba(200,225,250,0.20)', 'rgba(160,200,240,0.18)', 'rgba(190,220,248,0.20)'],
  // fallback
  default:    ['rgba(200,220,255,0.22)', 'rgba(255,200,200,0.20)', 'rgba(200,255,220,0.18)', 'rgba(240,200,255,0.20)'],
};

const paletteBorders = {
  calm:       ['rgba(180,160,255,0.45)', 'rgba(160,140,240,0.4)', 'rgba(200,180,255,0.42)', 'rgba(140,120,220,0.4)'],
  reflective: ['rgba(160,185,220,0.45)', 'rgba(140,170,210,0.4)', 'rgba(180,200,230,0.42)', 'rgba(120,155,200,0.4)'],
  joyful:     ['rgba(255,220,100,0.45)', 'rgba(255,190,130,0.42)','rgba(255,240,140,0.4)', 'rgba(255,210,160,0.42)'],
  stormy:     ['rgba(160,175,200,0.45)', 'rgba(140,158,185,0.4)', 'rgba(180,192,215,0.42)', 'rgba(120,140,170,0.4)'],
  spring:     ['rgba(160,230,190,0.45)', 'rgba(180,240,200,0.42)','rgba(210,245,210,0.4)', 'rgba(140,220,175,0.42)'],
  summer:     ['rgba(255,220,120,0.45)', 'rgba(255,195,140,0.42)','rgba(255,240,160,0.4)', 'rgba(255,210,100,0.42)'],
  autumn:     ['rgba(255,185,100,0.45)', 'rgba(240,160,90,0.42)', 'rgba(255,210,130,0.4)', 'rgba(230,145,80,0.42)'],
  winter:     ['rgba(180,215,245,0.45)', 'rgba(200,225,250,0.42)','rgba(160,200,240,0.4)', 'rgba(190,220,248,0.42)'],
  default:    ['rgba(200,220,255,0.45)', 'rgba(255,200,200,0.42)','rgba(200,255,220,0.4)', 'rgba(240,200,255,0.42)'],
};

export function getTodoPalette(season, mood) {
  if (mood && palettes[mood])     return { bg: palettes[mood],     border: paletteBorders[mood] };
  if (season && palettes[season]) return { bg: palettes[season],   border: paletteBorders[season] };
  return { bg: palettes.default,  border: paletteBorders.default };
}
