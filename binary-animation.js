export class BinaryAnimation {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = config;
    this.bits = [];
    this.raf = null;
    this.then = Date.now();
    this.interval = 2000 / this.config.FPS;

    this.init();
  }

  init() {
    const style = getComputedStyle(document.body);
    this.gradient = this.ctx.createLinearGradient(0, 0, 746, 353);
    this.gradient.addColorStop(
      0,
      style.getPropertyValue("--color-gradient-orange")
    );
    this.gradient.addColorStop(
      0.5,
      style.getPropertyValue("--color-gradient-purple")
    );
    this.gradient.addColorStop(
      1,
      style.getPropertyValue("--color-gradient-blue")
    );

    this.ctx.fillStyle = style.getPropertyValue("--color-browser");
    this.ctx.font = "11px Monaco";
    this.ctx.textBaseline = "bottom";

    this.setupBits();
    this.drawInitialBits();
  }

  setupBits() {
    const columns = Math.floor(this.canvas.width / this.config.FONT_SIZE);
    const rows = Math.floor(this.canvas.height / this.config.FONT_SIZE);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        this.bits.push({
          x: c * this.config.FONT_SIZE,
          y: r * this.config.FONT_SIZE,
          value:
            this.config.BIN_CHARS[
              Math.floor(Math.random() * this.config.BIN_CHARS.length)
            ],
          hasDrawn: false,
        });
      }
    }
  }

  drawInitialBits() {
    for (let bit of this.bits) {
      this.ctx.clearRect(
        bit.x,
        bit.y,
        this.config.FONT_SIZE,
        this.config.FONT_SIZE
      );
      this.ctx.fillText(bit.value, bit.x, bit.y + this.config.FONT_SIZE);
      bit.hasDrawn = true;
    }
  }

  draw() {
    this.raf = window.requestAnimationFrame(this.draw.bind(this));
    const now = Date.now();
    const delta = now - this.then;

    this.ctx.fillStyle = this.gradient;

    if (delta > this.interval) {
      for (let bit of this.bits) {
        if (bit.hasDrawn && Math.random() * 100 > 95) {
          const newVal = this.getNewBitValue(bit.value);
          this.ctx.clearRect(
            bit.x,
            bit.y,
            this.config.FONT_SIZE,
            this.config.FONT_SIZE
          );
          this.ctx.fillText(newVal, bit.x, bit.y + this.config.FONT_SIZE);
          bit.value = newVal;
        }
      }
      this.then = now - (delta % this.interval);
    }
  }

  getNewBitValue(currentValue) {
    if (currentValue === this.config.BIN_CHARS[1]) {
      return this.config.BIN_CHARS[0];
    } else if (currentValue === this.config.BIN_CHARS[0]) {
      return this.config.BIN_CHARS[Math.floor(Math.random() * 2.1)];
    }
    return this.config.BIN_CHARS[1];
  }

  resize(width, height) {
    this.canvas.width = width * window.PIXEL_RATIO;
    this.canvas.height = height * window.PIXEL_RATIO;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    // Reinitialize bits for new dimensions
    this.bits = [];
    this.init();
  }

  stop() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
  }
}
