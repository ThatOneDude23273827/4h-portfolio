import * as pdfjsLib from '../pdfJs/build/pdf.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = '../src/pdfJs/build/pdf.worker.mjs';

export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
        this.tabContainers = {};
        this.numLoaded = {};
        this.overlays = [];
        this.yearSelected = null;
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
        homeContainer.add(
            // Math.floor() makes the text less blurry (I think?)
            this.add.text(Math.floor(this.scale.width / 2), Math.floor(this.scale.height / 2 - 200), 
            "\n\n\n\n\n\n             I'm Caleb, and I enjoy programming as both a hobby and semi-paying job.\nAs a matter a fact, this website has been entirely programmed by me, and you can view its source\n                                   code under the Showcase Tab.\n\n\nBefore you look at my different 305 Forms, note that due to DOM restrictions with JavaScript,\nwhen using the site's built-in PDF Viewer, you must scroll up or down on the document outside\nthe PDF Page. Or simply download the PDF after selecting the year and form.", {
                fontSize: '20px',
                color: textColor
            })
            .setOrigin(0.5)
        );
        this.graphics.fillStyle(this.hexStringToNumber('#006600'), 1);
        homeContainer.add(this.graphics.fillRoundedRect(this.scale.width / 2 - 300, 350, 600, 300, 30));
        const sectionAButton = this.add.text(this.scale.width / 2 - 190, this.scale.height / 2 + 15, 'Section A', {
            fontSize: `24px`,
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center'
        })
        .setOrigin(0.5, 0.5)
        .setPadding(10)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.handlePdfChoice(2, 1, this.scale.width / 2))
        .on('pointerover', () => sectionAButton.setColor('#3333ff'))
        .on('pointerout', () => sectionAButton.setColor('#FFFFFF'));
        const sectionBButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 15, 'Section B', {
            fontSize: `24px`,
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center'
        })
        .setOrigin(0.5, 0.5)
        .setPadding(10)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.handlePdfChoice(2, 2, this.scale.width / 2))
        .on('pointerover', () => sectionBButton.setColor('#3333ff'))
        .on('pointerout', () => sectionBButton.setColor('#FFFFFF'));
        const sectionCButton = this.add.text(this.scale.width / 2 + 190, this.scale.height / 2 + 15, 'Section C', {
            fontSize: `24px`,
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center'
        })
        .setOrigin(0.5, 0.5)
        .setPadding(10)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.handlePdfChoice(2, 3, this.scale.width / 2))
        .on('pointerover', () => sectionCButton.setColor('#3333ff'))
        .on('pointerout', () => sectionCButton.setColor('#FFFFFF'));
        const year1Button = this.add.text(this.scale.width / 2, this.scale.height / 2 + 60, '2024', {
            fontSize: `24px`,
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center'
        })
        .setOrigin(0.5, 0.5)
        .setPadding(10)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {year1Button.setColor('#000000'); this.yearSelected=2024;});
        homeContainer.add(year1Button);
        homeContainer.add(sectionAButton);
        homeContainer.add(sectionBButton);
        homeContainer.add(sectionCButton);
        homeContainer.add(
            this.add.text(this.scale.width / 2 - 150, this.scale.height / 2 + 110, 'View', {
                fontSize: `24px`,
                color: '#FFFFFF',
                padding: { x: 10, y: 5 },
                align: 'center'
            })
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true })
        );
        homeContainer.add(
            this.add.text(this.scale.width / 2 + 150, this.scale.height / 2 + 110, 'Download', {
                fontSize: `24px`,
                color: '#FFFFFF',
                padding: { x: 10, y: 5 },
                align: 'center'
            })
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true })
        );
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

    loadPdf(section, x) {
        let pdfUrl = null;

        if (section === 1 && this.yearSelected) {
            pdfUrl = `./assets/section-a-${this.yearSelected}.pdf`
        } else if (section === 2 && this.yearSelected) {
            pdfUrl = `./assets/section-b-${this.yearSelected}.pdf`
        } else if (section === 3 && this.yearSelected) {
            pdfUrl = `./assets/section-c-${this.yearSelected}.pdf`
        } else {
            return
        };

        const pdfContainer = this.add.container(x, 0);

        const rect = this.add.image(
            this.scale.width / 2, this.scale.height / 2, 'gameBG'
        );
        rect.setInteractive({ useHandCursor: true });
        rect.setOrigin(0.5, 0.5);
        rect.setDisplaySize(this.scale.width, this.scale.height);
        rect.on('pointerdown', () => {
            pdfContainer.destroy();
            rect.destroy();
        });

        pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
            const numPages = pdf.numPages;

            const renderPage = (pageNum) => {
                pdf.getPage(pageNum).then(page => {
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    const context = canvas.getContext('2d');
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext).promise.then(() => {
                        const pageElement = this.add.dom(0, viewport.height * (pageNum - 1), canvas).setOrigin(0.5, 0);
                        pageElement.setInteractive();
                        pdfContainer.add(pageElement);

                        pageElement.node.addEventListener('click', (event) => {
                            event.stopPropagation();
                        });

                        if (pageNum === pdf.numPages) {
                            setupScrollablePanel();
                        };
                    });
                });
            };

            for (let i = 1; i <= numPages; i++) {
                renderPage(i);
            };
        })  .catch(err => {
                console.error('Error loading PDF: ', err);
            });

        const setupScrollablePanel = () => {
            const totalHeight = pdfContainer.list.reduce((acc, page) => acc + page.height, 0);
            const maskShape = this.make.graphics();
            maskShape.fillRect(this.scale.width / 2, this.scale.height / 2, 800, 600);
            const mask = maskShape.createGeometryMask();
            pdfContainer.setMask(mask);

            const scrollSpeed = 30;
            this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => { // Yes 4 of these values are unused but they are still passed
                pdfContainer.y -= Phaser.Math.Clamp(deltaY, -scrollSpeed, scrollSpeed);
                pdfContainer.y = Phaser.Math.Clamp(pdfContainer.y, -totalHeight + 600, 0);
            });
        };
    };

    handlePdfChoice(action, section, xIfLoaded) {
        let sectionStr = null;

        if (section === 1) {
            sectionStr = 'a'
        } else if (section === 2) {
            sectionStr = 'b'
        } else if (section === 3) {
            sectionStr = 'c'
        };

        if (action === 1) {
            const link = document.createElement('a');
            link.href = `./assets/section-${sectionStr}-${this.yearSelected}.pdf`;
            link.download = url.split('/').pop();
            link.click();
        } else {
            this.loadPdf(section, xIfLoaded);
        };
    };
};
