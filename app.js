import { CONFIG } from "./config.js";
import { getPixelRatio, setupCanvas } from "./canvas-utils.js";
import { BinaryAnimation } from "./binary-animation.js";
import { TextAnimation } from "./text-animation.js";
import { LogoAnimation } from "./logo-animation.js";

class App {
  constructor() {
    console.log("hi");
    window.PIXEL_RATIO = getPixelRatio();
    this.canvas = setupCanvas();
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    this.textAnimation = new TextAnimation(
      "text",
      CONFIG.DEMO_WORDS,
      CONFIG.BRANDBOOK_COLORS
    );
    this.logoAnimation = new LogoAnimation();

    this.init();
  }

  init() {
    this.binaryAnimation.draw();
    this.logoAnimation.start();

    window.addEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Stop current animation
    this.binaryAnimation.stop();

    // Recreate canvas with new dimensions
    this.canvas = setupCanvas();

    // Reinitialize binary animation
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    this.binaryAnimation.draw();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("boom");
  new App();
});
