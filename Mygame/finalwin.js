class finalwin extends Phaser.Scene {

  constructor ()
  {
      super({ key: "finalwin" });
  }

  preload() {
    this.load.image('finalwin', 'assets/win1.jpg')

}

create () {
    this.storyline = this.add.image(0, 0, 'finalwin').setOrigin(0, 0);
   
    console.log("finalwin");
   
    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Pressed Spacebar to continue");
    this.scene.start("welcome");
    }, this );

}
  
}

