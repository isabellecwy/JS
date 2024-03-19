class instruction extends Phaser.Scene {

  constructor ()
  {
      super({ key: "instruction" });
  }

  preload() {
    this.load.image('instruction', 'assets/instruction.jpg')

}

create () {
    this.instruction = this.add.image(0, 0, 'instruction').setOrigin(0, 0);
   
    console.log("instruction");
  
    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Pressed Spacebar to continue");
    this.scene.start("level1");
    }, this );

}
  
}

