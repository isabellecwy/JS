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

    this.load.spritesheet("enemy3", "character/villain_2.png", {
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
    this.wallLayer2 = map.createLayer("wallLayer2", tilesArray, 0, 0);
    this.spiderLayer = map.createLayer("spiderLayer", tilesArray, 0, 0);

    // load object
    let enemy3 = map.findObject("objectLayer", (obj) => obj.name === "enemy3");
    let firstaid3 = map.findObject("objectLayer", (obj) => obj.name === "firstaid3");
    // let firstaid4 = map.findObject("objectLayer", (obj) => obj.name === "firstaid4");
    // let firstaid5 = map.findObject("objectLayer", (obj) => obj.name === "firstaid5");
    // let firstaid6 = map.findObject("objectLayer", (obj) => obj.name === "firstaid6");
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

    
    

    this.anims.create({
      key: "enemy3-left",
      frames: this.anims.generateFrameNumbers("enemy3", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy3-right",
      frames: this.anims.generateFrameNumbers("enemy3", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });

   


    this.anims.create({
      key: "enemy3-up",
      frames: this.anims.generateFrameNumbers("enemy3", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy3-down",
      frames: this.anims.generateFrameNumbers("enemy3", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });
  


    

    

    this.player = this.physics.add.sprite(79, 277, "main").play("main-right");
    window.player = this.player;

    this.player.body.setSize(this.player.width * 0.7, this.player.height * 0.6)

    this.physics.world.bounds.width = this.floorLayer.width;
    this.physics.world.bounds.height = this.floorLayer.height;
    this.player.setCollideWorldBounds(true) //dont go out the map

    // this.player.setCollideWorldBounds(true);

    this.floorLayer.setCollisionByExclusion(-1, true);
    this.wallLayer.setCollisionByExclusion(-1, true);
   

    this.physics.add.collider(this.player, this.floorLayer);
    this.physics.add.collider(this.player, this.wallLayer);
    

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player);

    this.firstaid3 = this.physics.add.sprite(firstaid3.x, firstaid3.y, "firstaid3");
    // this.firstaid4 = this.physics.add.sprite(firstaid4.x, firstaid4.y, "firstaid4");
    // this.firstaid5 = this.physics.add.sprite(firstaid5.x, firstaid5.y, "firstaid5");
    // this.firstaid6 = this.physics.add.sprite(firstaid6.x, firstaid6.y, "firstaid6");
    this.firstaid7 = this.physics.add.sprite(firstaid7.x, firstaid7.y, "firstaid7");
    this.ulti = this.physics.add.sprite(ulti.x, ulti.y, "ulti");


    this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy3, null, this);
    this.physics.add.overlap(this.player, this.firstaid3, this.hitFirstaid3, null, this);
    // this.physics.add.overlap(this.player, this.firstaid4, this.hitFirstaid4, null, this);
    // this.physics.add.overlap(this.player, this.firstaid5, this.hitFirstaid5, null, this);
    // this.physics.add.overlap(this.player, this.firstaid6, this.hitFirstaid6, null, this);
    this.physics.add.overlap(this.player, this.firstaid7, this.hitFirstaid7, null, this);
    this.physics.add.overlap(this.player, this.ulti, this.hitUlti, null, this);

   

   
   
    // this.tweens.add({
    //   targets: this.enemy3,
    //   x: 200,
    //   flipX: true,
    //   yoyo: true,
    //   duration: 5000,
    //   repeat: -1,
    //   onYoyo: () => {
    //       this.enemy3.play ("enemy3-left")
        
    //   },
    //   onRepeat: () => {
    //       this.enemy3.play ("enemy3-right")
    //   },
    //  })

     var level3down = this.input.keyboard.addKey(51);

     level3down.on(
      "down",
      function(){
        console.log("51 pressed,jump to level 3");
        this.scene.start("level3");
      },
      this
     );

      this.floorLayer.setPipeline('Light2D').setAlpha(0.1);
        this.wallLayer.setPipeline('Light2D').setAlpha(0.1);
        this.wallLayer2.setPipeline('Light2D').setAlpha(0.1);
        this.spiderLayer.setPipeline('Light2D').setAlpha(0.1);
        this.firstaid3.setPipeline('Light2D').setAlpha(0.1);
        this.firstaid7.setPipeline('Light2D').setAlpha(0.1);
        this.ulti.setPipeline('Light2D').setAlpha(0.1);


        this.lights.enable();
        this.lights.setAmbientColor(0x080808);
        this.spotlight=this.lights.addLight(this.player.x, this.player.y).setRadius(300,300).setIntensity(20);



    
  } // end of create //

  update() {

    this.spotlight.x=this.player.x+2;
    this.spotlight.y=this.player.y-2;

    if (
      this.player.x > 589 &&
      this.player.x < 617 &&
      this.player.y > 832 &&
      this.player.y < 848 
      ) {
      console.log("Door3");
      this.room3();
    }

    if (
      // this.player.x > 1244 &&
      this.player.x > 1201 &&
      this.player.y > 307 &&
      this.player.y < 364 
      ) {
      console.log("Door4");
      this.room4();
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
  room3(player, tile) {
    console.log("room3 function");
    this.scene.start("level4",);
  }

  room4(player, tile) {
    console.log("room4 function");
    this.scene.start("win",);
  }
 

  // hitEnemy3(player, item) {
  //   console.log("Ouch!!!");
  //   // this.cameras.main.shake(200);
  //   // return false;
  // }

  hitEnemy3(player, item) {
    console.log("Ouch!!!");
    this.cameras.main.shake(200);
    // return false;
    window.life--
    player.x=player.x-80
    if(window.life < 1){
      this.scene.start("gameover")
    }
  }

  hitFirstaid3(player, item) {
    console.log("FirstAid3");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
    window.life++
    console.log ("life:",window.life)
    // Check which heart to make visible based on the player's life
    // this.updateHeartsVisibility();
  }

  // hitFirstaid4(player, item) {
  //   console.log("FirstAid4");
  //   // this.cameras.main.shake(200);
  //   item.disableBody(true, true); // remove fire
  //   window.life++
  //   console.log ("life:",window.life)
  //   // Check which heart to make visible based on the player's life
  //   // this.updateHeartsVisibility();
  // }

  // hitFirstaid5(player, item) {
  //   console.log("FirstAid5");
  //   // this.cameras.main.shake(200);
  //   item.disableBody(true, true); // remove fire
  //   window.life++
  //   console.log ("life:",window.life)
  //   // Check which heart to make visible based on the player's life
  //   this.updateHeartsVisibility();
  // }

  // hitFirstaid6(player, item) {
  //   console.log("FirstAid6");
  //   // this.cameras.main.shake(200);
  //   item.disableBody(true, true); // remove fire
  //   window.life++
  //   console.log ("life:",window.life)
  //   // Check which heart to make visible based on the player's life
  // //   this.updateHeartsVisibility();
  // }

  hitFirstaid7(player, item) {
    console.log("FirstAid7");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
    window.life++
    console.log ("life:",window.life)
    // Check which heart to make visible based on the player's life
    // this.updateHeartsVisibility();
  }

  hitUlti(player, item) {
    console.log("Ulti Get Out Now");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
    window.life++
    console.log ("life:",window.life)
    // Check which heart to make visible based on the player's life
    // this.updateHeartsVisibility();
  }

  // Function to update hearts visibility based on player's life
  // updateHeartsVisibility() {
  //   if (window.life === 1) {
  //     this.heart1.visible = true;
  //   } else if (window.life === 2) {
  //     this.heart2.visible = true;
  //   }
  // }

  // hideHearts() {
  //   if (this.heart2.visible) {
  //     this.heart2.visible = false;
  //   } else if (this.heart1.visible) {
  //     this.heart1.visible = false;
  //   }
  // }


}
  
  
  
  
  

