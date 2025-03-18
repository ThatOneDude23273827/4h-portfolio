export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
        this.tabContainers = {}; // Object to hold tab containers
    }

    preload() {
        this.load.image('bg', './assets/bg.jpg');
        this.load.image('clover', './assets/clover.png');
    }

    create() {
        // Background image
        this.bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Background image cover
        this.colorBlock = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width * 0.93, 800, this.hexStringToNumber('#000000'))
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
                backgroundColor: '#000000',
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
    }

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
            "I'm Caleb, and I enjoy programming as both a hobby and semi-paying job.\nYou may see for example, the 4-H Clover in the corner following your mouse.", {
                fontSize: '20px',
                color: textColor
            })
            .setOrigin(0.5)
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
            }).setOrigin(0.5)
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
        this.tabContainers['Showcase'] = showcaseContainer;

        // Initially, show only the Home container
        this.handleTabClick('Home');
    }

    handleTabClick(tabName) {
        console.log(`${tabName} tab clicked`);
        Object.values(this.tabContainers).forEach(container => {
            container.setVisible(false);
        });
        // Show the selected container
        if (this.tabContainers[tabName]) {
            this.tabContainers[tabName].setVisible(true);
        }
    }

    // To avoid syntax errors when using hex codes when required as a number, not string
    hexStringToNumber(hex) {
        return parseInt(hex.replace('#', '0x'));
    }
}
