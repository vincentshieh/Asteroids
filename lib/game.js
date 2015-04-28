(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (args) {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ctx = args.ctx;
    this.gameView = args.gameView;
    this.ship = new Asteroids.Ship({ pos: Asteroids.Util.randomPosition(),
                                     game: this,
                                     ctx: this.ctx });
    this.health = Game.HEALTH;
    this.score = 0;
    var img = new Image();
    img.src = 'lib/background.jpg';
    this.background = img;
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 650;
  Game.NUM_ASTEROIDS = 15;
  Game.HEALTH = 3;

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid ({
        game: this,
        pos: Asteroids.Util.randomPosition(),
        ctx: this.ctx
      }));
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  };

  Game.prototype.checkCollisions = function () {
    var allObjects = this.allObjects();

    for (var i = 0; i < allObjects.length; i++) {
      if (this.health === 0) { break; }
      for (var j = 0; j < allObjects.length; j++) {
        if (this.health === 0) { break; }
        if (i !== j && allObjects[i].isCollidedWith(allObjects[j])) {
          allObjects[i].collideWith(allObjects[j]);
        }
      }
    }
  };

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.drawImage(this.background, 0, 0, 1000, 650);
    this.healthDisplay();
    this.scoreDisplay();
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].draw(ctx);
    }
    if (this.health === 0) {
      this.gameOver();
    }
  };

  Game.prototype.gameOver = function () {
    this.asteroids = [];
    this.bullets = [];
    this.gameOverDisplay();
    var that = this;
    key.unbind('space');
    key(
      'space',
      function () {
        that.addAsteroids();
        that.health = Game.HEALTH;
        that.score = 0;
        that.ship.relocate();
        key.unbind('space');
        that.gameView.start();
      }
    );
    this.gameView.stop();
  };

  Game.prototype.gameOverDisplay = function () {
    this.ctx.fillStyle = "blue";
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillText("Game Over", 430, 325);
    this.ctx.fillText("Press space for new game", 350, 350);
  };

  Game.prototype.healthDisplay = function () {
    this.ctx.fillStyle = "blue";
    this.ctx.font = "bold 16px Arial";
    this.ctx.fillText("Life Remaining: " + this.health, 20, 30);
  };

  Game.prototype.introScreen = function () {
    this.ctx.drawImage(this.background, 0, 0, 1000, 650);
    this.ctx.fillStyle = "blue";
    this.ctx.font = "bold 48px Arial";
    this.ctx.fillText("Asteroids", 430, 325);
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillText("Press space to start", 425, 350);
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

  Game.prototype.refillAsteroids = function () {
    for (var i = 10; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid ({
        game: this,
        pos: Asteroids.Util.randomBorderPosition(),
        ctx: this.ctx
      }));
    }
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

  Game.prototype.scoreDisplay = function () {
    this.ctx.fillStyle = "blue";
    this.ctx.font = "bold 16px Arial";
    this.ctx.fillText("Score: " + this.score, 20, 50);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.ship.decreaseVelocity();
    this.checkCollisions();
    if (this.asteroids.length < 11) {
      this.refillAsteroids();
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
})();
