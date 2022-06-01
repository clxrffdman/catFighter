class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.audio('sfx_up', './assets/menuup.wav');
    this.load.audio('sfx_down', './assets/menudown.wav');
    this.load.audio('sfx_explosion', './assets/explosion38.wav');
    this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    this.load.image('menu', './assets/menu.png');
  }

  create() {
    let menuConfig = {
      fontFamily: 'Noto Sans',
      fontSize: '28px',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    }

    this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'Cat Fighter', menuConfig).setOrigin(0.5);
    menuConfig.color = '#000';
    this.add.text(game.config.width / 4, game.config.height / 1.5, 'Press ↑ to start!', menuConfig).setOrigin(0.5).setDepth(1);

    this.add.text(game.config.width / 4, game.config.height / 1.3, 'Press ↓ for controls!', menuConfig).setOrigin(0.5).setDepth(1);

    this.menubackdrop = this.add.sprite(150, 0, 'menu').setOrigin(0, 0).setScale(0.35);

    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    scoreP1 = 0;
    scoreP2 = 0;
  }

  update() {

    if (Phaser.Input.Keyboard.JustDown(keyUP)) {
      game.settings = {
        platformStartSpeed: 350,
        spawnRange: [100, 350],
        platformSizeRange: [50, 250],
        playerGravity: 900,
        jumpForce: 400,
        playerStartPosition: 200,
        maxHunger: 2000,
        jumps: 2
      }
      this.sound.play('sfx_up');
      this.scene.start("play3Scene");
    }

    if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
      game.settings = {
        platformStartSpeed: 350,
        spawnRange: [100, 350],
        platformSizeRange: [50, 250],
        playerGravity: 900,
        jumpForce: 400,
        playerStartPosition: 200,
        maxHunger: 2000,
        jumps: 2
      }
      this.sound.play('sfx_down');
      this.scene.start("tutorialScene");
    }


  }
}