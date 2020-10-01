let videos = document.querySelectorAll('.video__preview');

for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
}

function setupVideo(video) {
    const link = video.querySelector('.video__link');
    const id = parseMediaURL(link);

    video.addEventListener('click', () => {
        const iframe = createIframe(id);
        const videoPlayer = createVideoPlayer();
        document.querySelector('body').appendChild(videoPlayer);
        videoPlayer.appendChild(iframe);
    });

    link?.removeAttribute('href');
}

function parseMediaURL(link) {
    const url = link?.href;
    let match = url?.split('/') || [];

    const video = match.pop();

    const regexp = /(watch\?v=)?([a-zA-Z0-9_-]+)&?/i;
    match = video?.match(regexp) || [];
    const id = match.pop();

    return id || video;
}

function createVideoPlayer() {
    const videoPlayer = document.createElement('div');
    videoPlayer.classList.add('video__container');

    const closeVideoButton = document.createElement('span');
    closeVideoButton.classList.add('close');
    closeVideoButton.setAttribute('title', 'Close');

    videoPlayer.appendChild(closeVideoButton);

    const videoBackground = document.createElement('div');
    videoBackground.classList.add('video__background');
    document.querySelector('body').appendChild(videoBackground);

    const closeHandler = () => {
        closeVideoButton.removeEventListener('click', closeHandler)
        videoPlayer.remove();
        videoBackground.remove();
    }

    closeVideoButton.addEventListener('click', closeHandler);
    videoBackground.addEventListener('click', closeHandler);

    return videoPlayer;
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
    return `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=1`;
}
