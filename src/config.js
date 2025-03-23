import { Start } from './scenes/Start.js';

export const config = {
    type: Phaser.AUTO,
    title: '4H Portfolio',
    parent: 'game-container',
    width: 1280,
    height: 720,
    pixelArt: false,
    backgroundColor: '#011121',
    scene: [
        Start
    ],
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    },
}
