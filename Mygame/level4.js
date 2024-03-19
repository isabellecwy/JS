class level4 extends Phaser.Scene {
  constructor() {
    super({ key: "level4" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world4", "map/hiddenlvl.tmj");

    this.load.spritesheet("main", "character/character1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // this.load.spritesheet("enemy3", "character/villain_professor.png", {
    //   frameWidth: 64,
    //   frameHeight: 64,
    // });

    // Step 2 : Preload any images here
    this.load.image("014img", "assets/014.png");
    this.load.image("06img", "assets/06.png");
    this.load.image("gather", "assets/gather_swatches_1.43.png");
    this.load.image("room", "assets/Room_Builder_32x32.png");
    this.load.image("firstaid1", "assets/firstaid.png");
    this.load.image("firstaid2", "assets/firstaid.png");
    this.load.image("firstaid3", "assets/firstaid.png");
    this.load.image("firstaid4", "assets/firstaid.png");
    this.load.image("firstaid5", "assets/firstaid.png");
    
    
    
  } // end of preload //

  create() {
    console.log("level4");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world4" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let Tiles014 = map.addTilesetImage("014", "014img");
    let Tiles06 = map.addTilesetImage("06", "06img");
    let Tilesgather = map.addTilesetImage("gather_swatches_1.43", "gather");
    let Tilesroom = map.addTilesetImage("Room_Builder_32x32", "room");
    
    
    //Step 5  create an array of tiles
    let tilesArray = [
      Tiles014,
      Tiles06,
      Tilesgather,
      Tilesroom,
     
     
     
    ];

    // Step 6  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
    this.decoLayer = map.createLayer("decoLayer", tilesArray, 0, 0);

    // load object
    // let enemy3 = map.findObject("objectLayer", (obj) => obj.name === "enemy3");
    let firstaid1 = map.findObject("objectLayer", (obj) => obj.name === "firstaid1");
    let firstaid2 = map.findObject("objectLayer", (obj) => obj.name === "firstaid2");
    let firstaid3 = map.findObject("objectLayer", (obj) => obj.name === "firstaid3");
    let firstaid4 = map.findObject("objectLayer", (obj) => obj.name === "firstaid4");
    let firstaid5 = map.findObject("objectLayer", (obj) => obj.name === "firstaid5");

    






    // console.log("animationcharacter");

    //My Character
    this.anims.create({
      key: "main-up",
      frames: this.anims.generateFrameNumbers("main", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "main-down",
      frames: this.anims.generateFrameNumbers("main", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "main-left",
      frames: this.anims.generateFrameNumbers("main", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "main-right",
      frames: this.anims.generateFrameNumbers("main", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });

    

    this.player = this.physics.add.sprite(81, 566, "main").play("main-right");
    window.player = this.player;

    this.player.body.setSize(this.player.width * 0.8, this.player.height * 0.8)

    // this.player.setCollideWorldBounds(true);

    
    this.wallLayer.setCollisionByExclusion(-1, true);
    this.groundLayer.setCollisionByExclusion(-1, true);
   

    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.wallLayer);
    

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player);

    // this.enemy3 = this.physics.add.sprite(enemy3.x, enemy3.y, "enemy3");
    this.firstaid1 = this.physics.add.sprite(firstaid1.x, firstaid1.y, "firstaid1");
    this.firstaid2 = this.physics.add.sprite(firstaid2.x, firstaid2.y, "firstaid2");
    this.firstaid3 = this.physics.add.sprite(firstaid3.x, firstaid3.y, "firstaid3");
    this.firstaid4 = this.physics.add.sprite(firstaid4.x, firstaid4.y, "firstaid4");
    this.firstaid5 = this.physics.add.sprite(firstaid5.x, firstaid5.y, "firstaid5");
    

    // this.tweens.add({
    //   targets: this.enemy3,
    //   x: 979,
    //   // flipX: true,
    //   yoyo: true,
    //   duration: 2000,
    //   repeat: -1
    // })

    // this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy3, null, this);
    this.physics.add.overlap(this.player, this.firstaid1, this.hitFirstaid1, null, this);
    this.physics.add.overlap(this.player, this.firstaid2, this.hitFirstaid2, null, this);
    this.physics.add.overlap(this.player, this.firstaid3, this.hitFirstaid3, null, this);
    this.physics.add.overlap(this.player, this.firstaid4, this.hitFirstaid4, null, this);
    this.physics.add.overlap(this.player, this.firstaid5, this.hitFirstaid5, null, this);
    


   
  } // end of create //

  update() {
    // if (
    //   this.player.x > 598 &&
    //   this.player.x < 614 &&
    //   this.player.y < 857
    // ) {
    //   console.log("Door3");
    //   this.room3();
    // }
  
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("main-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("main-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("main-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("main-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }

} // end of update //

 

  // hitEnemy3(player, item) {
  //   console.log("Ouch!!!");
  //   // this.cameras.main.shake(200);
  //   // return false;
  // }


  hitFirstaid1(player, item) {
    console.log("FirstAid1");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
  }

  hitFirstaid2(player, item) {
    console.log("FirstAid2");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
  }

  hitFirstaid3(player, item) {
    console.log("FirstAid3");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
  }

  hitFirstaid4(player, item) {
    console.log("FirstAid4");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
  }

  hitFirstaid5(player, item) {
    console.log("FirstAid5");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
  }

  


}
  
  
  
  
  

