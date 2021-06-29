export default class TitleScene extends Phaser.Scene {
	constructor() {
		super("MenuScene");
	}
	
	init(data){        
		this.musicOn = 	data.musicOn;	
		this.bgMusic = this.sound.add('soundmenu');
    }

	preload() {
		
	}

	create() {
		let bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuopt');
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0); 

		
		if (!this.musicOn){
			this.bgMusic.play({
				volume: 0.2,
				loop: true
			});
			this.musicOn = true
		}

		let menustart = this.add.text(this.cameras.main.width / 2, 243, 'Iniciar', { fontFamily: 'Font1', fill: '#000000'});
		menustart.setInteractive({ useHandCursor: true });
		menustart.on('pointerdown', () => this.startButton());
		menustart.setOrigin(0.5);
		menustart.setFontSize(30);

		let menuinstruction = this.add.text(this.cameras.main.width / 2, 303, 'Instruções',{ fontFamily: 'Font1', fill: '#000000'});
		menuinstruction.setInteractive({ useHandCursor: true });
		menuinstruction.on('pointerdown', () => this.instructionButton());
		menuinstruction.setOrigin(0.5);
		menuinstruction.setFontSize(30);		
		
		let menuCredits = this.add.text(this.cameras.main.width / 2, 365, 'Creditos',{ fontFamily: 'Font1', fill: '#000000'});
		menuCredits.setInteractive({ useHandCursor: true });
		menuCredits.on('pointerdown', () => this.creditsButton());
		menuCredits.setOrigin(0.5);
		menuCredits.setFontSize(30);		
	}

	startButton() {		
		this.bgMusic.stop();
		this.scene.start('GameScene', { musicOn: false});
	}

	instructionButton() {
		this.scene.start('InstructionScene', { musicOn: this.musicOn});
	}

	creditsButton() {
		this.scene.start('CreditScene', { musicOn: this.musicOn});
	}	
}