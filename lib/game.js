(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({ pos: Asteroids.Util.randomPosition(), game: this });
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 5;

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({
        game: this,
        pos: Asteroids.Util.randomPosition()
      }));
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    if (pos[0] > Game.DIM_X || pos[0] < 0 || pos[1] > Game.DIM_Y || pos[1] < 0) {
        return true;
    } else {
      return false;
    }
  };

  Game.prototype.moveObjects = function () {
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].move();
    }
  };

  Game.prototype.wrap = function (pos) {
    var wrappedX, wrappedY;

    if (pos[0] % Game.DIM_X < 0) {
      wrappedX = pos[0] % Game.DIM_X + Game.DIM_X;
    } else {
      wrappedX = pos[0] % Game.DIM_X;
    }
    if (pos[1] % Game.DIM_X < 0) {
      wrappedY = pos[1] % Game.DIM_X + Game.DIM_Y;
    } else {
      wrappedY = pos[1] % Game.DIM_Y;
    }
    return [wrappedX, wrappedY];
  };

  Game.prototype.checkCollisions = function () {
    var allObjects = this.allObjects();

    for (var i = 0; i < allObjects.length; i++) {
      for (var j = 0; j < allObjects.length; j++) {
        if (i !== j && allObjects[i].isCollidedWith(allObjects[j])) {
          allObjects[i].collideWith(allObjects[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      for(var i = 0; i < this.asteroids.length; i++){
        if(this.asteroids[i] === obj){
          this.asteroids.splice(i, 1);
        }
      }
    } else if (obj instanceof Asteroids.Bullet) {
      for(var j = 0; j < this.bullets.length; j++){
        if(this.bullets[j] === obj){
          this.bullets.splice(j, 1);
        }
      }
    }
  };
})();
