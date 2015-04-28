(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (args) {
    Asteroids.MovingObject.call(this, args);
    this.color = Bullet.COLOR;
    this.radius = Bullet.RADIUS;
  };

  Bullet.COLOR = "black";
  Bullet.RADIUS = 3;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject) && otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
      this.game.score += 100;
    }
  };

  Bullet.prototype.isWrappable = false;
})();
