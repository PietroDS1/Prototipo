//importação dos módulos externos ou classes
import BootScene from './BootScene.js';
import PreloadScene from './PreloadScene.js';
import MenuScene from './MenuScene.js';
import InstructionScene from './InstructionScene.js';
import CreditScene from './CreditScene.js';
import GameScene from './GameScene.js';
import EndScene from './EndScene.js';

//Criação dos objetos para cada cena 
let bootScene = new BootScene();
let preloadScene = new PreloadScene();
let menuScene = new MenuScene();
let instructionScene = new InstructionScene();
let creditScene = new CreditScene();
let gameScene = new GameScene();
let endScene = new EndScene();


//configuração geral
let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
};

let game = new Phaser.Game(config);

// load das cenas scenes
game.scene.add('BootScene', bootScene);
game.scene.add('PreloadScene', preloadScene);
game.scene.add('MenuScene', menuScene);
game.scene.add('InstructionScene', instructionScene);
game.scene.add('CreditScene', creditScene);
game.scene.add("GameScene", gameScene);
game.scene.add("EndScene", endScene);


//indicação da primeira cena
game.scene.start('BootScene');

//chama a segunda cena após 2s
setTimeout(function(){
  game.scene.start('PreloadScene');
}, 2000);