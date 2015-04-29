(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Powerup = Asteroids.Powerup = function (args) {
    Asteroids.MovingObject.call(this, args);
    this.vel = Asteroids.Util.randomVec(5);
    this.radius = Powerup.RADIUS;
    this.sprite = Powerup.SPRITE;
  };

  Powerup.RADIUS = 10;
  Powerup.SPRITE = "images/powerup.png";

  Asteroids.Util.inherits(Powerup, Asteroids.MovingObject);

  Powerup.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject) && otherObject instanceof Asteroids.Ship) {
      this.game.remove(this);
      otherObject.radialAmmo += 1;
    }
  };
})();
