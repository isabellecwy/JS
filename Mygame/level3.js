class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world3", "map/lvl3.tmj");

    this.load.spritesheet("main", "character/character1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("enemy3", "character/villain_professor.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // Step 2 : Preload any images here
    this.load.image("014img", "assets/014.png");
    this.load.image("017img", "assets/017.png");
    this.load.image("04img", "assets/04.png");
    this.load.image("03img", "assets/03.png");
    this.load.image("TileAndStoneimg", "assets/TileAndStone.png");
    this.load.image("06img", "assets/06.png");
    this.load.image("firstaid3", "assets/firstaid.png");
    this.load.image("firstaid4", "assets/firstaid.png");
    this.load.image("firstaid5", "assets/firstaid.png");
    this.load.image("firstaid6", "assets/firstaid.png");
    this.load.image("firstaid7", "assets/firstaid.png");
    this.load.image("ulti", "assets/ultifirstaid.png");
    
  } // end of preload //

  create() {
    console.log("level3");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world3" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let Tiles014 = map.addTilesetImage("014", "014img");
    let Tiles017 = map.addTilesetImage("017", "017img");
    let Tiles03 = map.addTilesetImage("03", "03img");
    let Tiles04 = map.addTilesetImage("04", "04img");
    let TileAndStone = map.addTilesetImage("TileAndStone", "TileAndStoneimg");
    let Tiles06 = map.addTilesetImage("06", "06img");
    
    //Step 5  create an array of tiles
    let tilesArray = [
      Tiles014,
      Tiles017,
      Tiles03,
      Tiles04,
      TileAndStone,
      Tiles06
     
    ];

    // Step 6  Load in layers by layers
    this.floorLayer = map.createLayer("floorLayer", tilesArray, 0, 0);
    this.wallLayer = map.createLayer("wallLayer", tilesArray, 0, 0);
    this.wallLayer2 = map.createLayer("wallLayer", tilesArray, 0, 0);
    this.spiderLayer = map.createLayer("spiderLayer", tilesArray, 0, 0);

    // load object
    let enemy3 = map.findObject("objectLayer", (obj) => obj.name === "enemy3");
    let firstaid3 = map.findObject("objectLayer", (obj) => obj.name === "firstaid3");
    let firstaid4 = map.findObject("objectLayer", (obj) => obj.name === "firstaid4");
    let firstaid5 = map.findObject("objectLayer", (obj) => obj.name === "firstaid5");
    let firstaid6 = map.findObject("objectLayer", (obj) => obj.name === "firstaid6");
    let firstaid7 = map.findObject("objectLayer", (obj) => obj.name === "firstaid7");
    let ulti = map.findObject("objectLayer", (obj) => obj.name === "ulti");






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

    

    this.player = this.physics.add.sprite(79, 277, "main").play("main-right");
    window.player = this.player;

    this.player.body.setSize(this.player.width * 0.8, this.player.height * 0.8)

    // this.player.setCollideWorldBounds(true);

    this.floorLayer.setCollisionByExclusion(-1, true);
    this.wallLayer.setCollisionByExclusion(-1, true);
   

    this.physics.add.collider(this.player, this.floorLayer);
    this.physics.add.collider(this.player, this.wallLayer);
    

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player);

    this.enemy3 = this.physics.add.sprite(enemy3.x, enemy3.y, "enemy3");
    this.firstaid3 = this.physics.add.sprite(firstaid3.x, firstaid3.y, "firstaid3");
    this.firstaid4 = this.physics.add.sprite(firstaid4.x, firstaid4.y, "firstaid4");
    this.firstaid5 = this.physics.add.sprite(firstaid5.x, firstaid5.y, "firstaid5");
    this.firstaid6 = this.physics.add.sprite(firstaid6.x, firstaid6.y, "firstaid6");
    this.firstaid7 = this.physics.add.sprite(firstaid7.x, firstaid7.y, "firstaid7");
    this.ulti = this.physics.add.sprite(ulti.x, ulti.y, "ulti");

    this.tweens.add({
      targets: this.enemy3,
      x: 979,
      // flipX: true,
      yoyo: true,
      duration: 2000,
      repeat: -1
    })

    this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy3, null, this);
    this.physics.add.overlap(this.player, this.firstaid3, this.hitFirstaid3, null, this);
    this.physics.add.overlap(this.player, this.firstaid4, this.hitFirstaid4, null, this);
    this.physics.add.overlap(this.player, this.firstaid5, this.hitFirstaid5, null, this);
    this.physics.add.overlap(this.player, this.firstaid6, this.hitFirstaid6, null, this);
    this.physics.add.overlap(this.player, this.firstaid7, this.hitFirstaid7, null, this);
    this.physics.add.overlap(this.player, this.ulti, this.hitUlti, null, this);


    
  } // end of create //

  update() {
    
  
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
 

  // hitEnemy3(player, item) {
  //   console.log("Ouch!!!");
  //   // this.cameras.main.shake(200);
  //   // return false;
  // }

  hitEnemy3(player, item) {
    console.log("Ouch!!!");
    // this.cameras.main.shake(200);
    // item.disableBody(true, true); // remove fire
  }

  hitFirstaid3(player, item) {
    console.log("FirstAid3");
    // this.cameras.main.shake(200);
    // item.disableBody(true, true); // remove fire
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

  hitFirstaid6(player, item) {
    console.log("FirstAid6");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
  }

  hitFirstaid7(player, item) {
    console.log("FirstAid7");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
  }

  hitUlti(player, item) {
    console.log("Ulti !!!");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
  }


}
  
  
  
  
  

