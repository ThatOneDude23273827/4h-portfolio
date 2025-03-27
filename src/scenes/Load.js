export class Load extends Phaser.Scene{
    constructor() {
        super({ key: 'Load' });
    };

    preload() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 4, height / 2 - 25, width / 2, 50);
        const loadText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 60, 'Loading', {fontFamily: 'Helvetica', fontSize: '22px'});
        let dotCount = 0;
        loadText.setOrigin(0.5, 0.5);

        this.time.addEvent({
            delay: 500,
            callback: () => {
                dotCount = (dotCount + 1) % 4;
                const dots = '.'.repeat(dotCount);
                loadText.setText('Loading' + dots);
            },
            loop: true
        });
    
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x07fa07, 1);
            progressBar.fillRect(width / 4 + 10, height / 2 - 15, (width / 2 - 20) * value, 30);
        });
    
        this.load.image('bg', './assets/bg.jpg');
        this.load.image('gameBG', './assets/code.png');
        this.load.image('linkIcon', './assets/link.png');
        this.load.image('brackets', './assets/brackets.png');
        this.load.image('medal', './assets/medal.png');
        this.load.image('cube+', './assets/cube+.png');
        this.load.image('arrowLeft', './assets/arrow-left.png');
        this.load.image('homePicture', './assets/pic/picture.jpg');
        this.load.image('homePicture2', './assets/pic/picture2.jpg');
        this.load.image('picture3', './assets/pic/picture3.jpg');
        this.load.image('picture4', './assets/pic/picture4.jpg');
        this.load.image('picture5', './assets/pic/picture5.jpg');
        this.load.image('picture6', './assets/pic/picture6.jpg');
        this.load.image('picture7', './assets/pic/picture7.jpg');
        this.load.image('picture8', './assets/pic/picture8.jpg');
        this.load.image('picture9', './assets/pic/picture9.jpg');
        this.load.image('picture10', './assets/pic/picture10.jpg');
        this.load.image('picture11', './assets/pic/picture11.jpg');
        this.load.image('picture12', './assets/pic/picture12.jpg');
        this.load.video('video1', './assets/pic/asl_clip.mp4');
        this.load.video('video2', './assets/pic/speech_clip.mp4');
        this.load.image('prev1', './assets/pic/prev1.png');
        this.load.image('prev2', './assets/pic/prev2.png');

        // Slides
        this.load.image('slide1', './assets/presentation/Slide1.PNG');
        this.load.image('slide2', './assets/presentation/Slide2.PNG');
        this.load.image('slide3', './assets/presentation/Slide3.PNG');
        this.load.image('slide4', './assets/presentation/Slide4.PNG');
        this.load.image('slide5', './assets/presentation/Slide5.PNG');
        this.load.image('slide6', './assets/presentation/Slide6.PNG');
        this.load.image('slide7', './assets/presentation/Slide7.PNG');
        this.load.image('slide8', './assets/presentation/Slide8.PNG');
        this.load.image('slide9', './assets/presentation/Slide9.PNG');
        this.load.image('slide10', './assets/presentation/Slide10.PNG');
        this.load.image('slide11', './assets/presentation/Slide11.PNG');
        this.load.image('slide12', './assets/presentation/Slide12.PNG');
    
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            this.scene.start('Main');
        });
    };
};
