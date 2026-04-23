import React, { useEffect, useState } from "react";
import { selectTagline } from "../utils/selectTagline";

export function TaglineRotator({ weather, season, mood }) {
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    // initial tagline
    setTagline(selectTagline({ weather, season, mood }));

    // rotate every 12 seconds
    const interval = setInterval(() => {
      setTagline(selectTagline({ weather, season, mood }));
    }, 12000);

    return () => clearInterval(interval);
  }, [weather, season, mood]);

  return (
    <p className="tagline-rotator fade-on-scroll">
      {tagline}
    </p>
  );
}
