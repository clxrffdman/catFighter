class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, baseJump, isPlayerOne) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOffset(1, 1);
        this.scene = scene;
        this.minJump = baseJump;
        this.isGrounded = false;
        this.setScale(1);
        //this.setBounce(1, 1);
        // this.setCollideWorldBounds(true);
        // this.body.onWorldBounds = true;
        this.body.setGravityY(1200);
        this.maxJumpTime = 18;
        this.currentJumpTime = 0;
        this.jumpHeld = false;
        this.isSlide = false;
        this.jumpAmount = 0;
        this.jumpVelocity = 330;
        //this.setBodySize(600,300,false);
        this.isPlayerOneS = isPlayerOne;
        this.isFacingRight = true;
        this.setBodySize(200, 250, true);
        this.isPunching = false;
        this.isSuperJumping = false;
        this.isSpinning = false;
        this.isPunchFrame = false;
        this.isJumpFrame = false;
        this.isSpinFrame = false;
        this.isHurtFrame = false;

        this.setMaxVelocity(500, 900);
        this.canPunch = false;
        this.canSuperJump = false;
        this.canSpin = false;
        this.totalUpgrade = 0;

        this.updateTransparency();

        this.powerUpVfxManager = this.scene.add.particles('dust');

        this.powerUpVfxEffect = this.powerUpVfxManager.createEmitter({
            follow: this,
            followOffset: {
                   x: 0,
                   y: 15
                },
            quantity: 15,
            scale: {start: 0.7, end: 0.0},  // start big, end small
            speed: {min: 100, max: 50}, // speed up
            lifespan: 250,   // short lifespan
            radial: true,
            angle: { min: 180, max: 360 },  // { start, end, steps }
            on: false   // do not immediately start, will trigger in collision
        });

        this.slidepowerUpVfxEffect = this.powerUpVfxManager.createEmitter({
            follow: this,
            followOffset: {
                   x: 0,
                   y: 0
                },
            quantity: 2,
            scale: {start: 0.5, end: 0.0},  // start big, end small
            speed: {min: 200, max: 50}, // speed up
            lifespan: 200,   // short lifespan
            radial: true,
            angle: { min: 180, max: 360 },  // { start, end, steps }
            on: false   // do not immediately start, will trigger in collision
        });
    }

    doJump() {

        if (this.isGrounded) {
            this.setVelocityY(-this.jumpVelocity);
            this.scene.sound.play('jump');
            if (this.isPlayerOneS) {
                if(!this.isPunchFrame && !this.isSpinFrame && !this.isHurtFrame){
                    this.anims.play('cat1_super_jump', false);
                }
            }
            else {
                if(!this.isPunchFrame && !this.isSpinFrame && !this.isHurtFrame){
                    this.anims.play('cat2_super_jump', false);
                }
            }

            this.powerUpVfxEffect.explode();
            

            this.isJumpFrame = true;

            this.timedEvent = this.scene.time.delayedCall(500, this.stopJumpFrame, [], this);

        }
        else {
            this.currentJumpTime++;
        }

        if (this.jumpHeld && (this.body.velocity.y < 0 || this.jumpAmount < 2) && this.currentJumpTime < this.maxJumpTime) {
            this.setVelocityY(-this.jumpVelocity);

            if (this.isPlayerOneS) {
                if(!this.isPunchFrame && !this.isSpinFrame){
                    this.anims.play('cat1_super_jump', false);
                }
            }
            else {
                if(!this.isPunchFrame && !this.isSpinFrame){
                    this.anims.play('cat2_super_jump', false);
                }
            }
            


            this.isJumpFrame = true;

            this.timedEvent = this.scene.time.delayedCall(500, this.stopJumpFrame, [], this);

            //this.setVelocity(0, -300 + (50*((this.maxJumpTime - this.currentJumpTime)/this.maxJumpTime)));
        }


        this.isGrounded = false;
    }

    stopHurtFrame(){
        this.isHurtFrame = false;
    }

    getHurt(){
        this.isHurtFrame = true;
        this.scene.sound.play('hurt');
        this.timedEvent = this.scene.time.delayedCall(500, this.stopHurtFrame, [], this);
        if (this.isPlayerOneS) {
            if(!this.isPunchFrame && !this.isSpinFrame){
                this.anims.play('cat1_hurt', false);
            }
            
        }
        else {
            if(!this.isPunchFrame && !this.isSpinFrame){
                this.anims.play('cat2_hurt', false);
            }
        }
        
    }
        
    

    doSuperJump() {
        this.isSuperJumping = true;
        this.setVelocityY(-800);
        this.setAccelerationY(-300);
        this.scene.sound.play('super_jump');

        if (this.isPlayerOneS) {
            if(!this.isPunchFrame && !this.isSpinFrame){
                this.anims.play('cat1_super_jump', false);
            }
            
        }
        else {
            if(!this.isPunchFrame && !this.isSpinFrame){
                this.anims.play('cat2_super_jump', false);
            }
        }


        this.isJumpFrame = true;

        this.timedEvent = this.scene.time.delayedCall(500, this.stopJumpFrame, [], this);

        this.timedEvent = this.scene.time.delayedCall(500, this.endJump, [], this);
        this.timedEvent = this.scene.time.delayedCall(3000, this.stopSuperJumping, [], this);
    }

    endJump() {
        this.setAccelerationY(0);
    }


    doSpin() {
        this.isSpinning = true;
        this.isSpinFrame = true;

        if (this.isPlayerOneS) {
            this.anims.play('cat1_hiss', false);
        }
        else {
            this.anims.play('cat2_hiss', false);
        }

        this.scene.sound.play('growl');

        this.spin = new Spin(this.scene, this.x, this.y, 'circleHitbox', Phaser.AUTO, this, true).setOrigin(0.5, 0.5).setScale(2.2);
        if (this.isPlayerOneS) {
            this.scene.hitboxesP1.add(this.spin);
        }
        else {
            this.scene.hitboxesP2.add(this.spin);
        }
        this.timedEvent = this.scene.time.delayedCall(3000, this.stopSpinning, [], this);
        this.timedEvent = this.scene.time.delayedCall(400, this.stopSpinFrame, [], this);
    }

    stopSpinning() {
        this.isSpinning = false;
    }

    stopSuperJumping() {
        this.isSuperJumping = false;
    }

    modifyJumpHeight(arg) {
        this.jumpVelocity = arg;
    }

    doPunch() {
        this.isPunching = true;
        this.isPunchFrame = true;

        this.scene.sound.play('whip');

        if (this.isPlayerOneS) {
            this.anims.play('cat1_tailSpin', false);
        }
        else {
            this.anims.play('cat2_tailSpin', false);
        }

        if (this.isFacingRight) {
            this.punch = new Punch(this.scene, this.x, this.y, 'punch', Phaser.AUTO, this, true).setOrigin(-0.5, 0.5).setScale(1);
            if (this.isPlayerOneS) {
                this.scene.hitboxesP1.add(this.punch);
            }
            else {
                this.scene.hitboxesP2.add(this.punch);
            }

        }
        else {
            this.punch = new Punch(this.scene, this.x, this.y, 'punch', Phaser.AUTO, this, true).setOrigin(1.4, 0.5).setScale(1);;
            if (this.isPlayerOneS) {
                this.scene.hitboxesP1.add(this.punch);
            }
            else {
                this.scene.hitboxesP2.add(this.punch);
            }
            this.punch.flipX = true;

        }

        this.timedEvent = this.scene.time.delayedCall(500, this.stopPunching, [], this);
        this.timedEvent = this.scene.time.delayedCall(200, this.stopPunchFrame, [], this);
    }

    stopPunchFrame() {
        this.isPunchFrame = false;
    }

    stopJumpFrame() {
        this.isJumpFrame = false;
    }

    stopSpinFrame() {
        this.isSpinFrame = false;
    }

    stopPunching() {
        this.isPunching = false;
    }

    updateTransparency(){
        if(this.totalUpgrade == 0){
            this.alpha = 0.6;
        }
        if(this.totalUpgrade == 1){
            this.alpha = 0.7;
        }
        if(this.totalUpgrade == 2){
            this.alpha = 0.85;
        }
        if(this.totalUpgrade == 3){
            this.alpha = 1;
        }
    }

    update() {

     

        if (this.isPunching) {
            this.punch.update();
        }

        if (this.isSpinning) {
            this.spin.update();
        }
        // if(this.scene.isGround){
        //     this.isGrounded = true;
        // }
        if (this.body.onWall()) {
            //console.log("set speed to 0");
            this.scene.speed = 0;
        }
        if (this.body.onFloor()) {
            this.isGrounded = true;
            this.currentJumpTime = 0;
            this.jumpAmount = 0;

        }

        if (this.isPlayerOneS) {
            if (!this.isPunchFrame && !this.isSpinFrame && !this.isJumpFrame && !this.isHurtFrame ){
                this.anims.play('cat1_idle', false);
            }

        }
        else {
            if (!this.isPunchFrame && !this.isSpinFrame && !this.isJumpFrame && !this.isHurtFrame) {
                this.anims.play('cat2_idle', false);
            }
        }

        if (this.isFacingRight) {
            this.flipX = false;
        }
        else {
            this.flipX = true;
        }

        if (this.isPlayerOneS) {

            //punch

            if (!this.canPunch) {
                if (this.scene.player1_hasUpgrade1) {
                    this.totalUpgrade+=1;
                    this.canPunch = true;
                    this.updateTransparency();
                }
            }

            if (this.canPunch && keyE.isDown && !this.isPunching) {
                this.doPunch();
            }

            //spin
            if (!this.canSpin) {
                if (this.scene.player1_hasUpgrade4) {
                    this.totalUpgrade+=1;
                    this.canSpin = true;
                    this.updateTransparency();
                }
            }

            if (this.canSpin && keyF.isDown && !this.isSpinning) {
                this.doSpin();
            }

            //super jump
            if (!this.canSuperJump) {
                if (this.scene.player1_hasUpgrade3) {
                    this.totalUpgrade+=1;
                    this.canSuperJump = true;
                    this.updateTransparency();
                }
            }

            if (this.canSuperJump && keyR.isDown && !this.isSuperJumping) {
                this.doSuperJump();
            }


            if (keyA.isDown) {
                this.setAccelerationX(-3000);
                if(!this.isPunchFrame && !this.isSpinFrame && !this.isJumpFrame && !this.isHurtFrame){
                    this.anims.play('cat1_run', false);
                }
                this.isFacingRight = false;
            }

            if (keyD.isDown) {
                this.setAccelerationX(3000);
                if(!this.isPunchFrame && !this.isSpinFrame && !this.isJumpFrame && !this.isHurtFrame){
                    this.anims.play('cat1_run', false);
                }
                this.isFacingRight = true;
            }

            if (!keyA.isDown && !keyD.isDown && !keyS.isDown) {
                this.setAccelerationX(0);
                this.setDragX(1500);

            }

            if ((keyA.isDown || keyD.isDown) && keyS.isDown) {
                this.setAccelerationX(0);
                this.setDragX(400);
            }

            if ((!keyA.isDown && !keyD.isDown) && keyS.isDown) {
                this.setAccelerationX(0);
                this.setDragX(400);
            }
            //console.log(this.isGrounded);
            if (keyW.isDown) {
                if (this.body.onFloor()) {
                    this.jumpHeld = true;
                }

                if (this.jumpAmount < 1 && this.jumpHeld == false) {
                    this.jumpHeld = true;
                    this.currentJumpTime = 0;
                    this.jumpAmount++;
                    this.scene.sound.play('jump');
                    this.powerUpVfxEffect.explode();
                }
                this.doJump();

            }
            else {
                this.jumpHeld = false;

            }

            if (keyS.isDown) {

                if (!this.isSlide) {
                    this.isSlide = true;
                    this.body.setGravityY(3400);

                    if (this.isGrounded) {
                        this.y += 30;
                    }
                    this.setBodySize(200, 115, false);
                }

                this.anims.play('cat1_slide', false);

                if(Phaser.Math.Difference(this.body.velocity.x,0) > 100 && this.isGrounded){
                    this.slidepowerUpVfxEffect.explode();
                }


            }
            if (this.isSlide && !keyS.isDown) {
                this.isSlide = false;
                this.body.setGravityY(1200);
                this.setBodySize(200, 250, false);
                this.y -= 25;
                this.anims.play('cat1_idle', false);

            }
        }
        else {

            if (!this.canPunch) {
                if (this.scene.player2_hasUpgrade1) {
                    this.totalUpgrade+=1;
                    this.canPunch = true;
                    this.updateTransparency();
                }
            }

            if (this.canPunch && keyO.isDown && !this.isPunching) {
                this.doPunch();
            }

            //spin
            if (!this.canSpin) {
               if (this.scene.player2_hasUpgrade4) {
                    this.totalUpgrade+=1;
                    this.canSpin = true;
                    this.updateTransparency();
                }
            }

            if (this.canSpin && keySemicolon.isDown && !this.isSpinning) {
                this.doSpin();
            }

            //super jump
            if (!this.canSuperJump) {
                if (this.scene.player2_hasUpgrade3) {
                    this.totalUpgrade+=1;
                    this.canSuperJump = true;
                    this.updateTransparency();
                }
            }

            if (this.canSuperJump && keyP.isDown && !this.isSuperJumping) {
                this.doSuperJump();
            }


            if (keyJ.isDown && !keyK.isDown) {
                this.setAccelerationX(-3000);
                if(!this.isPunchFrame && !this.isSpinFrame && !this.isJumpFrame && !this.isHurtFrame){
                    this.anims.play('cat2_run', false);
                }
                
                this.isFacingRight = false;
            }

            if (keyL.isDown && !keyK.isDown) {
                this.setAccelerationX(3000);
                if(!this.isPunchFrame && !this.isSpinFrame && !this.isJumpFrame && !this.isHurtFrame){
                    this.anims.play('cat2_run', false);
                }
                this.isFacingRight = true;
            }

            if (!keyJ.isDown && !keyL.isDown && !keyK.isDown) {
                this.setAccelerationX(0);
                this.setDragX(1500);
            }

            if ((keyJ.isDown || keyL.isDown) && keyK.isDown) {
                this.setAccelerationX(0);
                this.setDragX(400);
                
                
            }

            if ((!keyJ.isDown && !keyL.isDown) && keyK.isDown) {
                this.setAccelerationX(0);
                this.setDragX(400);
                
            }

            //console.log(this.isGrounded);
            if (keyI.isDown) {
                if (this.body.onFloor()) {
                    this.jumpHeld = true;
                    
                }

                if (this.jumpAmount < 1 && this.jumpHeld == false) {
                    this.jumpHeld = true;
                    this.currentJumpTime = 0;
                    this.jumpAmount++;
                    this.scene.sound.play('jump');
                    this.powerUpVfxEffect.explode();
                }
                this.doJump();

            }
            else {
                this.jumpHeld = false;

            }

            if (keyK.isDown) {

                if (!this.isSlide) {
                    this.isSlide = true;
                    this.body.setGravityY(3400);
                    if (this.isGrounded) {
                        this.y += 30;
                    }
                    this.setBodySize(200, 115, false);

                }

                if(Phaser.Math.Difference(this.body.velocity.x,0) > 100 && this.isGrounded){
                    this.slidepowerUpVfxEffect.explode();
                }
                
                this.anims.play('cat2_slide', false);

            }
            if (this.isSlide && !keyK.isDown) {
                this.isSlide = false;
                this.body.setGravityY(1200);
                this.setBodySize(200, 250, false);
                this.y -= 25;
                this.anims.play('cat2_idle', false);
            }
        }






    }
}