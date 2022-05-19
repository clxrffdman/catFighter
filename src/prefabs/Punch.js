class Punch extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, baseJump, isPlayerOne) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOffset(1,1);
        this.scene = scene;

        this.timedEvent = this.scene.time.delayedCall(500, this.killPunch, [], this);
        
    }
    
    killPunch(){
        this.destroy();
    }


    update(){

        
        

        

        // if(keyS.isDown && !this.isSlide){
        //     this.isSlide = true;
        //     this.body.setGravityY(3400);
        //     this.setBodySize(600,250,false);
        // }
        // if(this.isSlide && !keyDOWN.isDown){
        //     this.isSlide = false;
        //     this.body.setGravityY(1200);
        //     this.setBodySize(600,300,false);
        //     this.y -= 15;
        // }


    }
}