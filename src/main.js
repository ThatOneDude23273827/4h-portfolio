import { config } from './config.js';

const game = new Phaser.Game(config);
const OnChangeScreen = () => {
    let isLandscape = screen.orientation.type.includes('landscape');
    let rotateAlert = document.getElementById('rotateAlert');
    if (isLandscape) {
        game.isPaused = false;
        if (rotateAlert.classList.contains('flex')) {
            rotateAlert.classList.replace('flex', 'hidden');
        }
        else {
            rotateAlert.classList.add('hidden');
        }
    } else {
        game.isPaused = true;
        if (rotateAlert.classList.contains('hidden')) {
            rotateAlert.classList.replace('hidden', 'flex');
        }
        else {
            rotateAlert.classList.add('flex');
        }
    }
}
OnChangeScreen();

let _orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
_orientation.addEventListener('change', function (e) {
    OnChangeScreen();
});
window.addEventListener('resize', function (e) {
    OnChangeScreen();
});
