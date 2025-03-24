export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
        this.tabContainers = {};
        this.numLoaded = {};
        this.overlays = [];
        this.yearSelected = null;
        this.formSelected = null;
        this.tabs = [];
    };

    preload() {
        this.load.image('bg', './assets/bg.jpg');
        this.load.image('gameBG', './assets/code.png');
        this.load.image('clover', './assets/clover.png');
        this.load.image('linkIcon', './assets/link.png');
        this.load.image('brackets', './assets/brackets.png');
        this.load.image('medal', './assets/medal.png');
        this.load.image('textBox', './assets/text.png');
        this.load.image('cube+', './assets/cube+.png');
        this.load.image('arrowRight', './assets/arrow-right.png');
        this.load.image('arrowLeft', './assets/arrow-left.png');
        this.load.image('arrowRight2', './assets/double-arrows-right.png');
        this.load.image('arrowLeft2', './assets/double-arrows-left.png');

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
    };

    create() {
        // Background image
        this.bg = this.add.tileSprite(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 'bg')
            .setOrigin(0.5, 0.5);

        // Background image cover
        this.colorBlock = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width * 0.93, 800, this.hexStringToNumber('#011121'))
            .setOrigin(0.5, 0.5);
        
        // Tabs
        const baseFontSize = 24;
        const tabNames = ['Home', 'Resume', 'Photos', 'Showcase'];
        let xOffset = 60;
        
        tabNames.forEach((name) => {
            if (name != 'Home') {
                const fontSize = baseFontSize * (this.scale.width / 800);
                const button = this.add.text(xOffset, 10, name, {
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
                const button = this.add.text(xOffset, 10, name, {
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
        this.add.text(this.scale.width - 150, 30, "Caleb Pickering's 4H Portfolio", {
            fontSize: '20px',
            color: '#FFFFFF',
            fontFamily: 'Helvetica',
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
        this.tabContainers['Home'] = homeContainer;

        // Resume Tab Container
        let resumeContainer = this.add.container(0, 0);
        const resumeHeader = this.add.text(this.scale.width / 2, this.scale.height / 2 - 200, 'Objective:', {
            fontSize: '30px',
            color: textColor,
            fontFamily: 'Times New Roman',
        }).setOrigin(0.5);
        resumeContainer.add(resumeHeader);
        resumeContainer.add(this.add.rectangle(this.scale.width / 2, resumeHeader.y - 20, 200, 2, this.hexStringToNumber('#00FFFF')).setOrigin(0.5, 0.5));
        this.tabContainers['Resume'] = resumeContainer;
        const resumeObjectiveText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 150, 'The objective of this resume is to highlight skills and lessons learned through 4-H, other avenues in life,\nand more specifcally, through work in my project area. (Computers & Technology)', {
            fontSize: '26px',
            color: textColor,
            fontFamily: 'Times New Roman',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        resumeContainer.add(resumeObjectiveText);
        const skillsHeader = this.add.text(this.scale.width / 2, (this.scale.height / 2) - (this.scale.height * 0.1), 'Experiences:', {
            fontSize: '30px',
            color: textColor,
            fontFamily: 'Times New Roman',
        }).setOrigin(0.5);
        resumeContainer.add(skillsHeader);
        function onHoverSkillButton(button) {
            button.setColor('#03a1fc');
        };
        function onUnHoverSkillButton(button) {
            button.setColor('#00FFFF');
        };
        const resumeSkillsText = this.add.text(this.scale.width / 2, skillsHeader.y + 40, 'I have learned many different things through programming, detailed below:', {
            fontSize: '26px',
            color: textColor,
            fontFamily: 'Times New Roman',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        resumeContainer.add(resumeSkillsText);
        const leadershipSkillsMenu = this.add.text(this.scale.width/2, this.scale.height / 2 + 35 + 13 + 40, 'Leadership', {
            fontFamily: 'Times New Roman',
            color: '#00FFFF',
            align: 'center',
            fontSize: '26px'
        })
        .setOrigin(0.5,0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            leadershipSkillsMenu.setStroke('#24f0f0', 1);
            citizenshipSkillsMenu.setStroke();
            projectSkillsMenu.setStroke();
        });
        leadershipSkillsMenu.on('pointerover', () => {onHoverSkillButton(leadershipSkillsMenu)});
        leadershipSkillsMenu.on('pointerout', () => {onUnHoverSkillButton(leadershipSkillsMenu)});
        const citizenshipSkillsMenu = this.add.text(this.scale.width/2, this.scale.height / 2 + 70 + 13 + 40, 'Citizenship', {
            fontFamily: 'Times New Roman',
            color: '#00FFFF',
            align: 'center',
            fontSize: '26px'
        })
        .setOrigin(0.5,0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            citizenshipSkillsMenu.setStroke('#24f0f0', 1);
            leadershipSkillsMenu.setStroke();
            projectSkillsMenu.setStroke();
        });
        citizenshipSkillsMenu.on('pointerover', () => {onHoverSkillButton(citizenshipSkillsMenu)});
        citizenshipSkillsMenu.on('pointerout', () => {onUnHoverSkillButton(citizenshipSkillsMenu)});
        const projectSkillsMenu = this.add.text(this.scale.width/2, this.scale.height / 2 + 40, 'Computers\n& Technology', {
            fontFamily: 'Times New Roman',
            color: '#00FFFF',
            align: 'center',
            fontSize: '26px'
        })
        .setOrigin(0.5,0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            projectSkillsMenu.setStroke('#24f0f0', 1);
            leadershipSkillsMenu.setStroke();
            citizenshipSkillsMenu.setStroke();
        });
        projectSkillsMenu.on('pointerover', () => {onHoverSkillButton(projectSkillsMenu)});
        projectSkillsMenu.on('pointerout', () => {onUnHoverSkillButton(projectSkillsMenu)});
        projectSkillsMenu.emit('pointerdown');
        let gridGraphics = this.add.graphics();
        gridGraphics.lineStyle(2, this.hexStringToNumber('#00FFFF'), 1);
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const skillButtons = [leadershipSkillsMenu, citizenshipSkillsMenu, projectSkillsMenu];
        resumeContainer.add(skillButtons); 
        skillButtons.forEach(button => {
            let bounds = button.getBounds();
            minX = Math.min(minX, bounds.x);
            minY = Math.min(minY, bounds.y);
            maxX = Math.max(maxX, bounds.x + bounds.width);
            maxY = Math.max(maxY, bounds.y + bounds.height);
        });
        const padding = 10;
        minX -= padding;
        minY -= padding;
        maxX += padding;
        maxY += padding;
        resumeContainer.add(gridGraphics.strokeLineShape(new Phaser.Geom.Line(maxX, minY, maxX, maxY))); // r
        resumeContainer.add(gridGraphics.strokeLineShape(new Phaser.Geom.Line(minX, maxY, minX, minY))); // l
        resumeContainer.add(gridGraphics.strokeLineShape(new Phaser.Geom.Line(maxX, maxY, minX, maxY))); // b
        resumeContainer.add(gridGraphics.strokeLineShape(new Phaser.Geom.Line(this.scale.width / 2 - 500, this.scale.height / 2 + 40 - 26 - 10 - 2, this.scale.width / 2 + 500, this.scale.height / 2 + 40 - 26 - 10 - 2)));
        const medalIcon = this.add.image(this.scale.width / 2 + 110, this.scale.height / 2 + 40 - 26 - 10 - 2 + 25, 'medal'); 
        const bracketsIcon = this.add.image(this.scale.width / 2 + 315, this.scale.height / 2 + 40 - 26 - 10 - 2 + 25, 'brackets');
        const textIcon = this.add.image(this.scale.width / 2 - 110, this.scale.height / 2 + 40 - 26 - 10 - 2 + 25, 'textBox');
        const cubeIcon = this.add.image(this.scale.width / 2 - 315, this.scale.height / 2 + 40 - 26 - 10 - 2 + 25, 'cube+');
        medalIcon.scale = 1.5;
        bracketsIcon.scale - 1.5;
        textIcon.scale = 1.5;
        cubeIcon.scale = 2.2;
        resumeContainer.add(this.add.text(this.scale.width / 2 + 110 + (40 * 1.9), this.scale.height / 2 + 40 - 26 - 10 - 2 + 25, 'Awards', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5));
        resumeContainer.add(this.add.text(this.scale.width / 2 + 315 + (40 * 2) + 5, this.scale.height / 2 + 40 - 26 - 10 - 2 + 25, 'Projects', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5));
        resumeContainer.add(this.add.text(this.scale.width / 2 - 10 - 5 - 4 - 110 - (40 * 1.9), this.scale.height / 2 + 40 - 26 - 10 - 2 + 25, 'Education', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5));
        resumeContainer.add(this.add.text(this.scale.width / 2 - 4 - 315 - (40 * 1.9), this.scale.height / 2 + 40 - 26 - 10 - 2 + 25, 'Hobbies', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5));
        resumeContainer.add([medalIcon, bracketsIcon, textIcon, cubeIcon]);

        // Photos Tab Container
        let photosContainer = this.add.container(0, 0);
        photosContainer.add(
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 200, 'Photos Content Here', {
                fontSize: '30px',
                color: textColor,
                fontFamily: 'Helvetica',
            }).setOrigin(0.5)
        );
        this.tabContainers['Photos'] = photosContainer;

        // Showcase Tab Container
        let showcaseContainer = this.add.container(0, 0);
        let buttonText = 'RPG-Style Name Generator';
        let loadGameButton = this.add.text(Math.floor(this.scale.width / 3) + 24 + 15, this.scale.height * 0.85, 'Load ' + buttonText, {
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
        showcaseContainer.add(this.add.image(rpgNameGenButton.x - 15, this.scale.height * 0.9 - 18, 'linkIcon'));
        buttonText = 'Space Shooter Game';
        loadGameButton = this.add.text(Math.floor(this.scale.width / 3) * 2 + 24 + 15, this.scale.height * 0.85, 'Load ' + buttonText, {
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
        showcaseContainer.add(this.add.image(astralShooterButton.x - 15, this.scale.height * 0.9 - 18, 'linkIcon')); // Add 0.5 to y position of the button
        buttonText = 'LUA Web Console';
        loadGameButton = this.add.text(Math.floor(this.scale.width / 3) - this.scale.width * 0.3 + 60 + 24 + 15, this.scale.height * 0.85, 'Load ' + buttonText, {
            fontSize: '24px',
            color: '#44d9f3',
            backgroundColor: '#0f0025',
            padding: { x: 10, y: 5 },
            fontFamily: 'Helvetica',
        });
        const luaConsoleButton = loadGameButton
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.loadMiniGame('https://thatoneguy2664.github.io/Lua-Web-Console/Main/luaConsole.html', 1));
        showcaseContainer.add(luaConsoleButton);
        showcaseContainer.add(this.add.image(luaConsoleButton.x - 15, this.scale.height * 0.9 - 18, 'linkIcon'));
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
        slides.forEach(slide => {slide.setVisible(false); showcaseContainer.add(slide); slide.setOrigin(0.5, 0.5); slide.setPosition(this.scale.width / 2, this.scale.height / 2); slide.setInteractive({ useHandCursor: true }); slide.scale = 0.6; slide.on('pointerdown', () => {currentSlideIndex = (currentSlideIndex + 1) % slides.length; showSlide(currentSlideIndex);})});
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.setVisible(i === index);
            });
        };
        showSlide(currentSlideIndex);
        const nextSlideButton = this.add.image(this.scale.width / 2 + 420, this.scale.height / 2, 'arrowRight');
        const prevSlideButton = this.add.image(this.scale.width / 2 - 420, this.scale.height / 2, 'arrowLeft');
        nextSlideButton.scale = 2;
        prevSlideButton.scale = 2;
        nextSlideButton.setInteractive({ useHandCursor: true });
        prevSlideButton.setInteractive({ useHandCursor: true });
        nextSlideButton.on('pointerdown', () => {currentSlideIndex = (currentSlideIndex + 1) % slides.length; showSlide(currentSlideIndex);});
        prevSlideButton.on('pointerdown', () => {currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length; showSlide(currentSlideIndex);});
        const firstSlideButton = this.add.image(this.scale.width / 2 + 460, this.scale.height / 2, 'arrowRight2');
        const lastSlideButton = this.add.image(this.scale.width / 2 - 460, this.scale.height / 2, 'arrowLeft2');
        firstSlideButton.scale = 2;
        lastSlideButton.scale = 2;
        firstSlideButton.setInteractive({ useHandCursor: true });
        lastSlideButton.setInteractive({ useHandCursor: true });
        firstSlideButton.on('pointerdown', () => {currentSlideIndex = 11; showSlide(currentSlideIndex);});
        lastSlideButton.on('pointerdown', () => {currentSlideIndex = 0; showSlide(currentSlideIndex);});
        showcaseContainer.add([nextSlideButton, prevSlideButton, firstSlideButton, lastSlideButton]);

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
            pdfUrl = `/4h-portfolio/src/pdfReader/src/assets/section-a-${this.yearSelected}.pdf`;
        } else if (this.formSelected === 'Section B' && this.yearSelected) {
            pdfUrl = `/4h-portfolio/src/pdfReader/src/assets/section-b-${this.yearSelected}.pdf`;
        } else if (this.formSelected === 'Section C' && this.yearSelected) {
            pdfUrl = `/4h-portfolio/src/pdfReader/src/assets/section-c-${this.yearSelected}.pdf`;
        } else {
            return
        };

        window.location.href = `/4h-portfolio/src/pdfReader/src/reader.html?file=${encodeURIComponent(pdfUrl)}`;
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
        } else {
            this.loadPdf();
        };
    };

    resetButtons(ignored) {
        this.tabs.forEach((v, i) => {
            if (v != ignored && this.tabs[i] === v) {
                v.setBackgroundColor('#021a33');
            };
        })
    };
};
