class UpgradeCollectable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, upgradeIndex) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        
        this.upgradeType = upgradeIndex;
        
    }

    update(){

        


    }
}