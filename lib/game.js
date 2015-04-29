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
    this.ship = new Asteroids.Ship({
      pos: Asteroids.Util.randomPosition(),
      game: this,
      ctx: this.ctx
    });
    this.health = Game.HEALTH;
    this.score = 0;
    this.powerup = new Asteroids.Powerup({
      pos: Asteroids.Util.randomBorderPosition(),
      game: this,
      ctx: this.ctx
    });
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 650;
  Game.NUM_ASTEROIDS = 10;
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
    return this.asteroids.concat([this.ship]).concat(this.bullets).concat([this.powerup]);
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
    this.healthDisplay();
    this.scoreDisplay();
    this.radialAmmoDisplay();
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
        that.ship.radialAmmo = 0;
        key.unbind('space');
        that.gameView.start();
      }
    );
    this.gameView.stop();
  };

  Game.prototype.gameOverDisplay = function () {
    this.ctx.fillStyle = "#800000";
    this.ctx.font = "bold 48px Orbitron";
    this.ctx.fillText("Game Over", 350, 325);
    this.ctx.font = "bold 36px Orbitron";
    this.ctx.fillText("Press space for new game", 230, 380);
  };

  Game.prototype.healthDisplay = function () {
    this.ctx.fillStyle = "green";
    this.ctx.font = "bold 24px Orbitron";
    this.ctx.fillText("Life Remaining: " + this.health, 30, 50);
  };

  Game.prototype.introScreen = function () {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 72px Orbitron";
    this.ctx.fillText("Asteroids", 327, 150);
    this.ctx.font = "bold 24px Orbitron";
    this.ctx.fillText("Press space to start", 388, 200);
    this.ctx.fillText("Navigate: arrow keys", 378, 500);
    this.ctx.fillText("Fire: space", 443, 530);
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
    for (var i = 0; i < 5; i++) {
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
    } else if (obj instanceof Asteroids.Powerup) {
      this.powerup = new Asteroids.Powerup({
        pos: Asteroids.Util.randomBorderPosition(),
        game: this,
        ctx: this.ctx
      });
    }
  };

  Game.prototype.scoreDisplay = function () {
    this.ctx.fillStyle = "blue";
    this.ctx.font = "bold 24px Orbitron";
    this.ctx.fillText("Score: " + this.score, 30, 80);
  };

  Game.prototype.radialAmmoDisplay = function () {
    var image = document.createElement('img');
    image.src = "lib/powerup.png";
    ctx.beginPath();
    ctx.arc(
      30,
      110,
      20,
      0,
      2 * Math.PI);
    ctx.drawImage(image,
                  30,
                  95,
                  40,
                  40);
    this.ctx.fillStyle = "purple";
    this.ctx.font = "bold 24px Orbitron";
    this.ctx.fillText("Radial Ammo (Fire: Z): " + this.ship.radialAmmo, 70, 123);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.ship.decreaseVelocity();
    this.checkCollisions();
    if (this.asteroids.length <= Game.NUM_ASTEROIDS - 5) {
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
