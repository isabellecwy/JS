class gameover extends Phaser.Scene {

  constructor ()
  {
      super({ key: "gameover" });
  }

  preload() {
    this.load.image('gameover', 'assets/gameover.jpg')

}

create () {
    this.storyline = this.add.image(0, 0, 'gameover').setOrigin(0, 0);
   
    console.log("gameover");
    window.life=1
  
    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Pressed Spacebar to continue");
    this.scene.start("level1");
    }, this );

}
  
}

