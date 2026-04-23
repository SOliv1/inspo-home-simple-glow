import { selectTagline } from "../utils/selectTagline";
export function Tagline({ weather, season, mood }) {

const line = selectTagline({ weather, season, mood });

  return (
    <div className="tagline fade-on-scroll">
      <p>{line}</p>
    </div>
  );
}