class Tutorial extends Phaser.Scene {
  constructor() {
    super("tutorialScene");
  }

  preload() {
    this.load.audio('sfx_up', './assets/menuup.wav');
    this.load.audio('sfx_down', './assets/menudown.wav');
    this.load.audio('sfx_explosion', './assets/explosion38.wav');
    this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    this.load.image('tutorial', './assets/tutorial page.png');
  }

  create() {
    let menuConfig = {
      fontFamily: 'Noto Sans',
      fontSize: '28px',
      color: '#FFFFFF',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    }

    // this.add.text(game.config.width / 2, game.config.height / 5 - borderUISize - borderPadding, 'Controls', menuConfig).setOrigin(0.5);
    // this.add.text(game.config.width / 2, game.config.height / 4, 'Player 1: Use WASD To move + jump!', menuConfig).setOrigin(0.5);
    // this.add.text(game.config.width / 2, 1.3*(game.config.height / 4), 'Collect lettuce to grow!', menuConfig).setOrigin(0.5);
    // this.add.text(game.config.width / 2, 1.6*(game.config.height / 4), 'Coral will slow you down!', menuConfig).setOrigin(0.5);
    // this.add.text(game.config.width / 2, 1.9*(game.config.height / 4), 'Avoid starvation at all costs!', menuConfig).setOrigin(0.5);
    // menuConfig.backgroundColor = '#00FF00';
    // menuConfig.color = '#000';

    this.menubackdrop = this.add.sprite(150, 0, 'tutorial').setOrigin(0, 0).setScale(0.35);

    this.add.text(game.config.width / 2, game.config.height -100 + borderUISize + borderPadding, 'Press ↑ to return to menu!', menuConfig).setOrigin(0.5).setDepth(1);

    

    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
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
      this.scene.start("menuScene");
    }



  }
}