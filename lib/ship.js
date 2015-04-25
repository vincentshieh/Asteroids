(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (args) {
    Asteroids.MovingObject.call(this, args);
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
    this.color = Ship.COLOR;
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "blue";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject) && otherObject instanceof Asteroids.Asteroid) {
      this.relocate();
    }
  };

  Ship.prototype.decreaseVelocity = function () {
    if (this.velocityMagnitude() !== 0) {
      this.vel = [this.vel[0] * 0.98, this.vel[1] * 0.98];
    }
  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
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

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Util.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.velocityMagnitude = function () {
    return Asteroids.Util.distance([0, 0], this.vel);
  };
})();
