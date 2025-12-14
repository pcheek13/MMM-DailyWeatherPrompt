/* Magic Mirror Module: MMM-SleepMode
 * Dims the MagicMirror display after inactivity and wakes it on interaction.
 */
Module.register("MMM-SleepMode", {
  defaults: {
    timeoutMinutes: 15,
    dimLevel: 0.2,
    fadeDurationSeconds: 1.5,
    activityEvents: ["click", "touchstart", "pointerdown", "mousemove"],
    showStatus: false
  },

  requiresVersion: "2.32.0",

  start() {
    this.dimmed = false;
    this.dimTimer = null;
    this.resetTimer = this.resetTimer.bind(this);
    this.applyCssVariables();
    this.setupActivityListeners();
    this.scheduleDim();
  },

  getDom() {
    const wrapper = document.createElement("div");
    wrapper.className = "mmm-sleep-mode";

    if (this.config.showStatus) {
      const status = document.createElement("div");
      status.className = "status";
      status.innerHTML = this.dimmed ? this.translate("DISPLAY_DIMMED") : this.translate("DISPLAY_AWAKE");
      wrapper.appendChild(status);
    } else {
      wrapper.style.display = "none";
    }

    return wrapper;
  },

  getScripts() {
    return [];
  },

  getStyles() {
    return ["MMM-SleepMode.css"];
  },

  getTranslations() {
    return {
      en: "translations/en.json"
    };
  },

  applyCssVariables() {
    const root = document.documentElement;
    root.style.setProperty("--mmm-sleep-dim-level", this.config.dimLevel);
    root.style.setProperty("--mmm-sleep-fade-duration", `${this.config.fadeDurationSeconds}s`);
  },

  setupActivityListeners() {
    this.removeActivityListeners();
    this.config.activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, this.resetTimer, true);
      document.addEventListener(eventName, this.resetTimer, true);
    });
  },

  removeActivityListeners() {
    this.config.activityEvents.forEach((eventName) => {
      window.removeEventListener(eventName, this.resetTimer, true);
      document.removeEventListener(eventName, this.resetTimer, true);
    });
  },

  scheduleDim() {
    if (this.dimTimer) {
      clearTimeout(this.dimTimer);
    }

    const timeout = Math.max(this.config.timeoutMinutes, 0) * 60 * 1000;
    this.dimTimer = setTimeout(() => this.dimDisplay(), timeout);
  },

  resetTimer() {
    if (this.dimmed) {
      this.undimDisplay();
    }
    this.scheduleDim();
  },

  dimDisplay() {
    if (this.dimmed) return;
    this.dimmed = true;
    document.documentElement.classList.add("mmm-sleep-dimmed");
    document.body.classList.add("mmm-sleep-dimmed");
    this.updateDom(300);
  },

  undimDisplay() {
    if (!this.dimmed) return;
    this.dimmed = false;
    document.documentElement.classList.remove("mmm-sleep-dimmed");
    document.body.classList.remove("mmm-sleep-dimmed");
    this.updateDom(300);
  },

  suspend() {
    this.removeActivityListeners();
    if (this.dimTimer) {
      clearTimeout(this.dimTimer);
    }
  },

  resume() {
    this.setupActivityListeners();
    this.resetTimer();
  },

  stop() {
    this.suspend();
  }
});
