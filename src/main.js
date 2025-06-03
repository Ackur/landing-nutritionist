import { ButtonTop } from './js/buttonTop';
import { CustomSlider } from './js/slider';

const elements = { footer: { buttonTop: document.getElementById('footer-button-top') } };

const customSlider = new CustomSlider('[data-slider]', { perPage: 3 });
customSlider.init();

const buttonTop = new ButtonTop('#button-top', { offsetTop: 20, offsetBottom: 93 });
buttonTop.init();

elements.footer.buttonTop.addEventListener('click', buttonTop.goToTop);
