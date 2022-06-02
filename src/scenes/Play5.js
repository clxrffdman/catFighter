class PlayFive extends Phaser.Scene {
    hunger = 0;
    constructor() {
        super("play5Scene");
    }



    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/lettuce.png');
        this.load.image('spike', './assets/coral.png');
        this.load.image('cat1', './assets/catIdle.png');
        this.load.image('cat2', './assets/cat2Idle.png');
        this.load.image('punch', './assets/punchHitbox.png');
        this.load.image('circleHitbox', './assets/circleHitbox.png');
        this.load.image('starfield', './assets/starfield.png');
        // this.load.image('platform', './assets/floor.png');
        this.load.image('emptyBar', './assets/emptyHealthBar.png');
        this.load.image('barRed', './assets/emptyHealthBarRed.png');
        this.load.image('barBlue', './assets/emptyHealthBarBlue.png');
        this.load.image('platform', './assets/testPlatformTile.png');
        this.load.image('sand', './assets/floor_1.png');
        this.load.image('ground', './assets/floor_2.png');
        this.load.image('backdrop', './assets/backdrop.png');
        this.load.image('upgradeIcon1', './assets/toyfish.png');
        this.load.image('upgradeIcon2', './assets/toymouse.png');
        this.load.image('upgradeIcon3', './assets/catnip.png');

        this.load.image('one', './assets/one.png');
        this.load.image('two', './assets/two.png');
        this.load.image('three', './assets/three.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
        this.load.audio('backgroundtrack', './assets/testsong.wav');
        this.load.audio('death', './assets/death.wav');
        this.load.audio('jump', './assets/cat_jump.mp3');
        this.load.audio('hurt', './assets/hurt.mp3');
        this.load.audio('oneBong', './assets/one.mp3');
        this.load.audio('threeBong', './assets/three.mp3');
        this.load.audio('super_jump', './assets/cat_superjump.mp3');
        this.load.audio('growl', './assets/cat_growl.mp3');
        this.load.audio('up', './assets/menuup.wav');
        this.load.audio('upgrade', './assets/upgrade.mp3');
        this.load.audio('whip', './assets/whip.mp3');
        this.load.atlas('catAnims', './assets/spritesheet2.png', './assets/catsheet.json');

        this.load.spritesheet("tilesheet", "./assets/colored_transparent_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("testTileset", "./assets/colored_transparent_packed.png"); 
        this.load.tilemapTiledJSON("platform_map5", "./assets/testLevel5.json");    // Tiled JSON file


    }

    


    create() {

        // add a tilemap
        this.map = this.add.tilemap("platform_map5");
        // add a tileset to the map
        this.tileset = this.map.addTilesetImage("testTileset");
        // create tilemap layers
        this.groundLayer = this.map.createLayer("Tile Layer 1", this.tileset, -100, 0).setScale(2);

        // groundLayer.x = game.config.width/4;
        // groundLayer.y = 200;


        this.groundLayer.setCollisionByProperty({ 
            collides: true
        });
        
        this.backdrop = this.add.sprite(0,-300,'backdrop').setOrigin(0,0).setDepth(-1).setScale(0.8);
        
        
        this.p1Spawn = this.map.findObject("Objects", obj => obj.name === "P1 Spawn");
        this.p2Spawn = this.map.findObject("Objects", obj => obj.name === "P2 Spawn");

        this.p1Spawn.x *= 2;
        this.p1Spawn.y *= 2;
        this.p1Spawn.x -= 100;

        this.p2Spawn.x *= 2;
        this.p2Spawn.y *= 2;
        this.p2Spawn.x -= 100;

        this.upgrade1s = this.map.createFromObjects("Objects", {
            name: "pawPowerup",
        });

        this.upgrade3s = this.map.createFromObjects("Objects", {
            name: "jumpPowerup",
        });

        this.upgrade4s = this.map.createFromObjects("Objects", {
            name: "spinPowerup",
        });

        this.anims.create({ 
            key: 'cat1_idle', 
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat_run_1' }
            ],
            repeat: 1
        });
        this.anims.create({ 
            key: 'cat1_run', 
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat_run_2' }
            ],
            repeat: -1 
        });
        this.anims.create({
            key: 'cat1_hiss',
            defaultTextureKey: 'catAnims',
            frames: this.anims.generateFrameNames('catAnims', {      
                prefix: 'cat_hiss_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 0 
            }), 
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'cat1_slide',
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat_slide_2' }
            ],
            repeat: -1
        });
        this.anims.create({
            key: 'cat1_hurt',
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat_hurt_2' }
            ],
            repeat: -1
        });
        this.anims.create({
            key: 'cat1_super_jump',
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat_superJump_2' }
            ],
        });
        this.anims.create({
            key: 'cat1_tailSpin',
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat_tailWhip_2' }
            ],
            // repeat: -1
        });

        this.anims.create({ 
            key: 'cat2_idle', 
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat2_run_1' }
            ],
            repeat: 1
        });
        this.anims.create({ 
            key: 'cat2_run', 
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat2_run_2' }
            ],
            repeat: -1 
        });
        this.anims.create({
            key: 'cat2_hiss',
            defaultTextureKey: 'catAnims',
            frames: this.anims.generateFrameNames('catAnims', {      
                prefix: 'cat2_hiss_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 0 
            }), 
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'cat2_slide',
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat2_slide_2' }
            ],
            repeat: -1
        });
        this.anims.create({
            key: 'cat2_hurt',
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat2_hurt_2' }
            ],
            repeat: -1
        });
        this.anims.create({
            key: 'cat2_super_jump',
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat2_superJump_2' }
            ],
            repeat: -1
        });
        this.anims.create({
            key: 'cat2_tailSpin',
            defaultTextureKey: 'catAnims',
            frames: [
                { frame: 'cat2_tailWhip_2' }
            ],
        });


        

        
        

        this.upgrade1s.image = 'upgradeIcon1';

        //backdrop
        this.physics.world.setFPS(60);
        this.staticGroup = this.physics.add.staticGroup();
        this.playerGroup = this.physics.add.group();
        this.backgroundMusic = this.sound.add('backgroundtrack');
        this.backgroundMusic.loop = true; // This is what you are looking for
        this.backgroundMusic.setVolume(0.2);
        this.backgroundMusic.play();
        

        //UI
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xB8E1FF).setOrigin(0, 0.5).setDepth(1);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0).setDepth(1);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0).setDepth(1);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0).setDepth(1);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0).setDepth(1);

        this.uiGroup = this.add.group();

        this.uiGroup.add(this.player2_healthBar = this.add.image(game.config.width - borderPadding * 15, borderUISize + borderPadding * 2, "emptyBar").setOrigin(0, 0.5).setDepth(3));
        this.player2_healthFill = this.add.image(game.config.width - borderPadding * 15, borderUISize + borderPadding * 2, "barBlue").setOrigin(0, 0.5).setDepth(2);

        this.player1_healthBar = this.add.image(borderPadding * 15, borderUISize + borderPadding * 2, "emptyBar").setOrigin(0, 0.5).setDepth(3);
        this.player1_healthFill = this.add.image(borderPadding * 15, borderUISize + borderPadding * 2, "barRed").setOrigin(0, 0.5).setDepth(2);

        //spaceships
        this.player1 = new Player(this, this.p1Spawn.x, this.p1Spawn.y, 'cat1', Phaser.AUTO, 5, true).setScale(0.15).setOrigin(0.5, 0.5).setFrictionX(1);
        this.player2 = new Player(this, this.p2Spawn.x, this.p2Spawn.y, 'cat2', Phaser.AUTO, 5, false).setScale(0.15).setOrigin(0.5, 0.5).setFrictionX(1);

        this.physics.add.collider(this.player1, this.groundLayer);
        this.physics.add.collider(this.player2, this.groundLayer);

        this.cameras.main.setBounds(0, 0, 1920, 1080);
        // this.cameras.main.ignore(this.uiGroup);
        // this.camera1 = this.cameras.add(0, 0, 1280, 720);

        this.player1_hasUpgrade1 = false;
        this.player2_hasUpgrade1 = false;
        this.player1_hasUpgrade2 = false;
        this.player2_hasUpgrade2 = false;
        this.player1_hasUpgrade3 = false;
        this.player2_hasUpgrade3 = false;

        this.player1_health = 8;
        this.player2_health = 8;

        this.player1_maxHealth = 8;
        this.player2_maxHealth = 8;



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
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        //Player 2 Controls

        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keySemicolon = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON);
        keyPeriod = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);




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


        

        // this.upgrades1.add(this.upgrade1s);

        this.upgrades1 = this.add.group(this.upgrade1s);
        
        this.upgrades1.children.each(function(upgrade) {
            upgrade.x *= 2;
            upgrade.y *= 2;
            upgrade.x -=100;
            upgrade.alpha = 0;
            upgrade = new UpgradeCollectable(this, upgrade.x, upgrade.y, 'upgradeIcon1', Phaser.AUTO, 5).setScale(0.15);
            this.upgrades1.add(upgrade);
          }, this);

        // this.upgrades1.add(this.upgrade1s);
        this.upgrades1.enableBody = true;

        this.upgrades2 = this.add.group();
        this.upgrades2.enableBody = true;

        this.upgrades3 = this.add.group(this.upgrade3s);
        this.upgrades3.children.each(function(upgrade) {
            upgrade.x *= 2;
            upgrade.y *= 2;
            upgrade.x -=100;
            upgrade.alpha = 0;
            upgrade = new UpgradeCollectable(this, upgrade.x, upgrade.y, 'upgradeIcon3', Phaser.AUTO, 5).setScale(0.1);
            this.upgrades3.add(upgrade);
          }, this);
        this.upgrades3.enableBody = true;

        this.upgrades4 = this.add.group(this.upgrade4s);
        this.upgrades4.children.each(function(upgrade) {
            upgrade.x *= 2;
            upgrade.y *= 2;
            upgrade.x -=100;
            upgrade.alpha = 0;
            upgrade = new UpgradeCollectable(this, upgrade.x, upgrade.y, 'upgradeIcon2', Phaser.AUTO, 5).setScale(0.1);
            this.upgrades4.add(upgrade);
          }, this);
        this.upgrades4.enableBody = true;

        this.upgrades5 = this.add.group();
        this.upgrades5.enableBody = true;

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

        this.scoreP1Text = this.add.text(game.config.width / 2 - 30, borderUISize + borderPadding * 2, scoreP1, scoreConfig).setOrigin(0.5).setDepth(2);
        this.scoreP2Text = this.add.text(game.config.width / 2 + 30, borderUISize + borderPadding * 2, scoreP2, scoreConfig).setOrigin(0.5).setDepth(2);

        this.three = this.add.image(game.config.width / 2, game.config.height / 2, "three");
        this.two = this.add.image(game.config.width / 2, game.config.height / 2, "two");
        this.one = this.add.image(game.config.width / 2, game.config.height / 2, "one");

        this.three.visible = false;
        this.two.visible = false;
        this.one.visible = false;

        this.player1Upgrade1UI = this.add.image(borderPadding * 15 + 100, borderUISize + borderPadding * 2, "upgradeIcon1").setOrigin(0, 0.5).setDepth(2).setScale(0.1);
        this.player2Upgrade1UI = this.add.image(game.config.width - borderPadding * 15 - 100, borderUISize + borderPadding * 2, "upgradeIcon1").setOrigin(0, 0.5).setDepth(2).setScale(0.1);

        this.player1Upgrade2UI = this.add.image(borderPadding * 15 + 100 + 120, borderUISize + borderPadding * 2, "upgradeIcon2").setOrigin(0, 0.5).setDepth(2).setScale(0.05);
        this.player2Upgrade2UI = this.add.image(game.config.width - borderPadding * 15 - 100 - 120, borderUISize + borderPadding * 2, "upgradeIcon2").setOrigin(0, 0.5).setDepth(2).setScale(0.05);

        this.player1Upgrade3UI = this.add.image(borderPadding * 15 + 100 + 80, borderUISize + borderPadding * 2, "upgradeIcon3").setOrigin(0, 0.5).setDepth(2).setScale(0.06);
        this.player2Upgrade3UI = this.add.image(game.config.width - borderPadding * 15 - 100 - 80, borderUISize + borderPadding * 2, "upgradeIcon3").setOrigin(0, 0.5).setDepth(2).setScale(0.06);

        this.player1Upgrade4UI = this.add.image(borderPadding * 15 + 100 + 40, borderUISize + borderPadding * 2, "upgradeIcon2").setOrigin(0, 0.5).setDepth(2).setScale(0.06);
        this.player2Upgrade4UI = this.add.image(game.config.width - borderPadding * 15 - 100 - 40, borderUISize + borderPadding * 2, "upgradeIcon2").setOrigin(0, 0.5).setDepth(2).setScale(0.06);

        this.player1Upgrade5UI = this.add.image(borderPadding * 15 + 100 + 160, borderUISize + borderPadding * 2, "upgradeIcon3").setOrigin(0, 0.5).setDepth(2).setScale(0.1);
        this.player2Upgrade5UI = this.add.image(game.config.width - borderPadding * 15 - 100 - 160, borderUISize + borderPadding * 2, "upgradeIcon3").setOrigin(0, 0.5).setDepth(2).setScale(0.1);

        //UPGRADE 1: FRONT PAW -> SCRATCH
        //UPGRADE 2: BODY -> EXTRA HEALTH
        //UPGRADE 3: BACK PAW -> SUPER JUMP

        this.player1Upgrade1UI.visible = false;
        this.player2Upgrade1UI.visible = false;
        this.player1Upgrade2UI.visible = false;
        this.player2Upgrade2UI.visible = false;
        this.player1Upgrade3UI.visible = false;
        this.player2Upgrade3UI.visible = false;
        this.player1Upgrade4UI.visible = false;
        this.player2Upgrade4UI.visible = false;
        this.player1Upgrade5UI.visible = false;
        this.player2Upgrade5UI.visible = false;

        // this.upgrade1 = new UpgradeCollectable(this, game.config.width / 4 * 3, game.config.height - borderPadding - borderUISize - 150, 'upgradeIcon1', Phaser.AUTO, 5);
        // this.upgrades1.add(this.upgrade1);

        // this.upgrade2 = new UpgradeCollectable(this, game.config.width / 4 * 3 + 50, game.config.height - borderPadding - borderUISize - 150, 'upgradeIcon2', Phaser.AUTO, 5);
        // this.upgrades2.add(this.upgrade2);

        // this.upgrade3 = new UpgradeCollectable(this, game.config.width / 4 * 3 + 100, game.config.height - borderPadding - borderUISize - 150, 'upgradeIcon3', Phaser.AUTO, 5);
        // this.upgrades3.add(this.upgrade3);

        // this.upgrade4 = new UpgradeCollectable(this, game.config.width / 4 * 3 + 150, game.config.height - borderPadding - borderUISize - 150, 'upgradeIcon3', Phaser.AUTO, 5);
        // this.upgrades4.add(this.upgrade4);

        // this.upgrade5 = new UpgradeCollectable(this, game.config.width / 4 * 3 + 200, game.config.height - borderPadding - borderUISize - 150, 'upgradeIcon3', Phaser.AUTO, 5);
        // this.upgrades5.add(this.upgrade5);

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
            this.sound.play('upgrade');
            coin.destroy();

        }, null, this);

        this.physics.add.overlap(this.player2, this.upgrades1, function (player, coin) {

            this.player2_hasUpgrade1 = true;
            this.player2Upgrade1UI.visible = true;
            this.sound.play('upgrade');
            coin.destroy();

        }, null, this);

        this.physics.add.overlap(this.player1, this.upgrades2, function (player, coin) {

            if (!this.player1_hasUpgrade2) {
                this.player1_hasUpgrade2 = true;
                this.player1Upgrade2UI.visible = true;
                this.sound.play('upgrade');
                this.player1_maxHealth += 5;
                this.player1_health += 5;
                coin.destroy();
            }


        }, null, this);

        this.physics.add.overlap(this.player2, this.upgrades2, function (player, coin) {

            if (!this.player2_hasUpgrade2) {
                this.player2_hasUpgrade2 = true;
                this.player2Upgrade2UI.visible = true;
                this.sound.play('upgrade');
                this.player2_maxHealth += 5;
                this.player2_health += 5;
                coin.destroy();
            }

        }, null, this);

        this.physics.add.overlap(this.player1, this.upgrades3, function (player, coin) {

            this.player1_hasUpgrade3 = true;
            this.player1Upgrade3UI.visible = true;
            this.sound.play('upgrade');
            coin.destroy();

        }, null, this);

        this.physics.add.overlap(this.player2, this.upgrades3, function (player, coin) {

            this.player2_hasUpgrade3 = true;
            this.player2Upgrade3UI.visible = true;
            this.sound.play('upgrade');
            coin.destroy();

        }, null, this);

        this.physics.add.overlap(this.player1, this.upgrades4, function (player, coin) {

            this.player1_hasUpgrade4 = true;
            this.player1Upgrade4UI.visible = true;
            this.sound.play('upgrade');
            coin.destroy();

        }, null, this);

        this.physics.add.overlap(this.player2, this.upgrades4, function (player, coin) {

            this.player2_hasUpgrade4 = true;
            this.player2Upgrade4UI.visible = true;
            this.sound.play('upgrade');
            coin.destroy();

        }, null, this);

        this.physics.add.overlap(this.player1, this.upgrades5, function (player, coin) {

            this.player1_hasUpgrade5 = true;
            this.player1Upgrade5UI.visible = true;
            this.sound.play('upgrade');
            coin.destroy();

        }, null, this);

        this.physics.add.overlap(this.player2, this.upgrades5, function (player, coin) {

            this.player2_hasUpgrade5 = true;
            this.player2Upgrade5UI.visible = true;
            this.sound.play('upgrade');
            coin.destroy();

        }, null, this);





        this.physics.add.overlap(this.player2, this.hitboxesP1, function (player, coin) {

            if (this.player2_health > 0) {
                this.player2_health -= 1;
            }
            this.updateHealthUI();
            this.player2.getHurt();

            if ((this.player1.x - this.player2.x) > 0) {
                this.player2.setVelocityY(-500);
                this.player2.setVelocityX(-5000);

            }
            else {
                this.player2.setVelocityY(-500);
                this.player2.setVelocityX(5000);

            }
            this.cameras.main.shake(200, 0.002);
            coin.destroy();

        }, null, this);

        this.physics.add.overlap(this.player1, this.hitboxesP2, function (player, coin) {

            if (this.player1_health > 0) {
                this.player1_health -= 1;
            }

            this.updateHealthUI();
            this.player1.getHurt();

            if ((this.player2.x - this.player1.x) > 0) {
                this.player1.setVelocityY(-500);
                this.player1.setVelocityX(-5000);

            }
            else {
                this.player1.setVelocityY(-500);
                this.player1.setVelocityX(5000);

            }
            this.cameras.main.shake(200, 0.002);
            coin.destroy();

        }, null, this);



        this.beginCombat = false;

        this.timedEventCombat = this.time.delayedCall(2000, this.startFight, [], this);
        this.timedEventthree = this.time.delayedCall(150, this.threeVisible, [], this);
        this.timedEventtwo = this.time.delayedCall(767, this.twoVisible, [], this);
        this.timedEventone = this.time.delayedCall(1384, this.oneVisible, [], this);
        this.cameras.main.flash(100);
        this.cameras.main.fadeIn(150);


        // this.player.anims.play('death', true);
        // console.log('anims', this.anims.anims.entries);
        // this.player.anims.play('walk', true);

    }

    threeVisible() {
        this.three.visible = true;
        this.sound.play('oneBong');
    }

    twoVisible() {
        this.three.visible = false;
        this.two.visible = true;
        this.sound.play('oneBong');

    }

    oneVisible() {
        this.two.visible = false;
        this.one.visible = true;
        this.sound.play('threeBong');
    }


    setSpeedZero() {

        this.speed = 0;
        //console.log(this.speed + " current speed");
    }

    restartScene() {
        this.backgroundMusic.stop();

        this.loadIndex = Phaser.Math.Between(0,4);
        console.log(this.loadIndex);
        if(this.loadIndex == 0){

            this.scene.start("playScene");
        }
        if(this.loadIndex == 1){

            this.scene.start("play3Scene");
        }
        if(this.loadIndex == 2){

            this.scene.start("play4Scene");

        }
        if(this.loadIndex == 3){

            this.scene.start("play5Scene");

        }
        if(this.loadIndex == 4){

            this.scene.start("play6Scene");

        }

        
    }

    startFight() {
        this.beginCombat = true;
        this.one.visible = false;
    }



    updateHealthUI() {
        this.player1_healthFill.scaleX = 1 * (this.player1_health / this.player1_maxHealth);
        this.player2_healthFill.scaleX = 1 * (this.player2_health / this.player2_maxHealth);
    }


    update(time, delta) {


        //console.log(this.hunger);



        if (!this.gameOver) {

            if (this.invincibleframes > 0) {
                this.invincibleframes--;
            }
            else {
                if (keyDOWN.isDown) {
                    // this.player.anims.play('slide', true);
                }
                else {
                    // this.player.anims.play('walk', true);
                }
            }

            if(this.player1.y > 1000){
                this.player1_health = 0;
                this.updateHealthUI();
            }

            if(this.player2.y > 1000){
                this.player2_health = 0;
                this.updateHealthUI();
            }


        }

        //Abilities Controls



        if (!this.gameOver && (this.player1_health == 0 || this.player2_health == 0)) {
            this.gameOver = true;
            this.sound.play('death');

            if (this.player1_health == 0) {
                scoreP2 += 1;
            }

            if (this.player2_health == 0) {
                scoreP1 += 1;
            }

            if (scoreP1 < 5 && scoreP2 < 5) {

                this.cameras.main.fadeOut(800);
                this.timedEventCombat = this.time.delayedCall(801, this.restartScene, [], this);
            }
            this.cameras.main.shake(1000, 0.04);

        }

        if (this.gameOver) {

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
                backgroundColor: '#F3B141',
                color: '#376E60',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 100
            }

            scoreConfig.fixedWidth = 0;

            if (scoreP1 >= 5) {
                this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER - Player 1 wins!', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press ← to Menu', scoreConfig).setOrigin(0.5);

                if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                    this.backgroundMusic.stop();
                    this.scene.start("menuScene");

                }


            }
            else if (scoreP2 >= 5) {
                this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER - Player 2 wins!', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press ← to Menu', scoreConfig).setOrigin(0.5);

                if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                    this.backgroundMusic.stop();
                    this.scene.start("menuScene");

                }


            }
            else {
                // this.add.text(game.config.width / 2, game.config.height / 2, 'Round Complete.', scoreConfig).setOrigin(0.5);
                // this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to go to next Round or ← to Quit', scoreConfig).setOrigin(0.5);

                if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                    this.backgroundMusic.stop();
                    this.scene.start("menuScene");

                }


            }








        }







        //scroll backdrop
        //this.starfield.tilePositionX -= 4;


        if (!this.gameOver && this.beginCombat) {
            this.player1.update();
            this.player2.update();
        }



    }



}