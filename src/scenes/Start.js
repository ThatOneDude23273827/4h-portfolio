import * as pdfjsLib from '../pdfJs/build/pdf.mjs';

async function testResponse() {
    fetch('./src/pdfJs/build/pdf.worker.mjs')
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.ok;
    })
    .catch(error => {
        console.error('Fetch error:', error);
})};

async function setWorkerSrc() {
  const isWorkerAvailable = await testResponse();
  if (!isWorkerAvailable) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './src/pdfJs/build/pdf.worker.mjs';
  } else {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '../4h-portfolio/src/pdfJs/build/pdf.worker.mjs';
  }
}

setWorkerSrc();

export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
        this.tabContainers = {};
        this.numLoaded = {};
        this.overlays = [];
        this.yearSelected = null;
        this.formSelected = null;
    };

    preload() {
        this.load.image('bg', './assets/bg.jpg');
        this.load.image('gameBG', './assets/code.jpg');
        this.load.image('clover', './assets/clover.png');
    };

    create() {
        // Background image
        this.bg = this.add.tileSprite(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 'bg')
            .setOrigin(0.5, 0.5);

        // Background image cover
        this.colorBlock = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width * 0.93, 800, this.hexStringToNumber('#262926'))
            .setOrigin(0.5, 0.5);
        
        // Tabs
        const baseFontSize = 24;
        const tabNames = ['Home', 'Resume', 'Photos', 'Showcase'];
        let xOffset = 60;
        
        tabNames.forEach((name) => {
            const fontSize = baseFontSize * (this.scale.width / 800);
            const button = this.add.text(xOffset, 10, name, {
                fontSize: `${fontSize}px`,
                color: '#15ff00ea',
                backgroundColor: '#262926',
                padding: { x: 10, y: 5 },
                align: 'center'
            })
                .setOrigin(0, 0)
                .setPadding(10)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.handleTabClick(name))
                .on('pointerover', () => button.setColor('#FFFFFF'))
                .on('pointerout', () => button.setColor('#15ff00ea'));
            xOffset += button.width + 20;
        });

        this.graphics = this.add.graphics();

        this.initializeTabContent('#15ff00ea');

        // Separation Bar
        this.add.rectangle(this.scale.width / 2, 70, this.scale.width * 0.9, 2, this.hexStringToNumber('#FFFFFF')).setOrigin(0.5, 0);
        
        // Name text
        this.add.text(this.scale.width - 150, 30, "Caleb Pickering's 4H Portfolio", {
            fontSize: '20px',
            color: '#FFFFFF',
        }).setOrigin(1, 0);

        // 4-H Clover Icon
        //this.cloverIcon = this.add.image(this.scale.width - 120, this.scale.height / 2 - 320, 'clover')
        //    .setScale(0.1, 0.1)
        //    .setOrigin(0.5, 0.5);
    };

    update() {
        this.bg.tilePositionY += 0.5;
    };

    initializeTabContent(textColor) {
        // Home Tab Container
        let homeContainer = this.add.container(0, 0);
        homeContainer.add(
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 250, 'Home', {
                fontSize: '40px',
                color: textColor
            }).setOrigin(0.5)
        );
        this.graphics.fillStyle(this.hexStringToNumber('#006600'), 1);
        const filler = this.graphics.fillRoundedRect(this.scale.width / 2 - 200, 290, 400, 360, 30);
        homeContainer.add(filler);
        const viewButton = this.add.text(this.scale.width / 2 - 60, 290 - 15, 'View', {
            fontSize: '24px',
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center',
            backgroundColor: '#0e9e0e',
        })
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { this.handlePdfChoice(2); })
        .on('pointerover', () => viewButton.setColor('#3f3fe0'))
        .on('pointerout', () => viewButton.setColor('#FFFFFF'));
        homeContainer.add(viewButton);
        const downloadButton = this.add.text(this.scale.width / 2 + 40, 290 - 15, 'Download', {
            fontSize: '24px',
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center',
            backgroundColor: '#0e9e0e',
        })
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { this.handlePdfChoice(1); })
        .on('pointerover', () => downloadButton.setColor('#3f3fe0'))
        .on('pointerout', () => downloadButton.setColor('#FFFFFF'));
        homeContainer.add(downloadButton);
        let dropdownButton = this.add.text(Math.floor(this.scale.width / 2), Math.floor(370), 'Select Form', {
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '20px',
            fontFamily: 'Times New Roman',
            padding: { x: 10, y: 5 }
        })
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5, 0.5)
        .on('pointerdown', () => {optionsContainer.setVisible(true);});
        let optionsContainer = this.add.container(dropdownButton.x, dropdownButton.y + 40).setVisible(false);
        let options = ['Section A', 'Section B', 'Section C'];
        options.forEach((opt, index) => {
            let optionText = this.add.text(0, index * 30, opt, {
                backgroundColor: '#333',
                color: '#fff',
                fontSize: '20px',
                fontFamily: 'Times New Roman',
                padding: { x: 5, y: 2 }
            })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => {optionsContainer.setVisible(false); this.formSelected = opt; dropdownButton.setText(opt);})
            .setInteractive({ useHandCursor: true });

            optionsContainer.add(optionText);
        });
        let dropdownButton2 = this.add.text(Math.floor(this.scale.width / 2), Math.floor(420 + 3 * 35), 'Select Year', {
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '20px',
            fontFamily: 'Times New Roman',
            padding: { x: 10, y: 5 }
        })
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5, 0.5)
        .on('pointerdown', () => {optionsContainer2.setVisible(true);});
        let optionsContainer2 = this.add.container(dropdownButton2.x, dropdownButton2.y + 40).setVisible(false);
        let options2 = ['2023', '2024'];
        options2.forEach((opt, index) => {
            let optionText2 = this.add.text(0, index * 30, opt, {
                backgroundColor: '#333',
                color: '#fff',
                fontSize: '20px',
                fontFamily: 'Times New Roman',
                padding: { x: 5, y: 2 }
            })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => {optionsContainer2.setVisible(false); this.yearSelected = Number(opt); dropdownButton2.setText(`${this.yearSelected}`);})
            .setInteractive({ useHandCursor: true });

            optionsContainer2.add(optionText2);
        });
        homeContainer.add([optionsContainer, optionsContainer2, dropdownButton, dropdownButton2]);
        homeContainer.add(this.add.text(dropdownButton.x, dropdownButton.y - 30, 'Form:', {fontFamily: 'Helvetica'}).setOrigin(0.5, 0.5));
        homeContainer.add(this.add.text(dropdownButton2.x, dropdownButton2.y - 30, 'Year:', {fontFamily: 'Helvetica'}).setOrigin(0.5, 0.5));
        this.tabContainers['Home'] = homeContainer;

        // Resume Tab Container
        let resumeContainer = this.add.container(0, 0);
        resumeContainer.add(
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 250, 'Resume', {
                fontSize: '40px',
                color: textColor
            }).setOrigin(0.5)
        );
        resumeContainer.add(
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 200, 'Resume Content Here', {
                fontSize: '30px',
                color: textColor
            }).setOrigin(0.5),
        );
        this.tabContainers['Resume'] = resumeContainer;

        // Photos Tab Container
        let photosContainer = this.add.container(0, 0);
        photosContainer.add(
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 250, 'Photos', {
                fontSize: '40px',
                color: textColor
            }).setOrigin(0.5)
        );
        photosContainer.add(
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 200, 'Photos Content Here', {
                fontSize: '30px',
                color: textColor
            }).setOrigin(0.5)
        );
        this.tabContainers['Photos'] = photosContainer;

        // Showcase Tab Container
        let showcaseContainer = this.add.container(0, 0);
        showcaseContainer.add(
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 250, 'Showcase', {
                fontSize: '40px',
                color: textColor
            }).setOrigin(0.5)
        );
        showcaseContainer.add(
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 200, 'Showcase Content Here', {
                fontSize: '30px',
                color: textColor
            }).setOrigin(0.5)
        );
        let buttonText = 'Space Shooter Game';
        let loadGameButton = this.add.text(80, this.scale.height / 2 * 0.25, 'Load ' + buttonText, {
            fontSize: '24px',
            color: '#15ff00ea',
            backgroundColor: '#247732',
            padding: { x: 10, y: 5 }
        });
        showcaseContainer.add(loadGameButton
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.loadMiniGame('https://thatoneguy2664.github.io/Astral-Shooter/', 1)));
        buttonText = 'RPG-Style Name Generator';
        loadGameButton = this.add.text(80, this.scale.height / 2 * 0.35, 'Load ' + buttonText, {
            fontSize: '24px',
            color: '#15ff00ea',
            backgroundColor: '#247732',
            padding: { x: 10, y: 5 }
        });
        showcaseContainer.add(loadGameButton
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.loadMiniGame('https://thatoneguy2664.github.io/Fantasy-Name-Generator/', 2)));
        this.tabContainers['Showcase'] = showcaseContainer;

        // Initially, show only the Home container
        this.handleTabClick('Home');
    };

    handleTabClick(tabName) {
        console.log(`${tabName} tab clicked`);
        Object.values(this.tabContainers).forEach(container => {
            container.setVisible(false);
        });
        if (this.tabContainers[tabName]) {
            this.tabContainers[tabName].setVisible(true);
        };
    };

    // To avoid syntax errors when using hex codes when required as a number instead of string
    hexStringToNumber(hex) {
        return parseInt(hex.replace('#', '0x'));
    };

    loadMiniGame(url, num) {
        if (!this.numLoaded[num]) {
            this.numLoaded[num] = true;
            console.log('Embedding new game...');

            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.width = '1000px';
            iframe.style.height = '600px';
            iframe.style.border = '2px solid #FFFFFF';

            if (!this.embeddedContainers) this.embeddedContainers = {};
            if (!this.embeddedContainers[num]) {
                const embeddedContainer = document.createElement('div');
                document.body.style.display = 'flex';
                embeddedContainer.id = `embeddedGameContainer${num}`;
                embeddedContainer.style.position = 'absolute';
                embeddedContainer.style.top = '50%';
                embeddedContainer.style.left = '50%';
                embeddedContainer.style.transform = 'translate(-50%, -50%)';
                document.body.appendChild(embeddedContainer);
                this.embeddedContainers[num] = embeddedContainer;
            }

            this.embeddedContainers[num].appendChild(iframe);
        };

        if (!this.overlays[num]) {
            let rect = this.add.image(
                this.scale.width / 2, this.scale.height / 2, 'gameBG'
            );
            rect.setInteractive({ useHandCursor: true });
            rect.setOrigin(0.5, 0.5);
            rect.setDisplaySize(this.scale.width, this.scale.height);

            this.overlays[num] = rect;
            this.embeddedContainers[num].classList.remove('hide');

            rect.on('pointerdown', () => {
                this.embeddedContainers[num].classList.toggle('hide');
                rect.setVisible(!rect.visible);
            });
        } else {
            this.embeddedContainers[num].classList.toggle('hide');
            this.overlays[num].setVisible(!this.overlays[num].visible);
        };
    };

    loadPdf() {
        let pdfUrl = null;

        if (this.formSelected === 'Section A' && this.yearSelected) {
            pdfUrl = `./assets/section-a-${this.yearSelected}.pdf`
        } else if (this.formSelected === 'Section B' && this.yearSelected) {
            pdfUrl = `./assets/section-b-${this.yearSelected}.pdf`
        } else if (this.formSelected === 'Section C' && this.yearSelected) {
            pdfUrl = `./assets/section-c-${this.yearSelected}.pdf`
        } else {
            return
        };

        window.location.href = `../src/pdfReader/src/index.html?file=${encodeURIComponent(pdfUrl)}`;
    };

    handlePdfChoice(action) {
        let sectionStr = null;

        if (this.formSelected === 'Section A' && this.yearSelected) {
            sectionStr = 'a';
        } else if (this.formSelected === 'Section B' && this.yearSelected) {
            sectionStr = 'b';
        } else if (this.formSelected === 'Section C' && this.yearSelected) {
            sectionStr = 'c';
        } else {
            return 1
        };

        if (action === 1) {
            const link = document.createElement('a');
            link.href = `./assets/section-${sectionStr}-${this.yearSelected}.pdf`;
            link.download = `./assets/section-${sectionStr}-${this.yearSelected}.pdf`.split('/').pop();
            link.click();
        } else {
            this.loadPdf();
        };
    };
};
