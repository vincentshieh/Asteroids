(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (args) {
    this.asteroids = [];
    this.bullets = [];
    this.score = 0;
    this.addAsteroids();
    this.ctx = args.ctx;
    this.gameView = args.gameView;
    this.ship = new Asteroids.Ship({
      pos: Asteroids.Util.randomPosition(),
      game: this,
      ctx: this.ctx
    });
    this.health = Game.INITIAL_HEALTH;
    this.powerups = [this.addPowerup()];
    this.healthkits = [this.addHealthkit()];
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 650;
  Game.INITIAL_HEALTH = 3;

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.numAsteroids(); i++) {
      this.asteroids.push(new Asteroids.Asteroid ({
        game: this,
        pos: Asteroids.Util.randomPosition(),
        ctx: this.ctx
      }));
    }
  };

  Game.prototype.addHealthkit = function () {
    return new Asteroids.Healthkit({
      pos: Asteroids.Util.randomBorderPosition(),
      game: this,
      ctx: this.ctx
    });
  };

  Game.prototype.addPowerup = function () {
    return new Asteroids.Powerup({
      pos: Asteroids.Util.randomBorderPosition(),
      game: this,
      ctx: this.ctx
    });
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(
      [this.ship]).concat(
       this.bullets).concat(
       this.powerups).concat(
       this.healthkits);
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
    this.levelDisplay();
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
    this.powerups = [this.addPowerup()];
    this.healthkits = [this.addHealthkit()];
    this.gameOverDisplay();
    var that = this;
    key.unbind('space');
    key(
      'space',
      function () {
        that.score = 0;
        that.addAsteroids();
        that.health = Game.INITIAL_HEALTH;
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

  Game.prototype.level = function () {
    var score = this.score;
    if (score < 1000) {
      return 1;
    } else if (score < 2500) {
      return 2;
    } else if (score < 5000) {
      return 3;
    } else if (score < 10000) {
      return 4;
    } else {
      return 5;
    }
  };

  Game.prototype.levelDisplay = function () {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 24px Orbitron";
    this.ctx.fillText("Level: " + this.level(), 30, 160);
  };

  Game.prototype.moveObjects = function () {
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].move();
    }
  };

  Game.prototype.numAsteroids = function () {
    switch (this.level()) {
      case 1:
          return 5;
      case 2:
          return 10;
      case 3:
          return 15;
      case 4:
          return 20;
      case 5:
          return 25;
    }
  };

  Game.prototype.numItems = function () {
    switch (this.level()) {
      case 1:
          return 1;
      case 2:
          return 2;
      case 3:
          return 3;
      case 4:
          return 4;
      case 5:
          return 5;
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

  Game.prototype.refillHealthkits = function () {
    var healthkits = this.healthkits;
    for (var i = healthkits.length; i < this.numItems(); i++) {
      this.healthkits.push(this.addHealthkit());
    }
  };

  Game.prototype.refillPowerups = function () {
    var powerups = this.powerups;
    for (var i = powerups.length; i < this.numItems(); i++) {
      this.powerups.push(this.addPowerup());
    }
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      for (var i = 0; i < this.asteroids.length; i++) {
        if (this.asteroids[i] === obj) {
          this.asteroids.splice(i, 1);
        }
      }
    } else if (obj instanceof Asteroids.Bullet) {
      for (var j = 0; j < this.bullets.length; j++) {
        if (this.bullets[j] === obj) {
          this.bullets.splice(j, 1);
        }
      }
    } else if (obj instanceof Asteroids.Powerup) {
      for (var k = 0; k < this.powerups.length; k++) {
        if (this.powerups[k] === obj) {
          this.powerups.splice(k, 1);
        }
      }
    } else if (obj instanceof Asteroids.Healthkit) {
      for (var l = 0; l < this.healthkits.length; l++) {
        if (this.healthkits[l] === obj) {
          this.healthkits.splice(l, 1);
        }
      }
    }
  };

  Game.prototype.scoreDisplay = function () {
    this.ctx.fillStyle = "blue";
    this.ctx.font = "bold 24px Orbitron";
    this.ctx.fillText("Score: " + this.score, 30, 80);
  };

  Game.prototype.radialAmmoDisplay = function () {
    var image = document.createElement('img');
    image.src = "images/powerup.png";
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
    if (this.asteroids.length <= this.numAsteroids() - 5) {
      this.refillAsteroids();
    }
    this.refillHealthkits();
    this.refillPowerups();
    if (this.ship.immunity > 0) {
      this.ship.immunity -= 1;
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
