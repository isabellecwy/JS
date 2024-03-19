class HTP extends Phaser.Scene {

  constructor ()
  {
      super({ key: "HTP" });
  }

  preload() {
    this.load.image('HTP', 'assets/HTP.jpg')

}

create () {
    this.HTP = this.add.image(0, 0, 'HTP').setOrigin(0, 0);
   
    console.log("HTP");
  
    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Pressed Spacebar to continue");
    this.scene.start("instruction");
    }, this );

}
  
}

