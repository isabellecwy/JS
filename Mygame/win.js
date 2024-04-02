class win extends Phaser.Scene {

  constructor ()
  {
      super({ key: "win" });
  }

  preload() {
    this.load.image('win', 'assets/win.jpg')

}

create () {
    this.storyline = this.add.image(0, 0, 'win').setOrigin(0, 0);
   
    console.log("win");
   
    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Pressed Spacebar to continue");
    this.scene.start("welcome");
    }, this );

}
  
}

