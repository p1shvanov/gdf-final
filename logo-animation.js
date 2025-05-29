export class LogoAnimation {
  constructor(selector = ".logo") {
    this.logos = document.querySelectorAll(selector);
    this.currentIndex = 0;
    this.interval = null;

    this.init();
  }

  init() {
    if (this.logos.length > 0) {
      this.logos[0].classList.add("active");
    }
  }

  start(intervalTime = 3000) {
    this.interval = setInterval(() => {
      this.rotate();
    }, intervalTime);
  }

  rotate() {
    this.logos[this.currentIndex].classList.remove("active");
    this.currentIndex = (this.currentIndex + 1) % this.logos.length;
    this.logos[this.currentIndex].classList.add("active");
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
