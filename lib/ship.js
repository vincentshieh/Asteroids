(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (args) {
    Asteroids.MovingObject.call(this, args);
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
    this.color = Ship.COLOR;
    this.sprite = Ship.SPRITE;
    this.radialAmmo = 0;
    this.immunity = 0;
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "blue";
  Ship.MAX_SPEED = 10;
  Ship.SPRITE = "images/ship.png";
  Ship.RADIAL_DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0],
                      [Math.sqrt(2) / 2, Math.sqrt(2) / 2],
                      [-Math.sqrt(2) / 2, Math.sqrt(2) / 2],
                      [-Math.sqrt(2) / 2, -Math.sqrt(2) / 2],
                      [Math.sqrt(2) / 2, -Math.sqrt(2) / 2]];

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.decreaseVelocity = function () {
    if (this.velocityMagnitude() !== 0) {
      this.vel = [this.vel[0] * 0.98, this.vel[1] * 0.98];
    }
  };

  Ship.prototype.draw = function (ctx) {
    var image = document.createElement('img');
    image.src = this.sprite;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI);
    if (this.immunity > 0) {
      ctx.globalAlpha = 0.5;
    }
    ctx.drawImage(image,
                  this.pos[0] - this.radius,
                  this.pos[1] - this.radius,
                  2 * this.radius,
                  2 * this.radius);
    ctx.globalAlpha = 1;
  };

  Ship.prototype.fireBullet = function () {
    var velMag = this.velocityMagnitude();

    if (velMag !== 0) {
      var bulletPos = [this.vel[0] * 20 / velMag + this.pos[0],
                       this.vel[1] * 20 / velMag + this.pos[1]];
      var bulletVel = [this.vel[0] * 10 / velMag, this.vel[1] * 10 / velMag];
      var bullet = new Asteroids.Bullet({
        pos: bulletPos,
        vel: bulletVel,
        game: this.game
      });

      this.game.add(bullet);
    }
  };

  Ship.prototype.fireRadialAmmo = function () {
    var currentDir, bulletPos, bulletVel, bullet;

    for(var i = 0; i < Ship.RADIAL_DIRS.length; i++) {
      currentDir = Ship.RADIAL_DIRS[i];
      bulletPos = [currentDir[0] * 20 + this.pos[0],
                   currentDir[1] * 20 + this.pos[1]];
      bulletVel = [currentDir[0] * 10, currentDir[1] * 10];
      bullet = new Asteroids.Bullet({
        pos: bulletPos,
        vel: bulletVel,
        game: this.game
      });

      this.game.add(bullet);
    }
    this.radialAmmo -= 1;
  };

  Ship.prototype.power = function (impulse) {
    if (this.velocityMagnitude() < Ship.MAX_SPEED) {
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
    }
  };

  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Util.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.velocityMagnitude = function () {
    return Asteroids.Util.distance([0, 0], this.vel);
  };
})();
