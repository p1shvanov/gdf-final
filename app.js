import { CONFIG } from "./config.js";
import { getPixelRatio, setupCanvas } from "./canvas-utils.js";
import { BinaryAnimation } from "./binary-animation.js";
import { LingoAnimation } from "./lingo-animation.js";
import { Logo3DAnimation } from "./logo-3d-animation.js";

class App {
  constructor() {
    window.PIXEL_RATIO = getPixelRatio();
    this.canvas = setupCanvas();
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    this.lingoAnimation = new LingoAnimation(CONFIG);
    this.logo3DAnimation = new Logo3DAnimation();

    this.init();
  }

  init() {
    this.binaryAnimation.draw();
    this.lingoAnimation.init();
    this.logo3DAnimation.start();

    window.addEventListener("resize", this.handleResize.bind(this));
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
    this.logo3DAnimation.start();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
