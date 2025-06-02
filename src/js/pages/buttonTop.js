export class ButtonTop {
  elements = {};

  constructor(targetSelector) {
    this.elements.button = document.querySelector(targetSelector);
  }

  goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  culculateButtonPropertis = () => {
    const showGap = 200;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const offsetHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPersentage = (scrollTop / (offsetHeight - clientHeight)) * 100;

    this.elements.button.style.setProperty('--_persentage', scrollPersentage + '%');
    if (scrollTop > showGap) {
      this.elements.button.hidden = false;
    } else {
      this.elements.button.hidden = true;
    }
  };

  init() {
    this.elements.button.addEventListener('click', this.goToTop);
    window.addEventListener('scroll', this.culculateButtonPropertis);
  }

  destroy() {
    this.elements.button.removeEventListener('click', this.goToTop);
    window.removeEventListener('scroll', this.culculateButtonPropertis);
  }
}
