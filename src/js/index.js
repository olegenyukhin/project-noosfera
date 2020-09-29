import '../css/normalize.css';
import '../scss/style.scss';

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

function findVideos() {
    let videos = document.querySelectorAll('.video__preview');

    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}

function setupVideo(video) {
    const link = video.querySelector('.video__link');
    const media = video.querySelector('.video__poster');
    const button = video.querySelector('.video__button');
    const videoPlayer = document.querySelector('.video__container');

    const id = parseMediaURL(media);

    video.addEventListener('click', () => {
        videoPlayer.innerHTML = '';
        const iframe = createIframe(id);
        const videoBackground = document.createElement('div');
        videoBackground.classList.add('video__background');

        videoPlayer.style.display = 'block';
        document.querySelector('body').appendChild(videoBackground);
        videoPlayer.appendChild(iframe);

        const closeListener = () => {
            videoPlayer.style.display = 'none';
            closeVideoButton.removeEventListener('click', closeListener)
            videoPlayer.innerHTML = '';
            videoBackground.remove();
        }

        const closeVideoButton = document.createElement('span');
        closeVideoButton.classList.add('close');
        videoPlayer.appendChild(closeVideoButton);
        closeVideoButton.addEventListener('click', closeListener);
    });

    link?.removeAttribute('href');
}

function parseMediaURL(media) {
    const regexp = /([a-zA-Z0-9_-]+)\.jpg/i;
    const url = media?.src;

    const match = url?.match(regexp) || [];

    return match[1];
}

function createIframe(id) {
    const iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__player');

    return iframe;
}

function generateURL(id) {
    const query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
