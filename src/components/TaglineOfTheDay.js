import React, { useMemo } from "react";
import { taglineGroups } from "../data/taglineData";

export function TaglineOfTheDay() {
  const tagline = useMemo(() => {
    const all = Object.values(taglineGroups).flat();
    const today = new Date();
    const index = today.getDate() % all.length;
    return all[index];
  }, []);

  return (
    <p className="tagline-of-day fade-on-scroll">
      {tagline}
    </p>
  );
}
