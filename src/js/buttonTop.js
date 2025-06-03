export class ButtonTop {
  elements = {};
  defaultOptions = { offsetTop: 0, offsetBottom: 100 };
  options = {};

  constructor(targetSelector, options = this.defaultOptions) {
    this.elements.button = document.querySelector(targetSelector);
    Object.assign(this.options, this.defaultOptions, options);
  }

  goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  culculateButtonPropertis = () => {
    const { offsetTop, offsetBottom } = this.options;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const offsetHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPersentage = Math.floor((scrollTop / (offsetHeight - clientHeight)) * 100);

    this.elements.button.style.setProperty('--_scroll-persentage', scrollPersentage + '%');

    if (scrollPersentage >= offsetTop && scrollPersentage <= offsetBottom) {
      this.elements.button.hidden = false;
    } else {
      this.elements.button.hidden = true;
    }
  };

  init() {
    this.elements.button.addEventListener('click', this.goToTop);
    window.addEventListener('scroll', this.culculateButtonPropertis);
    this.culculateButtonPropertis();
  }

  destroy() {
    this.elements.button.removeEventListener('click', this.goToTop);
    window.removeEventListener('scroll', this.culculateButtonPropertis);
  }
}
