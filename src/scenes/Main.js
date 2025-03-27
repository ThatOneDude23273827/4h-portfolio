export class Main extends Phaser.Scene {
    constructor() {
        super('Main');
        this.tabContainers = {};
        this.overlays = [];
        this.yearSelected = null;
        this.formSelected = null;
        this.tabs = [];
        this.elementDump = [];
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
        const copyright = this.add.text(this.scale.width / 2, this.scale.height - 25, '© 2025 Caleb Pickering, All Rights Reserved.\nProgramed entirely by Caleb Pickering using the following languages: HTML5, JavaScript, CSS.', {align: 'center'});
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
        const filler = this.graphics.fillRoundedRect(this.scale.width / 2 - 200, 290 - 100, 400, 360, 30);
        homeContainer.add(filler);
        const viewButton = this.add.text(this.scale.width / 2 - 58, 290 - 15 - 100, 'View', {
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
        const downloadButton = this.add.text(this.scale.width / 2 + 40, 290 - 15 - 100, 'Download', {
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
        let dropdownButton = this.add.text(Math.floor(this.scale.width / 2), Math.floor(370) - 100, 'Select Form', {
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
        let dropdownButton2 = this.add.text(Math.floor(this.scale.width / 2), Math.floor(420 + 3 * 35) - 100, 'Select Year', {
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
        const pic1 = this.add.image(this.scale.width / 2 - 400, this.scale.height / 2, 'homePicture');
        const pic2 = this.add.image(this.scale.width / 2 + 400, this.scale.height / 2, 'homePicture2');
        pic2.scale = 0.4;
        pic1.scale = 0.4;
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
        const medalIcon = this.add.image(this.scale.width / 2 - 8 + 2 + (40 * 1.9), this.scale.height / 2 + 20, 'medal'); 
        const bracketsIcon = this.add.image(this.scale.width / 2 + 315 + (40 * 2), this.scale.height / 2 + 20, 'brackets');
        const cubeIcon = this.add.image(this.scale.width / 2 - 315, this.scale.height / 2 + 20, 'cube+');
        medalIcon.setVisible(false);
        bracketsIcon.setVisible(false);
        cubeIcon.setVisible(false);
        medalIcon.scale = 1.5;
        bracketsIcon.scale - 2.6;
        cubeIcon.scale = 2.2;
        const awardText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 20, 'Awards', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5);
        const projectText = this.add.text(this.scale.width / 2 + 315 + 5 + 32, this.scale.height / 2 + 20, 'Past Projects', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5);
        const hobbiesText = this.add.text(this.scale.width / 2 - 4 - 315 - (40 * 1.9), this.scale.height / 2 + 20, 'Hobbies', {
            fontFamily: 'Helvetica',
            fontSize: '32px'
        }).setOrigin(0.5,0.5);
        resumeContainer.add([awardText, projectText, hobbiesText]);
        resumeContainer.add([medalIcon, bracketsIcon, cubeIcon]);
        resumeContainer.add(this.add.text(this.scale.width / 2 + 8 + 8, awardText.y + awardText.height + 8 * 8, '• 4-H Speech Contest Winner\n  • x3 Local Level\n  • x2 County Level\n  • x1 Multi-County Level\n• Church Bible Drills State Superior\n  Winner\n• x2 Overall Summer Camp\n  Champion\n• Bible Feud Champion Team', {fontFamily: 'Helvetica'}).setOrigin(0.5));
        resumeContainer.add(this.add.text(this.scale.width / 2 + 16 + 315 + 5 + 32 - 4, projectText.y + projectText.height + 8 * 7, '• Python HTTP Server Starter\n• LUA Web Console\n• LUA RPG Game\n• Python File Orgainizer\n• JavaScript Space Shooter\n• JavaScript RPG Name Generator\n• Luau Horror Game\n• Luau Platformer Game', {fontFamily: 'Helvetica'}).setOrigin(0.5));
        resumeContainer.add(this.add.text(this.scale.width / 2 + 16 - 4 - 315 - (40 * 1.9), hobbiesText.y + hobbiesText.height + 8 * 4, '• Programming\n• Martial Arts\n• Learning other lanuages,\n  such as American Sign Language\n  and Latin', {fontFamily: 'Helvetica'}).setOrigin(0.5)); // Multiply by fontSize / 2 * number of additional lines
        const viewResumeButton = this.add.text(this.scale.width / 2, this.scale.height / 2 - 100,  'View Resume Document', {
            fontFamily: 'Times New Roman',
            color: '#00FFFF',
            fontSize: '32px'
        });
        viewResumeButton.setInteractive({useHandCursor: true});
        viewResumeButton.setOrigin(0.5, 0.5);
        viewResumeButton.on('pointerdown', () => {this.handlePdfChoice(3);});
        viewResumeButton.on('pointerover', () => {viewResumeButton.setColor('#fb8afc');});
        viewResumeButton.on('pointerout', () => {viewResumeButton.setColor('#00FFFF');});
        resumeContainer.add(viewResumeButton);

        // Photos Tab Container
        let photosContainer = this.add.container(0, 0);
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
        const citizenshipCaption = this.add.text(citizenshipHeader.x, this.scale.height / 2 + 130, 'Working on a Habitat House', {fontFamily: 'Helvetica', fontSize: '18px'});
        photosContainer.add(citizenshipCaption);
        citizenshipCaption.setOrigin(0.5, 0.5);
        const citizenshipCaptionTexts = ['Working on a Habitat House', 'Weedeating the yard of an elderly person', "Cleaning up somebody else's yard", 'Working on a porch in Cayce KY', 'Working on a barn in Cayce KY', 'Working on a doorframe'];
        let arrowOffset = citizenshipImage.displayWidth / 2 + 20;
        let arrowLeft = this.add.image(-arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowLeft.on('pointerdown', () => {
            citizenshipAreaIndex = (citizenshipAreaIndex - 1 + citizenshipImages.length) % citizenshipImages.length;
            citizenshipImage.setTexture(citizenshipImages[citizenshipAreaIndex]);
            citizenshipCaption.setText(citizenshipCaptionTexts[citizenshipAreaIndex]);
        });
        arrowLeft.on('pointerover', () => {arrowLeft.setTint(this.hexStringToNumber('#fb8afc'));})
        arrowLeft.on('pointerout', () => {arrowLeft.setTint(this.hexStringToNumber('#FFFFFF'));})
        citizenshipContainer.add(arrowLeft);
        let arrowRight = this.add.image(arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowRight.on('pointerdown', () => {
            citizenshipAreaIndex = (citizenshipAreaIndex + 1) % citizenshipImages.length;
            citizenshipImage.setTexture(citizenshipImages[citizenshipAreaIndex]);
            citizenshipCaption.setText(citizenshipCaptionTexts[citizenshipAreaIndex]);
        });
	    arrowRight.setFlipX(true);
        arrowRight.on('pointerover', () => {arrowRight.setTint(this.hexStringToNumber('#fb8afc'));});
        arrowRight.on('pointerout', () => {arrowRight.setTint(this.hexStringToNumber('#FFFFFF'));});
        citizenshipContainer.add(arrowRight);
	    let projectContainer = this.add.container(
            projectHeader.x,
            projectHeader.y + projectHeader.height + 10 + 50 + 50 + 30 + 10 - 15
        );
	    const projectImages = ['picture8', 'picture9', 'picture10', 'picture11', 'picture14', 'picture15'];
        let projectAreaIndex = 0;
        let projectImage = this.add.image(0, 0, projectImages[projectAreaIndex]).setOrigin(0.5);
        projectImage.scale = 0.25;
        projectContainer.add(projectImage);
        const projectCaptionTexts = ['Serving on church media team', 'Running Projector for youth event', 'Running livestream for service', 'Preparing and looking over slides', 'Running sound during worship', 'Preparing sound system for service'];
        const projectCaption = this.add.text(this.scale.width / 2, this.scale.height / 2 + 130, 'Serving on church media team', {fontFamily: 'Helvetica', fontSize: '18px'});
        projectCaption.setOrigin(0.5, 0.5);
        photosContainer.add(projectCaption);
        arrowOffset = projectImage.displayWidth / 2 + 20;
        let arrowLeft2 = this.add.image(-arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowLeft2.on('pointerdown', () => {
            projectAreaIndex = (projectAreaIndex - 1 + projectImages.length) % projectImages.length;
            projectImage.setTexture(projectImages[projectAreaIndex]);
            projectCaption.setText(projectCaptionTexts[projectAreaIndex]);
        });
        arrowLeft2.on('pointerover', () => {arrowLeft2.setTint(this.hexStringToNumber('#fb8afc'));});
        arrowLeft2.on('pointerout', () => {arrowLeft2.setTint(this.hexStringToNumber('#FFFFFF'));});
        projectContainer.add(arrowLeft2);
        let arrowRight2 = this.add.image(arrowOffset, 0, 'arrowLeft')
            .setInteractive({useHandCursor: true})
            .setOrigin(0.5);
        arrowRight2.on('pointerdown', () => {
            projectAreaIndex = (projectAreaIndex + 1) % projectImages.length;
            projectImage.setTexture(projectImages[projectAreaIndex]);
            projectCaption.setText(projectCaptionTexts[projectAreaIndex]);
        });
        arrowRight2.on('pointerover', () => {arrowRight2.setTint(this.hexStringToNumber('#fb8afc'));});
        arrowRight2.on('pointerout', () => {arrowRight2.setTint(this.hexStringToNumber('#FFFFFF'));});
	    arrowRight2.setFlipX(true);
        projectContainer.add(arrowRight2);
	    let leadershipContainer = this.add.container(
            leadershipHeader.x,
            leadershipHeader.y + leadershipHeader.height + 10 + 50 + 50 + 30 + 10 - 15
        );
	    const leadershipMediaKeys = ['video1', 'video2', 'picture12', 'picture13'];
        const leadershipPreviewImages = ['prev1', 'prev2'];
        let leadershipIndex = 0;
        let leadershipMedia;
        const leadershipCaptionTexts = ['Signing ASL by myself at camp', 'Gave educational speech about laughter', 'Used body lanuage to communicate a point', 'Preached message at local church'];
        const leadershipCaption = this.add.text(leadershipHeader.x, this.scale.height / 2 + 130, 'Signing ASL by myself at camp', {fontFamily: 'Helvetica', fontSize: '18px'});
        leadershipCaption.setOrigin(0.5, 0.5);
        photosContainer.add(leadershipCaption);
        const updateLeadershipMedia = () => {
            leadershipContainer.removeAll(true);
            const key = leadershipMediaKeys[leadershipIndex];
            if (key.startsWith('video')) {
                leadershipMedia = this.add.video(0, 0, key)
                    .setOrigin(0.5)
                    .setDisplaySize(150, 100);
                leadershipMedia.pause();
                let preview = this.add.image(0, 0, leadershipPreviewImages[leadershipIndex])
                    .setOrigin(0.5)
                    .setScale(0.25)
                    .setInteractive({ useHandCursor: true });
                preview.on('pointerdown', () => { 
                    this.blowupVideo(key);
                });
                leadershipContainer.add([leadershipMedia, preview]);
            } else {
                leadershipMedia = this.add.image(0, 0, key)
                    .setOrigin(0.5)
                    .setScale(0.25)
                    .setInteractive({ useHandCursor: true });
                leadershipMedia.on('pointerdown', () => { 
                    this.blowupImage(leadershipMedia);
                });
                leadershipContainer.add(leadershipMedia);
            }
            updateArrows();
        };
        const updateArrows = () => {
            let arrowOffset = leadershipMedia.displayWidth / 2 + 20;
            let arrowLeft = this.add.image(-20 - arrowOffset, 0, 'arrowLeft')
                .setInteractive({ useHandCursor: true })
                .setOrigin(0.5);
            arrowLeft.on('pointerdown', () => {
                leadershipIndex = (leadershipIndex - 1 + leadershipMediaKeys.length) % leadershipMediaKeys.length;
                updateLeadershipMedia.call(this);
                leadershipCaption.setText(leadershipCaptionTexts[leadershipIndex]);
            });
            arrowLeft.on('pointerover', () => {
                arrowLeft.setTint(this.hexStringToNumber('#fb8afc'));
            });
            arrowLeft.on('pointerout', () => {
                arrowLeft.setTint(this.hexStringToNumber('#FFFFFF'));
            });
            leadershipContainer.add(arrowLeft);
            let arrowRight = this.add.image(20 + arrowOffset, 0, 'arrowLeft')
                .setInteractive({ useHandCursor: true })
                .setOrigin(0.5);
            arrowRight.setFlipX(true);
            arrowRight.on('pointerdown', () => {
                leadershipIndex = (leadershipIndex + 1) % leadershipMediaKeys.length;
                updateLeadershipMedia.call(this);
                leadershipCaption.setText(leadershipCaptionTexts[leadershipIndex]);
            });
            arrowRight.on('pointerover', () => {
                arrowRight.setTint(this.hexStringToNumber('#fb8afc'));
            });
            arrowRight.on('pointerout', () => {
                arrowRight.setTint(this.hexStringToNumber('#FFFFFF'));
            });
            leadershipContainer.add(arrowRight);
        };
        updateLeadershipMedia.call(this);
        photosContainer.add([
            citizenshipHeader,
            leadershipHeader,
            citizenshipHeader,
            projectHeader,
            citizenshipContainer,
            projectContainer,
            leadershipContainer
        ]);
        citizenshipImage.setInteractive({ useHandCursor: true });
        projectImage.setInteractive({ useHandCursor: true });
        citizenshipImage.on('pointerdown', () => {
            this.blowupImage(citizenshipImage);
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
        nextSlideButton.on('pointerover', () => {nextSlideButton.setTint(this.hexStringToNumber('#fb8afc'));});
        prevSlideButton.on('pointerout', () => {prevSlideButton.setTint(this.hexStringToNumber('#FFFFFF'));});
        prevSlideButton.on('pointerover', () => {prevSlideButton.setTint(this.hexStringToNumber('#fb8afc'));});
        nextSlideButton.on('pointerout', () => {nextSlideButton.setTint(this.hexStringToNumber('#FFFFFF'));});
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
            .on('pointerover', () => {rpgNameGenButton.setColor('#fb8afc');})
            .on('pointerout', () => {rpgNameGenButton.setColor('#44d9f3');})
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
            .on('pointerover', () => {astralShooterButton.setColor('#fb8afc');})
            .on('pointerout', () => {astralShooterButton.setColor('#44d9f3');})
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
                this.elementDump[0].setVisible(false);
                this.closeMessage.setVisible(false);

                const iframe = this.embeddedContainers[num].querySelector('iframe');
                if (iframe) {
                    iframe.remove();
                };
            });

            this.closeMessage = this.add.text(this.scale.width / 2, this.scale.height / 2 + 300, 'Click here to close.', {fontFamily: 'Helvetica', fontSize: '24px'});
            this.closeMessage.setOrigin(0.5, 0.5);

            if (num === 2) {
                this.elementDump.push(this.add.text(this.scale.width / 2, this.scale.height / 2 - 300, 'WASD or arrow keys to move, Spacebar or J to shoot.', {fontFamily: 'Helvetica', fontSize: '24px'}));
                this.elementDump[0].setOrigin(0.5, 0.5);
            };
        } else {
            this.embeddedContainers[num].classList.toggle('hide');
            this.overlays[num].setVisible(!this.overlays[num].visible);
            this.elementDump[0].setVisible(true);
            this.closeMessage.setVisible(true);
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
            const resumeContainer = this.tabContainers['Resume'];

            if (this.resumeEmbed) {
                this.resumeEmbed.destroy();
            };

            this.resumeEmbed = this.add.dom(this.scale.width / 2, this.scale.height / 2)
            .createFromHTML(
                `<iframe src="${pdfUrl}" style="width:1000px; height:800px; border:none;"></iframe>`
            );
            resumeContainer.add(this.resumeEmbed);
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
            window.location.href =  '/4h-portfolio/src/pdfReader/src/reader.html?file=https://raw.githubusercontent.com/ThatOneDude23273827/4h-portfolio/refs/heads/main/assets/resume.pdf';
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

    createSpinner() {
        const bars = [];
        const radius = 64;
        const barHeight = radius * 0.5;
        const barWidth = 10;
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        let angle = -90;

         for (let i = 0; i < 12; i++) {
            const pos = Phaser.Math.RotateAround(
            { x: centerX, y: centerY - (radius - barHeight * 0.5) },
            centerX,
            centerY,
            Phaser.Math.DEG_TO_RAD * angle
            );

            const bar = this.add.rectangle(pos.x, pos.y, barWidth, barHeight, this.hexStringToNumber('#FFFFFF'))
            .setAngle(angle)
            .setAlpha(0.2);
            
            bars.push(bar);
            angle += 30;
        }
        
        let index = 0;
        this.time.addEvent({
            delay: 70,
            loop: true,
            callback: () => {
                const bar = bars[index];
                bar.alpha = 1;
                this.tweens.add({
                    targets: bar,
                    alpha: 0.2,
                    duration: 400,
                    ease: 'Linear'
                });
                
                index = (index + 1) % bars.length;
            }
        });

        return bars;
    };

    blowupVideo(videoObj) {
        const overlay = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            this.hexStringToNumber('#000000')
        ).setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true });

        const spinnerParts = this.createSpinner();
        
        const blownUpVideo = this.add.video(
            this.scale.width / 2,
            this.scale.height / 2,
            videoObj
        )
        .setOrigin(0.5, 0.5)
        .setScale(0.65);
        spinnerParts.forEach((rect) => {blownUpVideo.setAbove(rect)}); // Make the spinner appear behind the video
        
        blownUpVideo.play(true);
        
        overlay.on('pointerdown', () => {
            blownUpVideo.pause();
            blownUpVideo.destroy();
            overlay.destroy();
            spinnerParts.forEach((rect) => {rect.destroy();});
        });
    };
};
