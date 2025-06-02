import { ButtonTop } from './js/pages/buttonTop';
import { CustomSlider } from './js/slider';

const customSlider = new CustomSlider('[data-slider]', { perPage: 3 });

customSlider.init();

const buttonTop = new ButtonTop('#button-top');
buttonTop.init();
