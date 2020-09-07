import '../css/normalize.css';
import '../scss/style.scss';

const slider = document.querySelector('.slider__list');
const itemsNumber = slider.children.length;
const itemWidth = slider.children[0].clientWidth;
const maxPosition = itemsNumber - (slider.clientWidth / itemWidth);

const prevSliderButton = document.querySelector('.slider__button--prev');
const nextSliderButton = document.querySelector('.slider__button--next');

let position = 0;

prevSliderButton.addEventListener('click', () => {
    if (position >= 0) {
        position = -maxPosition - 1;
    }
    position++;
    
    sliderDots[-position + 1].checked = true;
    slider.style.transform = `translateX(${position * itemWidth}px)`;
})

nextSliderButton.addEventListener('click', () => {
    if (position <= -maxPosition) {
        position = 1;
    }
    position--;
    
    sliderDots[-position + 1].checked = true;
    slider.style.transform = `translateX(${position * itemWidth}px)`;
})

const sliderDots = document.querySelectorAll('.slider__dot');

sliderDots.forEach(dot => {
    dot.addEventListener('click', ({ target }) => {
        const number = target.dataset.number;
        position = maxPosition - number;

        if (position > 0) position = 0;
        if (position < -maxPosition) position = -2;

        slider.style.transform = `translateX(${position * itemWidth}px)`;
    })
})
