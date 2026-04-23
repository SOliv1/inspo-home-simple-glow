fetch('/.netlify/functions/getWeather?city=Evesham,GB')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

// Evesham, GB (you can change q= to another city)
export async function fetchCurrentWeather(city = 'Evesham,GB') {
  const res = await fetch(`/.netlify/functions/getWeather?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  console.log(data);
  return data;

}
