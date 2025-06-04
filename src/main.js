import { ButtonTop } from './js/buttonTop';
import { CustomSlider } from './js/slider';

const elements = {
  footer: { buttonTop: document.getElementById('footer-button-top') },
  mobileMenu: {
    component: document.querySelector('.mobile-menu'),
    list: document.querySelector('.mobile-menu ul'),
    backdrop: document.querySelector('[data-menu-backdrop]'),
    toggle: document.querySelector('.mobile-menu-button')
  }
};

const customSlider = new CustomSlider('[data-slider]', { perPage: 3 });
customSlider.init();

const buttonTop = new ButtonTop('#button-top', { offsetTop: 20, offsetBottom: 93 });
buttonTop.init();

function toggleMobileMenu() {
  const isActive = elements.mobileMenu.component.classList.toggle('open');
  if (!isActive) {
    elements.mobileMenu.component.classList.add('close');
  } else {
    elements.mobileMenu.component.classList.remove('close');
  }
  document.body.style.overflow = isActive ? 'hidden' : '';
}

function onClickMenuList(evt) {
  if (evt.target.closest('.mobile-menu ul')) {
    evt.stopPropagation();
  }
}

elements.footer.buttonTop.addEventListener('click', buttonTop.goToTop);
elements.mobileMenu.toggle.addEventListener('click', toggleMobileMenu);
elements.mobileMenu.backdrop.addEventListener('click', toggleMobileMenu);
elements.mobileMenu.list.addEventListener('click', onClickMenuList);
