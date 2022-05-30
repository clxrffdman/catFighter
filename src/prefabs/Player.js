class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, baseJump, isPlayerOne) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOffset(1,1);
        this.scene = scene;
        this.minJump = baseJump;
        this.isGrounded = false;
        this.setScale(1);
        //this.setBounce(1, 1);
        // this.setCollideWorldBounds(true);
        // this.body.onWorldBounds = true;
        this.body.setGravityY(1200);
        this.maxJumpTime = 20;
        this.currentJumpTime = 0;
        this.jumpHeld = false;
        this.isSlide = false;
        this.jumpAmount = 0;
        this.jumpVelocity = 330;
        //this.setBodySize(600,300,false);
        this.isPlayerOneS = isPlayerOne;
        this.isFacingRight = true;
        this.setBodySize(50,100,true);
        this.isPunching = false;
        this.isSuperJumping = false;
        this.isSpinning = false;

        this.setMaxVelocity(600,1000);
        this.canPunch = false;
        this.canSuperJump = false;
        this.canSpin = false;
        
    }

    doJump(){

        if(this.isGrounded){
            this.setVelocityY(-this.jumpVelocity);
            this.scene.sound.play('jump');
            
        }
        else{
            this.currentJumpTime++;
        }

        if(this.jumpHeld && (this.body.velocity.y < 0 || this.jumpAmount < 2) && this.currentJumpTime < this.maxJumpTime){
            this.setVelocityY(-this.jumpVelocity);
            this.scene.sound.play('jump');
            //this.setVelocity(0, -300 + (50*((this.maxJumpTime - this.currentJumpTime)/this.maxJumpTime)));
        }

        
        this.isGrounded = false;
    }

    doSuperJump(){
        this.isSuperJumping = true;
        this.setVelocityY(-800);
        this.setAccelerationY(-300);
        this.scene.sound.play('jump');
        this.timedEvent = this.scene.time.delayedCall(500, this.endJump, [], this);
        this.timedEvent = this.scene.time.delayedCall(3000, this.stopSuperJumping, [], this);
    }

    endJump(){
        this.setAccelerationY(0);
    }


    doSpin(){
        this.isSpinning = true;
        this.spin = new Spin(this.scene, this.x, this.y, 'circleHitbox', Phaser.AUTO, this, true).setOrigin(0.5,0.5).setScale(2.75);
        if(this.isPlayerOneS){
            this.scene.hitboxesP1.add(this.spin);
        }
        else{
            this.scene.hitboxesP2.add(this.spin);
        }
        this.timedEvent = this.scene.time.delayedCall(3000, this.stopSpinning, [], this);
    }

    stopSpinning(){
        this.isSpinning = false;
    }

    stopSuperJumping(){
        this.isSuperJumping = false;
        
    }

    modifyJumpHeight(arg){
        this.jumpVelocity = arg;
    }

    doPunch(){
        this.isPunching = true;
        if(this.isFacingRight){
            this.punch = new Punch(this.scene, this.x, this.y, 'punch', Phaser.AUTO, this, true).setOrigin(-0.5,0.5).setScale(1.75);
            if(this.isPlayerOneS){
                this.scene.hitboxesP1.add(this.punch);
            }
            else{
                this.scene.hitboxesP2.add(this.punch);
            }
            
        }
        else{
            this.punch = new Punch(this.scene, this.x, this.y, 'punch', Phaser.AUTO, this, true).setOrigin(1.4,0.5).setScale(1.75);;
            if(this.isPlayerOneS){
                this.scene.hitboxesP1.add(this.punch);
            }
            else{
                this.scene.hitboxesP2.add(this.punch);
            }
            this.punch.flipX = true;
            
        }

        this.timedEvent = this.scene.time.delayedCall(500, this.stopPunching, [], this);
    }
    
    stopPunching(){
        this.isPunching = false;
    }

    update(){

        

        if(this.isPunching){
            this.punch.update();
        }

        if(this.isSpinning){
            this.spin.update();
        }
        // if(this.scene.isGround){
        //     this.isGrounded = true;
        // }
        if(this.body.onWall()){
            //console.log("set speed to 0");
            this.scene.speed = 0;
        }
        if(this.body.onFloor()){
            this.isGrounded = true;
            this.currentJumpTime = 0;
            this.jumpAmount = 0;
        }

        if(this.isFacingRight){
            this.flipX = false;
        }
        else{
            this.flipX = true;
        }

        if(this.isPlayerOneS){

            //punch
            if(!this.canPunch){
                if(this.scene.player1_hasUpgrade1){
                    this.canPunch = true;
                }
            }

            if(this.canPunch && keyE.isDown && !this.isPunching){
                this.doPunch();
            }

            //spin
            if(!this.canSpin){
                if(this.scene.player1_hasUpgrade4){
                    this.canSpin = true;
                }
            }

            if(this.canSpin && keyF.isDown && !this.isSpinning){
                this.doSpin();
            }

            //super jump
            if(!this.canSuperJump){
                if(this.scene.player1_hasUpgrade3){
                    this.canSuperJump = true;
                }
            }

            if(this.canSuperJump && keyR.isDown && !this.isSuperJumping){
                this.doSuperJump();
            }

            
            if(keyA.isDown){
                this.setAccelerationX(-3000);
                this.isFacingRight = false;
            }
    
            if(keyD.isDown){
                this.setAccelerationX(3000);
                this.isFacingRight = true;
            }
    
            if(!keyA.isDown && !keyD.isDown && !keyS.isDown){
                this.setAccelerationX(0);
                this.setDragX(1500);
            }

            if((keyA.isDown || keyD.isDown) && keyS.isDown){
                this.setAccelerationX(0);
                this.setDragX(400);
            }

            if((!keyA.isDown && !keyD.isDown) && keyS.isDown){
                this.setAccelerationX(0);
                this.setDragX(400);
            }
            //console.log(this.isGrounded);
            if(keyW.isDown){
                if(this.body.onFloor()){
                    this.jumpHeld = true;
                }
    
                if(this.jumpAmount < 1 && this.jumpHeld == false){
                    this.jumpHeld = true;
                    this.currentJumpTime = 0;
                    this.jumpAmount++;
                }
                this.doJump();
                
            }
            else{
                this.jumpHeld = false;
                
            }

            if(keyS.isDown && !this.isSlide){
                this.isSlide = true;
                this.body.setGravityY(3400);
                this.setBodySize(50,50,false);
            }
            if(this.isSlide && !keyS.isDown){
                this.isSlide = false;
                this.body.setGravityY(1200);
                this.setBodySize(50,100,false);
                this.y -= 50;
            }
        }
        else{

            if(!this.canPunch){
                if(this.scene.player2_hasUpgrade1){
                    this.canPunch = true;
                }
            }

            if(this.canPunch && keyO.isDown && !this.isPunching){
                this.doPunch();
            }

            //spin
            if(!this.canSpin){
                if(this.scene.player2_hasUpgrade4){
                    this.canSpin = true;
                }
            }

            if(this.canSpin && keySemicolon.isDown && !this.isSpinning){
                this.doSpin();
            }

            //super jump
            if(!this.canSuperJump){
                if(this.scene.player2_hasUpgrade3){
                    this.canSuperJump = true;
                }
            }

            if(this.canSuperJump && keyP.isDown && !this.isSuperJumping){
                this.doSuperJump();
            }


            if(keyJ.isDown && !keyK.isDown){
                this.setAccelerationX(-3000);
                this.isFacingRight = false;
            }
    
            if(keyL.isDown && !keyK.isDown){
                this.setAccelerationX(3000);
                this.isFacingRight = true;
            }
    
            if(!keyJ.isDown && !keyL.isDown && !keyK.isDown){
                this.setAccelerationX(0);
                this.setDragX(1500);
            }

            if((keyJ.isDown || keyL.isDown) && keyK.isDown){
                this.setAccelerationX(0);
                this.setDragX(400);
            }

            if((!keyJ.isDown && !keyL.isDown) && keyK.isDown){
                this.setAccelerationX(0);
                this.setDragX(400);
            }

            //console.log(this.isGrounded);
            if(keyI.isDown){
                if(this.body.onFloor()){
                    this.jumpHeld = true;
                }
    
                if(this.jumpAmount < 1 && this.jumpHeld == false){
                    this.jumpHeld = true;
                    this.currentJumpTime = 0;
                    this.jumpAmount++;
                }
                this.doJump();
                
            }
            else{
                this.jumpHeld = false;
                
            }

            if(keyK.isDown && !this.isSlide){
                this.isSlide = true;
                this.body.setGravityY(3400);
                this.setBodySize(50,50,false);
            }
            if(this.isSlide && !keyK.isDown){
                this.isSlide = false;
                this.body.setGravityY(1200);
                this.setBodySize(50,100,false);
                this.y -= 50;
            }
        }

        

        


    }
}