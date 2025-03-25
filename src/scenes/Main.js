export class Main extends Phaser.Scene {
    constructor() {
        super('Main');
        this.tabContainers = {};
        this.numLoaded = {};
        this.overlays = [];
        this.yearSelected = null;
        this.formSelected = null;
        this.tabs = [];
    };

    create() {
        // Background image
        this.bg = this.add.tileSprite(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 'bg')
            .setOrigin(0.5, 0.5);

        // Background image cover
        this.colorBlock = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width * 0.93, 800, this.hexStringToNumber('#011121'))
            .setOrigin(0.5, 0.5);
        
        // Tabs
        const baseFontSize = 15;
        const tabNames = ['Home', 'Resume', 'Photos', 'Showcase'];
        let xOffset = 60;
        
        tabNames.forEach((name) => {
            if (name != 'Home') {
                const fontSize = baseFontSize * (this.scale.width / 800);
                const button = this.add.text(xOffset, 10 + 9, name, {
                    fontSize: `${fontSize}px`,
                    color: '#FFFFFF',
                    fontFamily: 'Helvetica',
                    backgroundColor: '#021a33',
                    padding: { x: 10, y: 5 },
                    align: 'center'
                })
                    .setOrigin(0, 0)
                    .setPadding(10)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {this.handleTabClick(name); button.setBackgroundColor('#190dac'); this.resetButtons(button)})
                    .on('pointerover', () => button.setColor('#fb8afc'))
                    .on('pointerout', () => button.setColor('#FFFFFF'));
                xOffset += button.width + 20;
                this.tabs.push(button);
            } else {
                const fontSize = baseFontSize * (this.scale.width / 800);
                const button = this.add.text(xOffset, 10 + 9, name, {
                    fontSize: `${fontSize}px`,
                    color: '#FFFFFF',
                    fontFamily: 'Helvetica',
                    backgroundColor: '#190dac',
                    padding: { x: 10, y: 5 },
                    align: 'center'
                })
                    .setOrigin(0, 0)
                    .setPadding(10)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {this.handleTabClick(name); button.setBackgroundColor('#190dac'); this.resetButtons(button)})
                    .on('pointerover', () => button.setColor('#fb8afc'))
                    .on('pointerout', () => button.setColor('#FFFFFF'));
                xOffset += button.width + 20;
                this.tabs.push(button);
            }
        })

        this.graphics = this.add.graphics();

        this.initializeTabContent('#FFFFFF');

        // Separation Bar
        this.add.rectangle(this.scale.width / 2, 70, this.scale.width * 0.9, 2, this.hexStringToNumber('#00FFFF')).setOrigin(0.5, 0);

        // Name text
        this.add.text(this.scale.width - 150, 30, "Caleb Pickering's 4-H Portfolio", {
            fontSize: '25px',
            color: '#FFFFFF',
            fontFamily: 'Helvetica',
        }).setOrigin(1, 0);

        // Footer
        const footer = this.add.rectangle(this.scale.width / 2, this.scale.height, this.scale.width * 0.93, 90, this.hexStringToNumber('#021b33'));
        footer.setOrigin(0.5, 0.5);
        const copyright = this.add.text(this.scale.width / 2, this.scale.height - 25, '© 2025 Caleb Pickering, All Rights Reserved.\nProgramed by Caleb Pickering using the following languages: HTML5, JavaScript, CSS.', {align: 'center'});
            copyright.setColor('#FFFFFF');
        copyright.setOrigin(0.5, 0.5);
    };

    update() {
        this.bg.tilePositionY += 0.5;
    };

    initializeTabContent(textColor) {
        // Home Tab Container
        let homeContainer = this.add.container(0, 0);
        this.graphics.fillStyle(this.hexStringToNumber('#147d7d'), 1);
        const filler = this.graphics.fillRoundedRect(this.scale.width / 2 - 200, 290, 400, 360, 30);
        homeContainer.add(filler);
        const viewButton = this.add.text(this.scale.width / 2 - 58, 290 - 15, 'View', {
            fontSize: '24px',
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center',
            backgroundColor: '#190dac',
            fontFamily: 'Helvetica'
        })
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { this.handlePdfChoice(2); })
        .on('pointerover', () => viewButton.setColor('#fb8afc'))
        .on('pointerout', () => viewButton.setColor('#FFFFFF'));
        homeContainer.add(viewButton);
        const downloadButton = this.add.text(this.scale.width / 2 + 40, 290 - 15, 'Download', {
            fontSize: '24px',
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center',
            backgroundColor: '#190dac',
            fontFamily: 'Helvetica'
        })
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { this.handlePdfChoice(1); })
        .on('pointerover', () => downloadButton.setColor('#fb8afc'))
        .on('pointerout', () => downloadButton.setColor('#FFFFFF'));
        homeContainer.add(downloadButton);
        let dropdownButton = this.add.text(Math.floor(this.scale.width / 2), Math.floor(370), 'Select Form', {
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '20px',
            fontFamily: 'Times New Roman',
            padding: { x: 10, y: 5 },
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
        const pic1 = this.add.image(this.scale.width / 2 - 400, this.scale.height / 2 + 100, 'homePicture');
        const pic2 = this.add.image(this.scale.width / 2 + 400, this.scale.height / 2 + 100, 'homePicture2');
        pic2.scale = 0.4;
        pic1.scale = 0.3;
        homeContainer.add([pic1, pic2]);
        this.tabContainers['Home'] = homeContainer;

        // Resume Tab Container
        let resumeContainer = this.add.container(0, 0);
        const resumeHeader = this.add.text(Math.floor(this.scale.width / 2), Math.floor(this.scale.height / 2 - 250), 'Objective:', {
            fontSize: '30px',
            color: textColor,
            fontFamily: 'Times New Roman',
        }).setOrigin(0.5);
        resumeContainer.add(resumeHeader);
        this.tabContainers['Resume'] = resumeContainer;
        const resumeObjectiveText = this.add.text(Math.floor(this.scale.width / 2), Math.floor(this.scale.height / 2 - 200), 'The objective of this resume is to highlight skills and lessons learned through 4-H, other avenues in life,\nand more specifcally, through work in my project area. (Computers & Technology)', {
            fontSize: '26px',
            color: textColor,
            fontFamily: 'Times New Roman',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        resumeContainer.add(resumeObjectiveText);
        const medalIcon = this.add.image(this.scale.width / 2 + (40 * 1.9), this.scale.height / 2, 'medal'); 
        const bracketsIcon = this.add.image(this.scale.width / 2 + 315, this.scale.height / 2 - 90, 'brackets');
        const cubeIcon = this.add.image(this.scale.width / 2 - 315, this.scale.height / 2 - 90, 'cube+');
        medalIcon.scale = 1.5;
        bracketsIcon.scale - 1.5;
        cubeIcon.scale = 2.2;
        resumeContainer.add(this.add.text(this.scale.width / 2, this.scale.height / 2, 'Awards', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5));
        resumeContainer.add(this.add.text(this.scale.width / 2 + 315 + (40 * 2) + 5, this.scale.height / 2 - 90, 'Projects', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5));
        resumeContainer.add(this.add.text(this.scale.width / 2 - 4 - 315 - (40 * 1.9), this.scale.height / 2 - 90, 'Hobbies', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5));
        resumeContainer.add([medalIcon, bracketsIcon, cubeIcon]);
        const viewButton2 = this.add.text(this.scale.width / 2 - 58, 290 - 15, 'View', {
            fontSize: '24px',
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center',
            backgroundColor: '#190dac',
            fontFamily: 'Helvetica'
        })
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { this.handlePdfChoice(3); })
        .on('pointerover', () => viewButton.setColor('#fb8afc'))
        .on('pointerout', () => viewButton.setColor('#FFFFFF'));
        homeContainer.add(viewButton);
        const downloadButton2 = this.add.text(this.scale.width / 2 + 40, 290 - 15, 'Download', {
            fontSize: '24px',
            color: '#FFFFFF',
            padding: { x: 10, y: 5 },
            align: 'center',
            backgroundColor: '#190dac',
            fontFamily: 'Helvetica'
        })
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { this.handlePdfChoice(4); })
        .on('pointerover', () => downloadButton.setColor('#fb8afc'))
        .on('pointerout', () => downloadButton.setColor('#FFFFFF'));
        resumeContainer.add([downloadButton2, viewButton2]);

        // Photos Tab Container
        let photosContainer = this.add.container(0, 0);
        const leadershipIndex = [2, 3]; // min, max
        const citizenIndex = [4, 7];
        const projectIndex = [];
        let projectHeader = this.add.text(
            this.scale.width / 2,
            (this.scale.height / 2) * 0.5,
            'Project Area',
            { fontFamily: 'Helvetica', fontSize: '32px' }
        );
	    projectHeader.setOrigin(0.5, 0.5);
        let leadershipHeader = this.add.text(
            this.scale.width / 2 - this.scale.width / 2 / 2,
            (this.scale.height / 2) * 0.5,
            'Leadership',
            { fontFamily: 'Helvetica', fontSize: '32px' }
        );
	    leadershipHeader.setOrigin(0.5, 0.5);
        let citizenshipHeader = this.add.text(
            this.scale.width / 2 + this.scale.width / 2 / 2,
            (this.scale.height / 2) * 0.5,
            'Citizenship',
            { fontFamily: 'Helvetica', fontSize: '32px' }
        );
	    citizenshipHeader.setOrigin(0.5, 0.5);
        let citizenshipContainer = this.add.container(
            citizenshipHeader.x,
            citizenshipHeader.y + citizenshipHeader.height + 10 + 50 + 50 + 30 + 10 - 15
        );
        const citizenshipImages = ['picture3', 'picture4', 'picture5', 'picture6', 'picture7', 'homePicture2'];
        let citizenshipAreaIndex = 0;
        let citizenshipImage = this.add.image(0, 0, citizenshipImages[citizenshipAreaIndex]).setOrigin(0.5);
        citizenshipImage.scale = 0.25;
        citizenshipContainer.add(citizenshipImage);
        let arrowOffset = citizenshipImage.displayWidth / 2 + 20;
        let arrowLeft = this.add.image(-arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowLeft.on('pointerdown', () => {
            citizenshipAreaIndex = (citizenshipAreaIndex - 1 + citizenshipImages.length) % citizenshipImages.length;
            citizenshipImage.setTexture(citizenshipImages[citizenshipAreaIndex]);
        });
        citizenshipContainer.add(arrowLeft);
        let arrowRight = this.add.image(arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowRight.on('pointerdown', () => {
            citizenshipAreaIndex = (citizenshipAreaIndex + 1) % citizenshipImages.length;
            citizenshipImage.setTexture(citizenshipImages[citizenshipAreaIndex]);
        });
	    arrowRight.setFlipX(true);
        citizenshipContainer.add(arrowRight);
	    let projectContainer = this.add.container(
            projectHeader.x,
            projectHeader.y + projectHeader.height + 10 + 50 + 50 + 30 + 10 - 15
        );
	    const projectImages = ['picture8', 'picture9', 'picture10', 'picture11'];
        let projectAreaIndex = 0;
        let projectImage = this.add.image(0, 0, projectImages[projectAreaIndex]).setOrigin(0.5);
        projectImage.scale = 0.25;
        projectContainer.add(projectImage);
        arrowOffset = projectImage.displayWidth / 2 + 20;
        let arrowLeft2 = this.add.image(-arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowLeft2.on('pointerdown', () => {
            projectAreaIndex = (projectAreaIndex - 1 + projectImages.length) % projectImages.length;
            projectImage.setTexture(projectImages[projectAreaIndex]);
        });
        projectContainer.add(arrowLeft2);
        let arrowRight2 = this.add.image(arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowRight2.on('pointerdown', () => {
            projectAreaIndex = (projectAreaIndex + 1) % projectImages.length;
            projectImage.setTexture(projectImages[projectAreaIndex]);
        });
	    arrowRight2.setFlipX(true);
        projectContainer.add(arrowRight2);
	    let leadershipContainer = this.add.container(
            leadershipHeader.x,
            leadershipHeader.y + leadershipHeader.height + 10 + 50 + 50 + 30 + 10 - 15
        );
	    const leadershipImages = [];
        let leadershipAreaIndex = 0;
        let leadershipImage = this.add.image(0, 0, leadershipImages[leadershipAreaIndex]).setOrigin(0.5);
        leadershipImage.scale = 0.25;
        leadershipContainer.add(leadershipImage);
        arrowOffset = leadershipImage.displayWidth / 2 + 20;
        let arrowLeft3 = this.add.image(-arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowLeft3.on('pointerdown', () => {
            leadershipAreaIndex = (leadershipAreaIndex - 1 + leadershipImages.length) % leadershipImages.length;
            leadershipImage.setTexture(leadershipImages[leadershipAreaIndex]);
        });
        leadershipContainer.add(arrowLeft3);
        let arrowRight3 = this.add.image(arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowRight3.on('pointerdown', () => {
            leadershipAreaIndex = (leadershipAreaIndex + 1) % leadershipImages.length;
            leadershipImage.setTexture(leadershipImages[leadershipAreaIndex]);
        });
	    arrowRight3.setFlipX(true);
        leadershipContainer.add(arrowRight3);
        photosContainer.add([citizenshipHeader, leadershipHeader, citizenshipHeader, projectHeader, citizenshipContainer, projectContainer, leadershipContainer]);
	    citizenshipImage.setInteractive({useHandCursor: true});
	    leadershipImage.setInteractive({useHandCursor: true});
	    projectImage.setInteractive({useHandCursor: true});
	    citizenshipImage.on('pointerdown', () => {
	        this.blowupImage(citizenshipImage);
	    });
	    leadershipImage.on('pointerdown', () => {
	        this.blowupImage(leadershipImage);
	    });
	    projectImage.on('pointerdown', () => {
	        this.blowupImage(projectImage);
	    });
        this.tabContainers['Photos'] = photosContainer;

        // Showcase Tab Container
        let showcaseContainer = this.add.container(0, 0);
        this.tabContainers['Showcase'] = showcaseContainer;
        const slides = [];
        slides.push(
            this.add.image(0, 0, 'slide1'),
            this.add.image(0, 0, 'slide2'),
            this.add.image(0, 0, 'slide3'),
            this.add.image(0, 0, 'slide4'),
            this.add.image(0, 0, 'slide5'),
            this.add.image(0, 0, 'slide6'),
            this.add.image(0, 0, 'slide7'),
            this.add.image(0, 0, 'slide8'),
            this.add.image(0, 0, 'slide9'),
            this.add.image(0, 0, 'slide10'),
            this.add.image(0, 0, 'slide11'),
            this.add.image(0, 0, 'slide12')
        );
        let currentSlideIndex = 0;
        slides.forEach(slide => {slide.setVisible(false); showcaseContainer.add(slide); slide.setOrigin(0.5, 0.5); slide.setPosition(this.scale.width / 2, this.scale.height / 2 + 15); slide.scale = 0.83;});
        const nextSlideButton = this.add.image(this.scale.width / 2 + 420 + 140, this.scale.height / 2 + 15, 'arrowLeft');
	    nextSlideButton.setFlipX(true);
        const prevSlideButton = this.add.image(this.scale.width / 2 - 420 - 140, this.scale.height / 2 + 15, 'arrowLeft');
        nextSlideButton.setInteractive({ useHandCursor: true });
        prevSlideButton.setInteractive({ useHandCursor: true });
        nextSlideButton.on('pointerdown', () => {currentSlideIndex = (currentSlideIndex + 1) % slides.length; showSlide(currentSlideIndex);});
        prevSlideButton.on('pointerdown', () => {currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length; showSlide(currentSlideIndex);});
        showcaseContainer.add([nextSlideButton, prevSlideButton]);
        let buttonText = 'RPG-Style Name Generator';
        let loadGameButton = this.add.text(Math.floor(this.scale.width / 3) * 2 + -(24 + 15 + 60 * 10), this.scale.height * 0.75, 'Load ' + buttonText, {
            fontSize: '24px',
            color: '#44d9f3',
            backgroundColor: '#0f0025',
            padding: { x: 10, y: 5 },
            fontFamily: 'Helvetica',
        });
        const rpgNameGenButton = loadGameButton
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.loadMiniGame('https://thatoneguy2664.github.io/Fantasy-Name-Generator/', 3));
        showcaseContainer.add(rpgNameGenButton);
        const linkIcon1 = this.add.image(rpgNameGenButton.x - 15, rpgNameGenButton.y + rpgNameGenButton.height / 2, 'linkIcon');
        showcaseContainer.add(linkIcon1);
        buttonText = 'Space Shooter Game';
        loadGameButton = this.add.text(Math.floor(this.scale.width / 3) * 2 + -(24 + 15 + 60 * 10), this.scale.height * 0.65 - 5, 'Load ' + buttonText, {
            fontSize: '24px',
            color: '#44d9f3',
            backgroundColor: '#0f0025',
            padding: { x: 10, y: 5 },
            fontFamily: 'Helvetica',
        });
        const astralShooterButton = loadGameButton
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.loadMiniGame('https://thatoneguy2664.github.io/Astral-Shooter/', 2));
        showcaseContainer.add(astralShooterButton);
        const linkIcon2 = this.add.image(astralShooterButton.x - 15, astralShooterButton.y + astralShooterButton.height / 2, 'linkIcon');
        showcaseContainer.add(linkIcon2);
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.setVisible(i === index);
            });

            if (index == 11) {
                rpgNameGenButton.setVisible(true);
                astralShooterButton.setVisible(true);
                linkIcon1.setVisible(true);
                linkIcon2.setVisible(true);
            } else {
                rpgNameGenButton.setVisible(false);
                astralShooterButton.setVisible(false);
                linkIcon1.setVisible(false);
                linkIcon2.setVisible(false);
            };
        };
        showSlide(currentSlideIndex);

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

    loadPdf(resume, linkTo) {
        let pdfUrl = null;

        if (this.formSelected === 'Section A' && this.yearSelected) {
            pdfUrl = `/4h-portfolio/src/pdfReader/src/assets/section-a-${this.yearSelected}.pdf`;
        } else if (this.formSelected === 'Section B' && this.yearSelected) {
            pdfUrl = `/4h-portfolio/src/pdfReader/src/assets/section-b-${this.yearSelected}.pdf`;
        } else if (this.formSelected === 'Section C' && this.yearSelected) {
            pdfUrl = `/4h-portfolio/src/pdfReader/src/assets/section-c-${this.yearSelected}.pdf`;
        } else if (resume && linkTo) {
            pdfUrl = linkTo;
            window.location.href = linkTo
            return
        } else {
            return;
        };

        window.location.href = `/4h-portfolio/src/pdfReader/src/reader.html?file=${encodeURIComponent(pdfUrl)}`;
    };

    handlePdfChoice(action) {
        let sectionStr = null;

        if (action != 3 && action != 4) {
            if (this.formSelected === 'Section A' && this.yearSelected) {
                sectionStr = 'a';
            } else if (this.formSelected === 'Section B' && this.yearSelected) {
                sectionStr = 'b';
            } else if (this.formSelected === 'Section C' && this.yearSelected) {
                sectionStr = 'c';
            } else {
                return 1;
            };
        };

        if (action === 1) {
            const fileUrl = `https://raw.githubusercontent.com/ThatOneDude23273827/4h-portfolio/refs/heads/main/src/pdfReader/src/assets/section-${sectionStr}-${this.yearSelected}.pdf`;
            fetch(fileUrl)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = `section-${sectionStr}-${this.yearSelected}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } else if (action === 2) {
            this.loadPdf();
        } else if (action === 3) {
            this.loadPdf(true, 'https://raw.githubusercontent.com/ThatOneDude23273827/4h-portfolio/refs/heads/main/assets/resume.pdf');
        } else if (action === 4) {
            const fileUrl = 'https://raw.githubusercontent.com/ThatOneDude23273827/4h-portfolio/refs/heads/main/assets/resume.pdf';
            fetch(fileUrl)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = `resume.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        };
    };

    resetButtons(ignored) {
        this.tabs.forEach((v, i) => {
            if (v != ignored && this.tabs[i] === v) {
                v.setBackgroundColor('#021a33');
            };
        })
    };

    blowupImage(image) {
        const rect = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, this.hexStringToNumber('#000000'));
        rect.setOrigin(0.5, 0.5);
        rect.setInteractive({useHandCursor: true});

        const imageString = image.texture;
        const newImage = this.add.image(this.scale.width / 2, this.scale.height / 2, imageString);
        
        rect.on('pointerdown', () => {
            rect.setVisible(false);
            newImage.destroy();
            rect.destroy();
        });

        newImage.scale = 0.75;
    };
};
