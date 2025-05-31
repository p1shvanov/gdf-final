import { CONFIG } from "./config.js";
import { getPixelRatio, setupCanvas } from "./canvas-utils.js";
import { BinaryAnimation } from "./binary-animation.js";;
import { LingoAnimation } from "./lingo-animation.js";

class App {
  constructor() {
    window.PIXEL_RATIO = getPixelRatio();
    this.canvas = setupCanvas();
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);

    this.lingoAnimation = new LingoAnimation(CONFIG)

    this.init();
  }

  init() {
    this.binaryAnimation.draw();;
    this.lingoAnimation.init();

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
    this.lingoAnimation.init()
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
