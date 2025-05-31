import { CONFIG } from "./config.js";
import { getPixelRatio, setupCanvas } from "./canvas-utils.js";
import { BinaryAnimation } from "./binary-animation.js";
import { Terminal } from "./terminal.js";
import { LogoAnimation } from "./logo-animation.js";
import { LingoAnimation } from "./lingo-animation.js";

class App {
  constructor() {
    window.PIXEL_RATIO = getPixelRatio();
    this.canvas = setupCanvas();
    this.binaryAnimation = new BinaryAnimation(this.canvas, CONFIG);
    
    // Initialize terminal
    // const terminalContainer = document.getElementById('terminal-container');
    // if (terminalContainer) {
    //   this.terminal = new Terminal(CONFIG.DEMO_WORDS, CONFIG.BRANDBOOK_COLORS);
    //   terminalContainer.appendChild(this.terminal.element);
    // }
    
    this.logoAnimation = new LogoAnimation();
    this.lingoAnimation = new LingoAnimation(CONFIG)

    this.init();
  }

  init() {
    this.binaryAnimation.draw();
    this.logoAnimation.start();
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
