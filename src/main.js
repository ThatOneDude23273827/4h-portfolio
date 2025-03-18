import { Start } from './scenes/Start.js';

const config = {
    type: Phaser.AUTO,
    title: '4H Portfolio',
    parent: 'game-container',
    width: 1280,
    height: 720,
    pixelArt: false,
    backgroundColor: '#FFFFFF',
    scene: [
        Start
    ],
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}
new Phaser.Game(config);
