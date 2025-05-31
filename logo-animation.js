export class LogoAnimation {
  constructor(selector = ".logo") {
    this.logos = document.querySelectorAll(selector);
    this.currentIndex = 0;
    this.interval = null;
    
    // Add CSS for floating animation
    this.addFloatingAnimation();
    this.init();
  }

  addFloatingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { 
          transform: translateY(0px); 
          filter: drop-shadow(0px 0px 2px rgba(210, 210, 210, 0.31));
        }
        50% { 
          transform: translateY(-36px); 
          filter: drop-shadow(0px 0px 40px rgb(0, 0, 0));
        }
        100% {
          transform: translateY(0px); 
          filter: drop-shadow(0px 0px 2px rgba(210, 210, 210, 0.31));
        }
      }
      .logo {
        overflow: hidden;
        transition: opacity 2s ease-in-out;
        filter: drop-shadow(1px 1px 1px #919191,
        1px 2px 1px #919191,
        1px 3px 1px #919191,
        1px 4px 1px #919191,
        1px 5px 1px #919191,
        1px 6px 1px #919191,
        1px 7px 1px #919191,
        1px 8px 1px #919191,
        1px 9px 1px #919191,
        1px 10px 1px #919191,
    1px 18px 6px rgba(16,16,16,0.4),
    1px 22px 10px rgba(16,16,16,0.2),
    1px 25px 35px rgba(16,16,16,0.2),
    1px 30px 60px rgba(16,16,16,0.4))
      }
      .logo.active {
        animation: float 10s ease-in-out infinite;
        opacity: 1;
      }
      .logo:not(.active) {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }

  init() {
    if (this.logos.length > 0) {
      this.logos[0].classList.add("active");
    }
  }

  start(intervalTime = 10000) {
    this.interval = setInterval(() => {
      this.rotate();
    }, intervalTime);
  }

  rotate() {
    const currentLogo = this.logos[this.currentIndex];
    const nextIndex = (this.currentIndex + 1) % this.logos.length;
    const nextLogo = this.logos[nextIndex];

    // Smooth transition between logos
    currentLogo.classList.remove("active");
    nextLogo.classList.add("active");

    this.currentIndex = nextIndex;
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
