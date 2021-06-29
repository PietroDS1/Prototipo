export default class CreditScene extends Phaser.Scene
{

    constructor()
    {
        super("CreditScene");
    }

    init(data)
    {        
		this.musicOn = 	data.musicOn	
    }

    preload()
    {
    }

    create()
    {
        let bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'creditos');
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);


		 //botão voltar
		let btnBack = this.add.text( (this.cameras.main.width)/2,
                                    this.cameras.main.height-50, '<<< Voltar',{ fontFamily: 'Font1', fill: '#0072ff'});
		btnBack.setInteractive({ useHandCursor: true });
		btnBack.on('pointerdown', () => this.backButton());
		btnBack.setFontSize(25);
        btnBack.setOrigin(0.5);
    }

    backButton() {
		this.scene.start('MenuScene',{ musicOn: this.musicOn});
	}

}