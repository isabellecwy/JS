class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world1", "map/lvl1.tmj");

    this.load.spritesheet("main", "character/character1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("enemy1", "character/villain_wolf.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // Step 2 : Preload any images here
    this.load.image("013img", "assets/013.png");
    this.load.image("017img", "assets/017.png");
    this.load.image("018img", "assets/018.png");
    this.load.image("019img", "assets/019.png");
    this.load.image("02img", "assets/02.png");
    this.load.image("021img", "assets/021.png");
    this.load.image("022img", "assets/022.png");
    this.load.image("028img", "assets/028.png");
    this.load.image("04img", "assets/04.png");
    this.load.image("06img", "assets/06.png");
    this.load.image("030img", "assets/30.png");
    this.load.image("firstaid1", "assets/firstaid.png");
    this.load.image("firstaid2", "assets/firstaid.png");
    this.load.image("key1", "assets/key.png");
    
  } // end of preload //

  create() {
    console.log("level1");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world1" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let Tiles013 = map.addTilesetImage("013", "013img");
    let Tiles017 = map.addTilesetImage("017", "017img");
    let Tiles018 = map.addTilesetImage("018", "018img");
    let Tiles019 = map.addTilesetImage("019", "019img");
    let Tiles02 = map.addTilesetImage("02", "02img");
    let Tiles021 = map.addTilesetImage("021", "021img");
    let Tiles022 = map.addTilesetImage("022", "022img");
    let Tiles028 = map.addTilesetImage("028", "028img");
    let Tiles04 = map.addTilesetImage("04", "04img");
    let Tiles06 = map.addTilesetImage("06", "06img");
    let Tiles030 = map.addTilesetImage("030", "030img");

    //Step 5  create an array of tiles
    let tilesArray = [
      Tiles013,
      Tiles017,
      Tiles018,
      Tiles019,
      Tiles02,
      Tiles021,
      Tiles022,
      Tiles028,
      Tiles04,
      Tiles06,
      Tiles030,
    ];

    // Step 6  Load in layers by layers
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.groundLayer1 = map.createLayer("groundLayer2", tilesArray, 0, 0);
    this.fencesLayer = map.createLayer("fencesLayer", tilesArray, 0, 0);
    this.treesLayer = map.createLayer("treesLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("buildingLayer", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
    this.wallLayer2 = map.createLayer("wallLayer2", tilesArray, 0, 0);

    // load object
    let enemy1 = map.findObject("objectLayer", (obj) => obj.name === "enemy1");
    let firstaid1 = map.findObject("objectLayer", (obj) => obj.name === "firstaid1");
    let firstaid2 = map.findObject("objectLayer", (obj) => obj.name === "firstaid2");
    let key1 = map.findObject("objectLayer", (obj) => obj.name === "key1");



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

    this.player = this.physics.add.sprite(47, 301, "main").play("main-right");
    window.player = this.player;

    this.player.body.setSize(this.player.width * 0.8, this.player.height * 0.8)

    this.groundLayer.setCollisionByExclusion(-1, true);
    this.groundLayer1.setCollisionByExclusion(-1, true);
    this.fencesLayer.setCollisionByExclusion(-1, true);
    this.treesLayer.setCollisionByExclusion(-1, true);
    // this.buildingLayer.setCollisionByExclusion(-1, true);
    this.wallLayer.setCollisionByExclusion(-1, true);
    this.wallLayer2.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.fencesLayer);
    this.physics.add.collider(this.player, this.treesLayer);
    // this.physics.add.collider(this.player, this.buildingLayer);
    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.wallLayer2);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player);

    this.enemy1 = this.physics.add.sprite(enemy1.x, enemy1.y, "enemy1");
    this.firstaid1 = this.physics.add.sprite(firstaid1.x, firstaid1.y, "firstaid1");
    this.firstaid2 = this.physics.add.sprite(firstaid2.x, firstaid2.y, "firstaid2");
    this.key1 = this.physics.add.sprite(key1.x, key1.y, "key1");

    

    this.tweens.add({
      targets: this.enemy1,
      y: 200,
      flipX: true,
      yoyo: true,
      duration: 5000,
      repeat: -1
    })

    this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy1, null, this);
    this.physics.add.overlap(this.player, this.firstaid1, this.hitFirstaid1, null, this);
    this.physics.add.overlap(this.player, this.firstaid2, this.hitFirstaid2, null, this);
    this.physics.add.overlap(this.player, this.key1, this.hitKey1, null, this);

    var level2Down = this.input.keyboard.addKey(50);

    level2Down.on(
      "down",
      function () {
        console.log("50 pressed, jump to level 2");
        this.scene.start("level2");
      },
      this
    );
  } // end of create //

  update() {
    if (
      this.player.x > 345 &&
      this.player.x < 369 &&
      this.player.y < 138 &&
      window.key1==1
    ) {
      console.log("Door1");
      this.room1();
    }
   
  
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


  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("lvl2",);
  }
 

  hitEnemy1(player, item) {
    console.log("Ouch!!!");
    this.cameras.main.shake(200);
    item.disableBody(false, false); // remove fire
    // return false;
    window.life--
    if(window.life < 1){
      this.scene.start("gameover")
    }
  }

  hitFirstaid1(player, item) {
    console.log("FirstAid1");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
    window.life++
    console.log (window.life)
  }

  hitFirstaid2(player, item) {
    console.log("FirstAid2");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
    window.life++
    console.log (window.life)
  }

  hitKey1(player, item) {
    console.log("Key1");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
    window.key1++
  }



}
  
  
  
  
  

