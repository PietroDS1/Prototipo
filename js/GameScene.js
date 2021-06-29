const jumpForce = -320;
const keyWalkEnemy = 'walkEnemy';
const keyRunPlayer = 'runEnemy';
const groundHeight = 440;
export default class GameScene extends Phaser.Scene {

	constructor() {
		super("GameScene");
	}

	init(data) {
		//atributos do jogo
		this.score = 0;
		this.lives = 3;
		this.speed = 3;
		this.enemy_move = 1;
		this.score_text;
		this.lives_text;
		this.musicOn = data.musicOn;
		this.bgMusic = this.sound.add('soundgame');
		this.framesWalkEnemy = [];
		this.framesRunPlayer = [];
		this.framesIdlePlayer = [];
	};

	preload() {
		this.load.path = 'imagens/Player/';
		this.load.image('Idle', 'Idle.png');
		this.framesIdlePlayer.push('Idle');
		for (let j = 1; j <= 5; j++) {
			let idRun = `Run${j}`;
			this.load.image(idRun, `${idRun}.png`);
			this.framesRunPlayer.push(idRun);
		}
		this.load.path = 'imagens/zombie/';
		for (let i = 1; i <= 10; i++) {
			let idWalk = `Walk (${i})`;
			this.load.image(idWalk, `${idWalk}.png`);
			this.framesWalkEnemy.push(idWalk);
		}
	}

	createKeys() {
		this.keys = this.input.keyboard.createCursorKeys();
		console.log(this.keys);
		this.keys.w = this.input.keyboard.addKey('W');
		this.keys.a = this.input.keyboard.addKey('A');
		this.keys.s = this.input.keyboard.addKey('S');
		this.keys.d = this.input.keyboard.addKey('D');
	}
	createAnim(key, array, frameRate, repeat){
		this.anims.create({
			key: key, 
			frames: array.map(function (item) { return { key: `${item}` }; }),
			frameRate: frameRate,
			repeat: repeat //Vezes que repete
		});
	}
	createAnims() {
		this.createAnim(keyWalkEnemy, this.framesWalkEnemy, 8, -1);
		this.createAnim(keyRunPlayer, this.framesRunPlayer, 8, -1);
		this.createAnim('Idle', this.framesIdlePlayer, 1, -1);
	}

	createEnemy() {
		this.enemy = this.physics.add.sprite(800, this.sys.game.config.height - 100, 'Walk (1)')
			.setCollideWorldBounds(true);
		this.enemy.setScale(0.25);
		this.enemy.play(keyWalkEnemy, true);
	}

	createPlayer() {
		this.player = this.physics.add.sprite(100, this.sys.game.config.height - 100, 'Idle')
			.setBounce(0.2)
			.setCollideWorldBounds(true);
		this.player.setScale(0.1);
	}

	create() {
		if (!this.musicOn) {
			this.bgMusic.play({
				volume: 0.2,
				loop: true
			});
			this.musicOn = true;
		}

		let bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bggame');
		let scaleX = this.cameras.main.width / bg.width;
		let scaleY = this.cameras.main.height / bg.height;
		let scale = Math.max(scaleX, scaleY);
		bg.setScale(scale).setScrollFactor(0);



		//score e vidas
		this.scoreText = this.add.text(20, 16, 'Pontos: ' + this.score, { fontSize: '32px', fill: '#000' });
		this.liveText = this.add.text(this.sys.game.config.width - 200, 16, 'Vidas: ' + this.lives, { fontSize: '32px', fill: '#000' });

		//Player
		this.createPlayer();

		this.createAnims();

		//Inimigo
	    this.createEnemy();

		this.createKeys();
	}



	/*
		this.gold = this.add.sprite(850, 400, 'coin');
		this.gold.setScale(2);

		if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.gold.getBounds())) {
			this.score += 50;
			this.scoreText.setText("Pontos: " + this.score);
			this.end();
		}
	*/

	checkJump() {
		return this.keys.w.isDown || this.keys.up.isDown;
	}

	playerJump() {
		this.player.setVelocityY(jumpForce);
	}

	jumpMovement() {
		if (this.checkJump() && this.player.y > groundHeight) {
			this.playerJump();
		}
	}

	checkRight() {
		return this.keys.d.isDown || this.keys.right.isDown;
	}

	checkLeft() {
		return this.keys.a.isDown || this.keys.left.isDown;
	}

	movePlayerRight() {
		this.isMovingRight = this.checkRight();
		if (this.isMovingRight) {
			this.player.x += this.speed;
			this.player.setFlipX(false);
		}
		return this.isMovingRight;
	}

	movePlayerLeft() {
		this.isMovingLeft = this.checkLeft();
		if (this.isMovingLeft) {
			this.player.x -= this.speed;
			this.player.setFlipX(true);
		}
		return this.isMovingLeft;
	}

	debugPosition(){
		console.log('X', this.player.x);
		console.log('Y', this.player.y);
	}

	animatingPlayer() {
		if (this.isMoving) {
			this.player.play(keyRunPlayer, true);
		}
		else {
			this.player.stop();
			this.player.play('Idle');
		}
	}

	update() {
        this.debugPosition();
		this.isMoving = this.movePlayerLeft() || this.movePlayerRight();
		this.animatingPlayer();
		this.jumpMovement();
		
		if (this.enemy.x <= 400) {
			this.enemy.setFlipX(false);
			this.enemy_move = +2;
		} else if (this.enemy.x >= 800) {
			this.enemy.setFlipX(true);
			this.enemy_move = -2;
		}

		this.enemy.x += this.enemy_move;

		if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemy.getBounds())) {
			this.lives--;
			this.liveText.setText("Vidas: " + this.lives);
			this.end();
		}
	}
	
	end() {
		if (this.lives <= 0) {
			this.bgMusic.stop();
			this.scene.start("EndScene");
		} else {
			this.create();
		}
	}
}