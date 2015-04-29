(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (args) {
    Asteroids.MovingObject.call(this, args);
    this.vel = Asteroids.Util.randomVec(5);
    this.radius = Asteroid.RADIUS;
    this.sprite = Asteroid.SPRITE;
  };

  Asteroid.RADIUS = 40;
  Asteroid.SPRITE = "images/asteroid.png";

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject) && otherObject instanceof Asteroids.Ship) {
      this.game.health -= 1;
      if (this.game.health !== 0) {
        otherObject.relocate();
      }
    }
  };
})();
