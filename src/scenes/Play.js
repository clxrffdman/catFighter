class Play extends Phaser.Scene {
    hunger = 0;
    constructor() {
        super("playScene");
    }



    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/lettuce.png');
        this.load.image('spike', './assets/coral.png'); 
        this.load.image('turtle', './assets/cat1.png');
        this.load.image('punch', './assets/punchHitbox.png');
        this.load.image('starfield', './assets/starfield.png');
        // this.load.image('platform', './assets/floor.png');
        this.load.image('emptyBar', './assets/emptyHealthBar.png');
        this.load.image('barRed', './assets/emptyhealthBarBlue.png');
        this.load.image('barBlue', './assets/emptyhealthBarRed.png');
        this.load.image('platform', './assets/testPlatformTile.png');
        this.load.image('sand', './assets/floor_1.png');
        this.load.image('ground', './assets/floor_2.png');
        this.load.image('backdrop', './assets/backdrop.png');
        this.load.image('upgradeIcon1', './assets/upgradeIcon.png');
        this.load.image('upgradeIcon2', './assets/upgradeIcon2.png');
        this.load.image('upgradeIcon3', './assets/upgradeIcon3.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
        this.load.audio('backgroundtrack', './assets/testsong.wav');
        this.load.audio('death', './assets/death.wav');
        this.load.audio('jump', './assets/jump.wav');
        this.load.audio('hurt', './assets/hurt.mp3');
        this.load.audio('grow', './assets/grow.wav');
        this.load.audio('up', './assets/menuup.wav');
        this.load.audio('lettuce', './assets/lettuce.wav');
        this.load.atlas('haroldanims', './assets/haroldanims.png', './assets/haroldanims.json');
    }


    create() {
        //backdrop
        this.physics.world.setFPS(60);
        this.staticGroup = this.physics.add.staticGroup();
        this.playerGroup = this.physics.add.group();
        this.backdrop = this.add.tileSprite(0,110, 5120, 2880,'backdrop').setOrigin(0,0).setDepth(0).setScale(0.27);
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.floor = this.physics.add.sprite(0, 640, 'sand').setOrigin(0, 0).setFriction(1);
        this.groundVisual = this.add.tileSprite(0, 560, 2480, 500, 'ground').setOrigin(0, 0).setScale(0.5);
        this.physics.add.existing(this.floor);
        this.staticGroup.add(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;
        this.backgroundMusic = this.sound.add('backgroundtrack');
        this.backgroundMusic.loop = true; // This is what you are looking for
        this.backgroundMusic.play();

        //UI
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xB8E1FF).setOrigin(0, 0.5).setDepth(1);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0).setDepth(1);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0).setDepth(1);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0).setDepth(1);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0).setDepth(1);

        this.player1_healthBar = this.add.image(game.config.width - borderPadding * 15, borderUISize + borderPadding * 2, "emptyBar").setOrigin(0,0.5).setDepth(3);
        this.player1_healthFill = this.add.image(game.config.width - borderPadding * 15, borderUISize + borderPadding * 2, "barBlue").setOrigin(0,0.5).setDepth(2);

        this.player2_healthBar = this.add.image(borderPadding * 15, borderUISize + borderPadding * 2, "emptyBar").setOrigin(0,0.5).setDepth(3);
        this.player2_healthFill = this.add.image(borderPadding * 15, borderUISize + borderPadding * 2, "barRed").setOrigin(0,0.5).setDepth(2);

        //spaceships
        this.player1 = new Player(this, game.config.width / 4, game.config.height - borderPadding - borderUISize - 150, 'turtle', Phaser.AUTO, 5, true).setOrigin(0.5, 0.5).setFrictionX(1);
        this.player2 = new Player(this, game.config.width / 4, game.config.height - borderPadding - borderUISize - 150, 'turtle', Phaser.AUTO, 5, false).setOrigin(0.5, 0.5).setFrictionX(1);
        this.player1.setScale(1);
        this.player2.setScale(1);

        this.player1_hasUpgrade1 = false;
        this.player2_hasUpgrade1 = false;
        this.player1_hasUpgrade2 = false;
        this.player2_hasUpgrade2 = false;
        this.player1_hasUpgrade3 = false;
        this.player2_hasUpgrade3 = false;
        
        this.player1_health = 5;
        this.player2_health = 5;

        
        

        this.physics.add.collider(this.player1, this.floor);
        this.physics.add.collider(this.player2, this.floor);



        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        //Player 1 Controls

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //Player 2 Controls

        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);




        this.gameOver = false;
        this.growth = 0;
        this.speedlimit = 1000;
        this.invincibleframes = 0;

        // group with all active platforms.
        this.platformGroup = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function (platform) {
                platform.scene.platformPool.add(platform)
            }
        });



        this.upgrades1 = this.add.group();
        this.upgrades1.enableBody = true;

        this.upgrades2 = this.add.group();
        this.upgrades2.enableBody = true;
        
        this.upgrades3 = this.add.group();
        this.upgrades3.enableBody = true;

        this.hitboxesP1 = this.add.group();
        this.hitboxesP1.enableBody = true;

        this.hitboxesP2 = this.add.group();
        this.hitboxesP2.enableBody = true;


        let scoreConfig = {
            fontFamily: 'Noto Sans',
            fontSize: '28px',
            // backgroundColor: '#F3B141',
            color: '#376E60',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        scoreConfig.fixedWidth = 0;

     
        this.player1Upgrade1UI = this.add.image(borderPadding * 15 + 100, borderUISize + borderPadding * 2, "upgradeIcon1").setOrigin(0,0.5).setDepth(2);
        this.player2Upgrade1UI = this.add.image(game.config.width - borderPadding * 15 - 100, borderUISize + borderPadding * 2, "upgradeIcon1").setOrigin(0,0.5).setDepth(2);
        
        this.player1Upgrade2UI = this.add.image(borderPadding * 15 + 100 + 40, borderUISize + borderPadding * 2, "upgradeIcon2").setOrigin(0,0.5).setDepth(2);
        this.player2Upgrade2UI = this.add.image(game.config.width - borderPadding * 15 - 100 - 40, borderUISize + borderPadding * 2, "upgradeIcon2").setOrigin(0,0.5).setDepth(2);

        this.player1Upgrade3UI = this.add.image(borderPadding * 15 + 100 + 80, borderUISize + borderPadding * 2, "upgradeIcon3").setOrigin(0,0.5).setDepth(2);
        this.player2Upgrade3UI = this.add.image(game.config.width - borderPadding * 15 - 100 - 80, borderUISize + borderPadding * 2, "upgradeIcon3").setOrigin(0,0.5).setDepth(2);

        this.player1Upgrade1UI.visible = false;
        this.player2Upgrade1UI.visible = false;
        this.player1Upgrade2UI.visible = false;
        this.player2Upgrade2UI.visible = false;
        this.player1Upgrade3UI.visible = false;
        this.player2Upgrade3UI.visible = false;

        this.upgrade1 = new UpgradeCollectable(this, game.config.width / 4 * 3, game.config.height - borderPadding - borderUISize - 150, 'upgradeIcon1', Phaser.AUTO, 5);
        this.upgrades1.add(this.upgrade1);

        this.upgrade2 = new UpgradeCollectable(this, game.config.width / 4 * 3 + 50, game.config.height - borderPadding - borderUISize - 150, 'upgradeIcon2', Phaser.AUTO, 5);
        this.upgrades2.add(this.upgrade2);

        this.upgrade3 = new UpgradeCollectable(this, game.config.width / 4 * 3 + 100, game.config.height - borderPadding - borderUISize - 150, 'upgradeIcon3', Phaser.AUTO, 5);
        this.upgrades3.add(this.upgrade3);

        // pool
        this.platformPool = this.add.group({

            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function (platform) {
                platform.scene.platformGroup.add(platform)
            }
        });





        this.physics.add.overlap(this.player1, this.upgrades1, function (player, coin) {

            this.player1_hasUpgrade1 = true;
            this.player1Upgrade1UI.visible = true;
            coin.destroy();

        },null,this);

        this.physics.add.overlap(this.player2, this.upgrades1, function (player, coin) {

            this.player2_hasUpgrade1 = true;
            this.player2Upgrade1UI.visible = true;
            coin.destroy();

        },null,this);

        this.physics.add.overlap(this.player1, this.upgrades2, function (player, coin) {

            this.player1_hasUpgrade2 = true;
            this.player1Upgrade2UI.visible = true;
            coin.destroy();

        },null,this);

        this.physics.add.overlap(this.player2, this.upgrades2, function (player, coin) {

            this.player2_hasUpgrade2 = true;
            this.player2Upgrade2UI.visible = true;
            coin.destroy();

        },null,this);

        this.physics.add.overlap(this.player1, this.upgrades3, function (player, coin) {

            this.player1_hasUpgrade3 = true;
            this.player1Upgrade3UI.visible = true;
            coin.destroy();

        },null,this);

        this.physics.add.overlap(this.player2, this.upgrades3, function (player, coin) {

            this.player2_hasUpgrade3 = true;
            this.player2Upgrade3UI.visible = true;
            coin.destroy();

        },null,this);



        this.physics.add.overlap(this.player2, this.hitboxesP1, function (player, coin) {

            if(this.player2_health > 0){
                this.player2_health -= 1;
            }
            this.updateHealthUI();

            if((this.player1.x - this.player2.x) > 0){
                this.player2.setVelocityY(-500);
                this.player2.setVelocityX(-5000);
                
            }
            else{
                this.player2.setVelocityY(-500);
                this.player2.setVelocityX(5000);
                
            }

            coin.destroy();

        },null,this);

        this.physics.add.overlap(this.player1, this.hitboxesP2, function (player, coin) {

            if(this.player1_health > 0){
                this.player1_health -= 1;
            }
            
            this.updateHealthUI();

            if((this.player2.x - this.player1.x) > 0){
                this.player1.setVelocityY(-500);
                this.player1.setVelocityX(-5000);
                
            }
            else{
                this.player1.setVelocityY(-500);
                this.player1.setVelocityX(5000);
                
            }

            coin.destroy();

        },null,this);

        





        // this.player.anims.play('death', true);
        // console.log('anims', this.anims.anims.entries);
        // this.player.anims.play('walk', true);

    }


    setSpeedZero() {

        this.speed = 0;
        //console.log(this.speed + " current speed");
    }


    
    updateHealthUI(){
        this.player1_healthFill.scaleX = 1 * (this.player1_health/5);
        this.player2_healthFill.scaleX = 1 * (this.player2_health/5);
    }


    update(time, delta) {


        //console.log(this.hunger);



        if(!this.gameOver){

            if(this.invincibleframes > 0){
                this.invincibleframes--;
            }
            else{
                if(keyDOWN.isDown){
                    // this.player.anims.play('slide', true);
                }
                else{
                    // this.player.anims.play('walk', true);
                }
            }

            
        }

        //Abilities Controls

        

        if(!this.gameOver && (this.player1_health == 0 || this.player2_health == 0)){
            this.gameOver = true;
            this.sound.play('death');
        }

        if(this.gameOver){

            this.speed = 0;
            this.player1.setGravityY(0);
            this.player1.setVelocityY(0);
            this.player1.setVelocityX(0);
            this.player1.setAccelerationX(0);

            this.player2.setGravityY(0);
            this.player2.setVelocityY(0);
            this.player2.setVelocityX(0);
            this.player2.setAccelerationX(0);

            // this.player.anims.play('death', true);
            let scoreConfig = {
                fontFamily: 'Noto Sans',
            fontSize: '28px',
            // backgroundColor: '#F3B141',
            color: '#376E60',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
            }

            scoreConfig.fixedWidth = 0;

            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER - You let Harold starve! You MONSTER!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            
            if(Phaser.Input.Keyboard.JustDown(keyR)){
                this.backgroundMusic.stop();
                this.scene.restart();
            }
        }



        

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.backgroundMusic.stop();
            this.scene.start("menuScene");
        }

        //scroll backdrop
        //this.starfield.tilePositionX -= 4;


        if (!this.gameOver) {
            this.player1.update();
            this.player2.update();
        }

        

    }

 

}