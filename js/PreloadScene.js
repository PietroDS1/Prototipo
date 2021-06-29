export default class PreloadScene extends Phaser.Scene {

	constructor() {
		super('PreloadScene');
		
	}

	preload() {
		

		
	
		
		






		// Barra de progresso
		let startX = (this.cameras.main.width - 400)/2;
		let startY = this.cameras.main.height - 50;

		this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		let progressBar = new Phaser.Geom.Rectangle(startX, 
													 startY, 
													 400, 
													 20);
		let progressBarFill = new Phaser.Geom.Rectangle(startX+5, 
														 startY+5, 
														 395, 15);

		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

		this.newGraphics.fillStyle(0xff0000, 1);
		this.newGraphics.fillRectShape(progressBarFill);

		var loadingText = this.add.text(startX, startY+22,"Carregando: ", { fontSize: '32px', fill: '#FFF' });


		this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics, 
												  loadingText:loadingText, startX:startX, startY:startY});
		this.load.on('complete', this.complete, {scene:this.scene});

		
		//Carregar todos os assets	
		this.load.image('bgmenu', 'imagens/bgmenu.jpg');
		this.load.image('bggame', 'imagens/bggame.jpg');
		this.load.image('instrucoes', 'imagens/instruções.png');
		this.load.image('creditos', 'imagens/creditos.png');
		this.load.image('bgover', 'imagens/bgover.jpg');
		this.load.image('player', 'imagens/player.png');		
		this.load.image('coin', 'imagens/coin.png');
		this.load.image('menuopt', 'imagens/menuopt.png');		
		this.load.audio('soundmenu', 'audio/menu.mp3');
		this.load.audio('soundgame', 'audio/game.mp3');
		this.load.audio('soundover', 'audio/over.mp3');
	}

	updateBar(percentage) {
		if(this.newGraphics) {
			this.newGraphics.clear();
			this.newGraphics.fillStyle(0xff0000, 1);
			this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.startX+5, 
																	 this.startY+5, percentage*390, 10));
		}
		percentage = percentage * 100;
		this.loadingText.setText("Carregando: " + percentage.toFixed(2) + "%");
	}

	complete() {
		this.scene.start("MenuScene", { musicOn: false});
	}

	create() {
		
	}

}