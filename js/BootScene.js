export default class BootScene extends Phaser.Scene {

	constructor() {
		super('BootScene');
	}

	preload() {
		this.load.image('splash', 'imagens/splash.png');
		this.load.audio('soundopen', 'audio/open.mp3');
		
	}

	create() {
        let bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'splash');
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);
		this.bgMusic = this.sound.add('soundopen');
        this.bgMusic.play();
	}

}