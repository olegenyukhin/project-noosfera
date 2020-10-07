(function () {
    const mainNavButton = document.querySelector('.header-menu-button');
    const mainNavigation = document.querySelector('.main-nav');
    const headerNavigation = document.querySelector('.header-nav');

    const mainNavButtonHandler = () => {
        mainNavigation.classList.toggle('main-nav--opened');
        headerNavigation.classList.toggle('header-nav--opened');
        const mainNavLinks = document.querySelectorAll('.main-nav__link');
        mainNavLinks.forEach(link => {
            link.removeEventListener('click', mainNavButtonHandler);
            if (mainNavigation.classList.contains('main-nav--opened')) {
                link.addEventListener('click', mainNavButtonHandler);
            }
        });
    }

    mainNavButton.addEventListener('click', mainNavButtonHandler);
})()
