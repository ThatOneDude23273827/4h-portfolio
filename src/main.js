import { config } from './config.js';

const game = new Phaser.Game(config);

const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const OnChangeScreen = () => {
    let isLandscape = screen.orientation.type.includes('landscape');
    let rotateAlert = document.getElementById('rotateAlert');

    if (!isMobile() || isLandscape) {
        game.isPaused = false;
        rotateAlert.classList.add('hidden');
    } else {
        game.isPaused = true;
        rotateAlert.classList.remove('hidden');
    }
};

OnChangeScreen();

let _orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
_orientation.addEventListener('change', OnChangeScreen);
window.addEventListener('resize', OnChangeScreen);
