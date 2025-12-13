# MMM-DailyWeatherPrompt

MagicMirror² module that displays **today’s weather** and allows you to **set or change the weather location directly on the mirror**. If no location is configured, the module renders a simple on-screen prompt (city/state or ZIP). The chosen location is saved locally and reused on reboot.

## Features

- On-screen location prompt (no config edit required)
- Accepts **City, ST** or **ZIP code**
- Daily weather summary (current, high, low)
- Feels-like temperature, humidity, and wind
- Persistent storage via `localStorage`
- Edit location anytime with a single button
- Clean, mirror-friendly UI

## Quick install (copy/paste)

Run this on your Raspberry Pi (or any MagicMirror host):

```bash
cd ~/MagicMirror/modules \
  && git clone https://github.com/pcheek13/MMM-DailyWeatherPrompt.git \
  && cd MMM-DailyWeatherPrompt \
  && npm install
```

## Configuration

Add the module to your `config.js`:

```js
{
  module: "MMM-DailyWeatherPrompt",
  position: "top_left", // choose any MagicMirror position
  config: {
    apiKey: "YOUR_OPENWEATHER_API_KEY",
    units: "imperial", // or "metric"
    updateInterval: 10 * 60 * 1000, // 10 minutes
    promptText: "Enter City, ST or ZIP",
    showFeelsLike: true,
    showHumidity: true,
    showWind: true,
    allowLocationChange: true
  }
}
```

### Notes
- The module uses the [OpenWeather](https://openweathermap.org/) current weather API. Supply your own API key via `apiKey`.
- If `config.location` is empty, the module will prompt on-screen. The chosen value is saved to `localStorage` on the client.
- `units` follows OpenWeather: `imperial` for °F/mph, `metric` for °C/km/h.

## Interaction

1. On first load (no location configured), the module displays an input prompt.
2. Enter `City, ST` or a ZIP/postal code and click **Save** (or press **Enter**).
3. The module fetches weather data and shows current temp, summary, high/low, feels-like, humidity, wind, and the last updated time.
4. Click **Change** or **Change location** to update the saved location at any time.

## File overview

- `MMM-DailyWeatherPrompt.js` – front-end module UI, prompt handling, and socket messaging
- `node_helper.js` – server-side fetch to OpenWeather
- `MMM-DailyWeatherPrompt.css` – styling
- `package.json` – dependencies (`node-fetch` for API calls)

## License

MIT
