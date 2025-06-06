import { CONFIG } from "./config.js";
import { getPixelRatio, setupCanvas } from "./canvas-utils.js";
import { BinaryAnimation } from "./binary-animation.js";
import { LingoAnimation } from "./lingo-animation.js";
import { Logo3DAnimation } from "./logo-3d-animation.js";
import { ConfigPanel } from "./config-panel.js";
import { WordsReceiver } from "./words-receiver.js";

class App {
  constructor() {
    window.PIXEL_RATIO = getPixelRatio();
    this.canvas = setupCanvas();
    this.wordsReceiver = new WordsReceiver();
    
    // Initialize animations
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    this.lingoAnimation = new LingoAnimation(CONFIG);
    this.logo3DAnimation = new Logo3DAnimation();
    this.configPanel = new ConfigPanel(this);

    this.init();
  }

  init() {
    this.binaryAnimation.draw();
    this.lingoAnimation.init();
    this.logo3DAnimation.start();

    // Subscribe to word updates and start polling
    this.wordsReceiver.subscribe(this.handleNewWords.bind(this));
    this.wordsReceiver.startPolling();

    // Add debounced resize handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, CONFIG.CANVAS.RESIZE_DEBOUNCE);
    });
  }

  handleNewWords(words) {
    // Update animations with new words
    const wordValues = words.map(word => word.value);
    this.lingoAnimation.updateWords(wordValues);
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Stop current animations
    this.binaryAnimation.stop();
    this.logo3DAnimation.stop();

    // Recreate canvas with new dimensions
    this.canvas = setupCanvas();

    // Reinitialize animations
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    this.binaryAnimation.draw();
    this.lingoAnimation.init();
    
    // Recreate and start 3D logo animation
    this.logo3DAnimation = new Logo3DAnimation();
    this.logo3DAnimation.start();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
