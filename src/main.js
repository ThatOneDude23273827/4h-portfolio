import { config } from './config.js';

const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const game = new Phaser.Game(config);

const OnChangeScreen = () => {
    let isLandscape = screen.orientation.type.includes('landscape');
    let rotateAlert = document.getElementById('rotateAlert');

    if (!isMobile() || isLandscape) {
        game.isPaused = false;
        rotateAlert.classList.add('hide');
    } else {
        game.isPaused = true;
        rotateAlert.classList.remove('hide');
        document.getElementById('game-container').classList.add('hide');
    }
};

OnChangeScreen();

let _orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
_orientation.addEventListener('change', OnChangeScreen);
window.addEventListener('resize', OnChangeScreen);
