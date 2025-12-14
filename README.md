# MMM-SleepMode

MagicMirror² module that automatically dims the display after a period of inactivity and instantly restores brightness when the screen is touched or clicked. Designed for Raspberry Pi 5 deployments where a low-light "sleep" state is preferable to a full power-off.

## Features
- Auto-dims the entire mirror after a configurable inactivity window (default: 15 minutes)
- Wakes immediately on touch, click, mouse, or pointer movement
- Smooth fade transition with adjustable dim level
- Optional on-screen status label for debugging

## Installation (one-shot)
Copy/paste the commands below on your Raspberry Pi to install directly into your MagicMirror `modules` directory:

```bash
cd ~/MagicMirror/modules && \
  git clone https://github.com/YOUR_GITHUB/MMM-DailyWeatherPrompt.git MMM-SleepMode && \
  cd MMM-SleepMode && \
  npm install --production
```

## Configuration
Add the module to `config.js`:

```js
{
  module: "MMM-SleepMode",
  position: "bottom_center", // Position is optional; status label appears only when showStatus is true
  config: {
    timeoutMinutes: 15,          // Minutes of inactivity before dimming
    dimLevel: 0.2,               // Brightness level when dimmed (0 = black, 1 = no dim)
    fadeDurationSeconds: 1.5,    // Fade duration for dim/undim transitions
    activityEvents: ["click", "touchstart", "pointerdown", "mousemove"],
    showStatus: false            // Set true to show a small status label
  }
}
```

### Option details
- **timeoutMinutes**: Minutes of no activity before the mirror dims. Minimum enforced at 0 (always awake).
- **dimLevel**: Final brightness multiplier applied to the whole document while dimmed.
- **fadeDurationSeconds**: Transition length for dimming animations.
- **activityEvents**: Browser events that reset the timer and wake the mirror. Include touch/click by default.
- **showStatus**: Displays a compact text indicator of the current state.

## How it works
The module listens for user activity events (clicks, touches, pointer movement) and resets an inactivity timer on each event. When the timer reaches the configured threshold, a CSS class is added to the document to reduce brightness. Any subsequent interaction removes the class and restores normal brightness immediately.
