const slider = document.querySelector('.slider__list');
const itemsNumber = slider.children.length;
const itemWidth = slider.children[0].clientWidth;
const maxPosition = itemsNumber - (slider.clientWidth / itemWidth);

const sliderDots = document.querySelectorAll('.slider__dot');

const prevSliderButton = document.querySelector('.slider__button--prev');
const nextSliderButton = document.querySelector('.slider__button--next');

let position = 0;

const moveSliderPosition = () => {
    sliderDots[-position + 1].checked = true;
    slider.style.transform = `translateX(${position * itemWidth}px)`;
}

const increasePositionHandler = () => {
    if (position >= 0) {
        position = -maxPosition - 1;
    }
    position++;
    moveSliderPosition();
}

const decreasePositionHandler = () => {
    if (position <= -maxPosition) {
        position = 1;
    }
    position--;
    moveSliderPosition();
}

const clickHandlerDot = ({target}) => {
    const number = target.dataset.number;
    const middleItem = Math.ceil(itemsNumber / 2);
    position = -(number - middleItem);

    if (position > 0) position = 0;
    if (position < -maxPosition) position = -maxPosition;

    slider.style.transform = `translateX(${position * itemWidth}px)`;
}

prevSliderButton.addEventListener('click', increasePositionHandler)
nextSliderButton.addEventListener('click', decreasePositionHandler)

sliderDots.forEach(dot => {
    dot.addEventListener('click', clickHandlerDot)
})
