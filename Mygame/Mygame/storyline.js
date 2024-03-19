class storyline extends Phaser.Scene {

  constructor ()
  {
      super({ key: "storyline" });
  }

  preload() {
    this.load.image('storyline', 'assets/storyline.jpg')

}

create () {
    this.storyline = this.add.image(0, 0, 'storyline').setOrigin(0, 0);
   
    console.log("storyline");
  
    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Pressed Spacebar to continue");
    this.scene.start("HTP");
    }, this );

}
  
}

