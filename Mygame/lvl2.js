
class lvl2 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'lvl2' });
        window.key=0
    }

    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON("world2", "map/lvl2.tmj");

        this.load.spritesheet("main", "character/character1.png", {
            frameWidth: 64,
            frameHeight: 64,
          });

          this.load.spritesheet("enemy2", "character/villain_1.png", {
            frameWidth: 64,
            frameHeight: 64,
          });

        

        // Step 2 : Preload any images here
        this.load.image("014img", "assets/014.png");
        this.load.image("03img", "assets/03.png");
        this.load.image("04img", "assets/04.png");
        this.load.image("06img", "assets/06.png");
        this.load.image("TileAndStoneimg", "assets/TileAndStone.png");
        this.load.image("key1", "assets/key.png");
        this.load.image("key2", "assets/key2.png");
        this.load.image("key4", "assets/key4.png");
        this.load.image("key3", "assets/key3.png");
        // this.load.image("heart4", "assets/heart.png"); 
        
       
        
    } // end of preload //

    create (){

    console.log("lvl2")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world2" });
    


    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let Tiles014 = map.addTilesetImage("014", "014img");
    let Tiles03 = map.addTilesetImage("03", "03img");
    let Tiles04 = map.addTilesetImage("04", "04img");
    let Tiles06 = map.addTilesetImage("06", "06img");
    let TileAndStone = map.addTilesetImage("TileAndStone", "TileAndStoneimg");
    



    //Step 5  create an array of tiles
    let tilesArray = [
       Tiles014, Tiles03, Tiles04, Tiles06,  TileAndStone,
    ]

    // Step 6  Load in layers by layers
    this.floorLayer = map.createLayer("floorLayer",tilesArray,0,0);
    this.wallLayer = map.createLayer("wallLayer",tilesArray,0,0);
    this.decoLayer = map.createLayer("decoLayer",tilesArray,0,0);
    this.furnitureLayer = map.createLayer("furnitureLayer",tilesArray,0,0);
    this.cctvLayer = map.createLayer("cctvLayer",tilesArray,0,0);
    this.wallLayer2 = map.createLayer("wallLayer",tilesArray,0,0);

    //load object
    let enemy2 = map.findObject("objectLayer", (obj) => obj.name === "enemy2");
    let key1 = map.findObject("objectLayer", (obj) => obj.name === "key1");
    let key2 = map.findObject("objectLayer", (obj) => obj.name === "key2");
    let key3 = map.findObject("objectLayer", (obj) => obj.name === "key3");
    let key4 = map.findObject("objectLayer", (obj) => obj.name === "key4");


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
        key: "enemy2-up",
        frames: this.anims.generateFrameNumbers("enemy2", {
          start: 105,
          end: 112,
        }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "enemy2-down",
        frames: this.anims.generateFrameNumbers("enemy2", {
          start: 131,
          end: 138,
        }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.player = this.physics.add.sprite(320, 133, "main").play("main-down");
      window.player = this.player;

      this.player.body.setSize(this.player.width * 0.8, this.player.height * 0.8)
      this.player.setCollideWorldBounds(true) //dont go out the map


      // this.floorLayer.setCollisionByExclusion(-1, true);
      this.decoLayer.setCollisionByExclusion(-1, true);
      this.furnitureLayer.setCollisionByExclusion(-1, true);
      this.cctvLayer.setCollisionByExclusion(-1, true);
      this.wallLayer.setCollisionByExclusion(-1, true);
  
      // this.physics.add.collider(this.player, this.floorLayer);
      this.physics.add.collider(this.player, this.decoLayer);
      this.physics.add.collider(this.player, this.cctvLayer);
      this.physics.add.collider(this.player, this.wallLayer);
      this.physics.add.collider(this.player, this.furnitureLayer);
      
   
      this.cursors = this.input.keyboard.createCursorKeys();
    

     this.cameras.main.startFollow(this.player);

     

     this.enemy2 = this.physics.add.sprite(enemy2.x, 545, "enemy2");
     this.key1 = this.physics.add.sprite(key1.x, key1.y, "key1");
     this.key2 = this.physics.add.sprite(key2.x, key2.y, "key2");
     this.key3 = this.physics.add.sprite(key3.x, key3.y, "key3");
     this.key4 = this.physics.add.sprite(key4.x, key4.y, "key4");

     this.tweens.add({
      targets: this.enemy2,
      y: 200,
      flipY: false,
      yoyo: true,
      duration: 4000,
      repeat: -1,
      onYoyo: () => {
          this.enemy2.play ("enemy2-down")
        
      },
      onRepeat: () => {
          this.enemy2.play ("enemy2-up")
      },
     })

     

    //  this.heart4 = this.add.sprite(945, 13, "heart4");
    //  this.heart4.setDepth(1); // Set the depth to 1 (or higher if needed) to render it on top


     this.physics.add.overlap(this.player, this.enemy2, this.hitEnemy2, null, this);
     this.physics.add.overlap(this.player, this.key1, this.hitKey, null, this);
     this.physics.add.overlap(this.player, this.key2, this.hitKey, null, this);
     this.physics.add.overlap(this.player, this.key3, this.hitKey, null, this);
     this.physics.add.overlap(this.player, this.key4, this.hitKey, null, this);
     
 

    // var level1Down = this.input.keyboard.addKey(49);
    
    // level1Down.on('down', function(){
    //    console.log("49 pressed, jump to level 1");
    //        this.scene.start("level1");
    //    }, this );

    var level3down = this.input.keyboard.addKey(51);

     level3down.on(
      "down",
      function(){
        console.log("51 pressed,jump to lvl 3");
        this.scene.start("level3");
      },
      this
     );
    

    


    

     

    } // end of create //

    update () {
      if (
        this.player.x > 302 &&
        this.player.x < 345 &&
        this.player.y < 89 &&
        window.key >= 4
        ) {
        console.log("Door2");
        this.room2();
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

    //outside of update

  // Function to jump to room1
  room2(player, tile) {
    console.log("room2 function");
    this.scene.start("level3",);
  }
 

  hitEnemy2(player, item) {
    console.log("Ouch!!!");
    this.cameras.main.shake(200);
    // return false;
    window.life--
    player.x=player.x-80
    if(window.life < 1){
      this.scene.start("gameover")
    }
  //    // Hide hearts when hit
  //    if (this.heart3.visible) {
  //     this.heart3.visible = false;
  // } else if (this.heart2.visible) {
  //     this.heart2.visible = false;
  // } else if (this.heart1.visible) {
  //     this.heart1.visible = false;
  // }
  }

  hitKey(player, item) {
    console.log("Key");
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
    window.key++
  }

  
}