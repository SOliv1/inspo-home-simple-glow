import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import './App.css';

import { WeatherPanel } from './features/weather/WeatherPanel';
import { JournalEntries } from './features/journal/JournalEntries';
import { TaglineRotator } from './components/TaglineRotator';
import { TodoPanel } from './features/todos/TodoPanel';



function App() {

  // Dynamic greeting logic
  const hour = new Date().getHours();
  let greeting = "";
  let greetingClass = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning, Sara";
    greetingClass = "greeting-sunrise";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon, Sara";
    greetingClass = "greeting-day";
  } else if (hour >= 17 && hour < 22) {
    greeting = "Good Evening, Sara";
    greetingClass = "greeting-sunset";
  } else {
    greeting = "Good Night, Sara";
    greetingClass = "greeting-night";
  }

  // Get weather from Redux
  const weather = useSelector((state) => state.weather);

  // Derive season from current month
  const month = new Date().getMonth(); // 0-11
  const season =
    month >= 2 && month <= 4 ? "spring" :
    month >= 5 && month <= 7 ? "summer" :
    month >= 8 && month <= 10 ? "autumn" : "winter";

  // Derive mood from weather + time of day
  const weatherMain = weather?.weather?.[0]?.main || "";
  let mood = null;
  if (hour >= 22 || hour < 5) mood = "calm";
  else if (weatherMain === "Clouds" && hour >= 14 && hour <= 17) mood = "reflective";
  else if (weatherMain === "Rain" || weatherMain === "Drizzle") mood = "reflective";
  else if (weatherMain === "Clear") mood = null; // let weather/season pick

  // Mood logic
  useEffect(() => {
    if (!weather || !weather.weather) return;

    const hour = new Date().getHours();
    const isOvercast = weather.weather[0].main === "Clouds";
    const isAfternoon = hour >= 14 && hour <= 17;

    if (isOvercast && isAfternoon) {
      document.body.classList.add("mood-silhouette");
    } else {
      document.body.classList.remove("mood-silhouette");
    }
  }, [weather]);

  // Greeting icon
  let greetingIcon = "";
  if (hour >= 5 && hour < 12) greetingIcon = "🌅";
  else if (hour >= 12 && hour < 17) greetingIcon = "☀️";
  else if (hour >= 17 && hour < 22) greetingIcon = "🌇";
  else greetingIcon = "🌙";

  // Fade-on-scroll effect
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-on-scroll');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
        else entry.target.classList.remove('visible');
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

 return (
  <>
  <div id="top"></div>

  <main className="app-shell">
    <div className="frost-overlay"></div>
    <div className="app-content">

      {/* TWO‑COLUMN GRID */}
      <div className="main-grid">

        {/* LEFT COLUMN */}
        <div className="left-column">
          <header className="app-header">
            <p className={`dynamic-greeting ${greetingClass}`}>
              <span className="greeting-icon">{greetingIcon}</span>
              {greeting}
            </p>

            <h1 className="app-title">Daily Checklist</h1>
            <p className="app-subtitle">Light, colourful to-dos for a focused day.</p>
          </header>

          <div className="header-divider"></div>

          <TaglineRotator weather={weather} season={season} mood={mood} />

          <TodoPanel season={season} mood={mood} />

          <section>
            <JournalEntries />
          </section>

          {/* Checklist + todos go here */}
        </div>

          {/* RIGHT COLUMN */}
        <div className="right-column">
          <WeatherPanel />
        </div>
      </div>

           {/* FOOTER OUTSIDE GRID */}
      <footer className="QuotesFooter">
        <p className="inspo-quote fade-on-scroll">
          “The only way to do great work is to love what you do.”
        </p>
        <p className="quote-author">~ Steve Jobs ~</p>
      </footer>

    </div>
  </main>
</>
);
}

export default App;