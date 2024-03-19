class animationcharacter extends Phaser.Scene {
  constructor() {
    super({ key: "animationcharacter" });
  }

  preload() {
    this.load.spritesheet("maincharacter", "character/character1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  } // end of preload //

  create() {
    console.log("animationcharacter");

    //My Character
    this.anims.create({
      key: "maincharacter-up",
      frames: this.anims.generateFrameNumbers("maincharacter", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "maincharacter-down",
      frames: this.anims.generateFrameNumbers("maincharacter", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "maincharacter-left",
      frames: this.anims.generateFrameNumbers("cmaincharacter", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "maincharacter-right",
      frames: this.anims.generateFrameNumbers("maincharacter", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.player = this.physics.add.sprite(300, 1100, "maincharacter");
    window.player = this.player;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player);

  } // end of create //

  update() {

    if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play("gen-left", true); // walk left
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
        this.player.anims.play("gen-right", true);
      } else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-200);
        this.player.anims.play("gen-up", true);
        //console.log('up');
      } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(200);
        this.player.anims.play("gen-down", true);
        //console.log('down');
      } else {
        this.player.anims.stop();
        this.player.body.setVelocity(0, 0);
      }
      
  } // end of update //
}
