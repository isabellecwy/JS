class welcome extends Phaser.Scene {

  constructor ()
  {
      super({ key: "welcome" });
  }

  preload() {
    this.load.image('welcome', 'assets/welcome.jpg')

}

create () {
    this.welcome = this.add.image(0, 0, 'welcome').setOrigin(0, 0);
   
    console.log("welcome");
  
    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Pressed Spacebar to continue");
    this.scene.start("storyline");
    }, this );

}
  
}

