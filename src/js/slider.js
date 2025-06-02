export class CustomSlider {
  targetSelector = null;
  elements = {};
  currentSlide = null;
  currentSlideIndex = 0;

  constructor(targetSelector) {
    this.targetSelector = targetSelector;
  }

  clickNext = () => {
    let targetIndex = +this.currentSlideIndex + 1;
    if (!this.getSlideByIndex(targetIndex)) {
      targetIndex = 0;
    }
    this.scrollToSlide(targetIndex);
  };

  clickPrev = () => {
    let targetIndex = +this.currentSlideIndex - 1;
    if (!this.getSlideByIndex(targetIndex)) {
      targetIndex = this.elements.items.length - 1;
    }
    this.scrollToSlide(targetIndex);
  };

  clickPaginationItem = (evt) => {
    const index = evt.target.dataset.sliderPaginationItem;
    this.scrollToSlide(index);
  };

  getSlideByIndex(index) {
    return this.elements.items.some((el) => el.dataset.sliderItem === String(index));
  }

  scrollToSlide = (index) => {
    const targetSlide = this.elements.content.querySelector(`[data-slider-item="${index}"]`);
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'center' });
    }
  };

  addEventHandlers() {
    this.elements.controls.next.addEventListener('click', this.clickNext);
    this.elements.controls.prev.addEventListener('click', this.clickPrev);

    this.elements.pagination.items.forEach((el) => {
      el.addEventListener('click', this.clickPaginationItem);
    });
  }

  observeSliderContent() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.currentSlide = entry.target;
            this.currentSlideIndex = this.currentSlide.dataset.sliderItem;
            this.elements.pagination.items.forEach((pagItem) => {
              pagItem.classList.toggle(
                'active',
                pagItem.dataset.sliderPaginationItem === this.currentSlideIndex
              );
            });
          }
        });
      },
      {
        root: this.elements.content,
        rootMargin: ' 0px -80% 0px 0px ', // top right bottom left
        threshold: 0.4
      }
    );

    this.elements.items.forEach((sliderItem) => observer.observe(sliderItem));
  }

  generateSliderPagination() {
    this.elements.pagination.container.innerHTML = '';
    this.elements.pagination.items = [];

    this.elements.items.forEach((elem, index) => {
      elem.dataset.sliderItem = index;
      const paginationItem = document.createElement('li');
      paginationItem.classList.add('pagination-list--item');
      paginationItem.dataset.sliderPaginationItem = index;
      this.elements.pagination.items.push(paginationItem);
      this.elements.pagination.container.appendChild(paginationItem);
    });

    // test
    this.elements.content.appendChild(this.elements.items.at(0).cloneNode(true));
    this.elements.content.appendChild(this.elements.items.at(1).cloneNode(true));
    // test end

    this.observeSliderContent();
    this.addEventHandlers();
  }

  getSliderElements() {
    const slider = document.querySelector(this.targetSelector);
    if (!slider) throw new Error('slider not found');
    this.elements = {
      slider,
      content: slider.querySelector('[data-slider-content]'),
      items: Array.from(slider.querySelectorAll('[data-slider-item]')),
      pagination: {
        container: slider.querySelector('[data-slider-pagination]'),
        items: []
      },
      controls: {
        prev: slider.querySelector('[data-slider-control="prev"]'),
        next: slider.querySelector('[data-slider-control="next"]')
      }
    };

    this.generateSliderPagination();
  }

  init() {
    this.getSliderElements();
  }
}

export function createCustomSlider(selector) {
  return new CustomSlider(selector);
}
