(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(){
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({ pos: Asteroids.Util.randomPosition(), game: this });
  };
  Game.DIM_X = 1000;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 5;
  Game.prototype.addAsteroids = function(){
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
      this.asteroids.push(new Asteroids.Asteroid({ game: this, pos: Asteroids.Util.randomPosition() }));
    }
  };


  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects[i].draw(ctx);
    }
  };


  Game.prototype.moveObjects = function(){
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].move();
    }
  };

  Game.prototype.wrap = function (pos) {
    if(pos[0] % Game.DIM_X < 0){
      var wrappedX = pos[0] % Game.DIM_X + Game.DIM_X;
    }else{
      var wrappedX = pos[0] % Game.DIM_X;
    }
    if(pos[1] % Game.DIM_X < 0){
      var wrappedY = pos[1] % Game.DIM_X + Game.DIM_Y;
    }else{
      var wrappedY = pos[1] % Game.DIM_Y;
    }
    return [wrappedX, wrappedY];
  };

  Game.prototype.checkCollisions = function () {
    for(var i = 0; i < this.allObjects().length; i++) {
      for(var j = 0; j < this.allObjects().length; j++) {
        if(i !== j && this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(asteroid) {
    for(var i = 0; i < this.asteroids.length; i++){
      if(this.asteroids[i] === asteroid){
        this.asteroids.splice(i,1);
      }
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]);
  };
})();
