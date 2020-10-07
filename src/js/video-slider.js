(function () {
    const slider = document.querySelector('.slider__list');

    if (!slider) return;

    let itemsNumber;
    let itemWidth;
    let maxPosition;

    const calculateData = () => {
        itemsNumber = slider.children.length;
        itemWidth = slider.children[0].clientWidth;
        maxPosition = itemsNumber - (slider.clientWidth / itemWidth);
    }

    const resizeHandler = () => {
        calculateData();
    }

    calculateData();
    window.addEventListener('resize', resizeHandler);

    const sliderDots = document.querySelectorAll('.slider__dot');

    const prevSliderButton = document.querySelector('.slider__button--prev');
    const nextSliderButton = document.querySelector('.slider__button--next');

    let position = 0;

    const moveSliderPosition = () => {
        slider.style.transform = `translateX(${position * itemWidth}px)`;
        const newPosition = -position + (slider.clientWidth / itemWidth > 1 ? (itemsNumber - maxPosition) % 2 : 0);
        if (sliderDots[newPosition]) {
            sliderDots[newPosition].checked = true;
        }
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

    const clickHandlerDot = ({ target }) => {
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
})()
