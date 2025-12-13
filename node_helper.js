const NodeHelper = require("node_helper");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
  socketNotificationReceived(notification, payload) {
    if (notification === "FETCH_WEATHER") {
      this.fetchWeather(payload);
    }
  },

  async fetchWeather(config) {
    const { apiKey, location, units } = config;

    if (!apiKey) {
      this.sendError("API key missing");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=${units}&appid=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = await this.parseError(response);
        this.sendError(errorMessage);
        return;
      }

      const data = await response.json();
      this.sendSocketNotification("WEATHER_RESULT", this.transformWeather(data, units));
    } catch (error) {
      this.sendError(error.message || "Unable to reach weather service");
    }
  },

  async parseError(response) {
    try {
      const body = await response.json();
      return body.message || `Request failed: ${response.status}`;
    } catch (error) {
      return `Request failed: ${response.status}`;
    }
  },

  transformWeather(data, units) {
    const temperature = Math.round(data.main.temp);
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const feelsLike = Math.round(data.main.feels_like);
    const windSpeed = units === "metric" ? Math.round(data.wind.speed * 3.6) : Math.round(data.wind.speed);

    return {
      locationName: `${data.name}, ${data.sys.country}`,
      summary: data.weather?.[0]?.description || "",
      temperature,
      high,
      low,
      feelsLike,
      humidity: Math.round(data.main.humidity),
      windSpeed,
      windUnit: units === "metric" ? "km/h" : "mph",
      updated: this.formatTime(data.dt),
      icon: data.weather?.[0]?.icon
    };
  },

  formatTime(unixTime) {
    const date = new Date((unixTime || Date.now() / 1000) * 1000);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  },

  sendError(message) {
    this.sendSocketNotification("WEATHER_RESULT", { error: message });
  }
});
