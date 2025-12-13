# MMM-DailyWeatherPrompt

MagicMirror² module that displays **today’s weather** and allows the user to **set or change the weather location directly on the mirror display**.

If no location is configured, the module renders a simple on-screen prompt (city/state or ZIP).  
The chosen location is saved locally and reused on reboot.

---

## Features

- On-screen location prompt (no config edit required)
- Accepts **City, ST** or **ZIP code**
- Daily weather summary (current, high, low)
- Feels-like temperature (optional)
- Humidity and wind
- Persistent storage via `localStorage`
- Edit location anytime with a single button
- Clean, mirror-friendly UI

---

## Screens

**State 1 – No location set**
- Input prompt displayed on mirror

**State 2 – Location set**
- City name
- Weather summary
- Current temperature
- Daily high / low
- Feels-like temperature
- Humidity and wind
- Last updated time

---

## Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/YOUR_GITHUB/MMM-DailyWeatherPrompt.git
cd MMM-DailyWeatherPrompt
npm install
