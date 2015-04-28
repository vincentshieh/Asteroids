(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (args) {
    Asteroids.MovingObject.call(this, args);
    this.vel = Asteroids.Util.randomVec(5);
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
  };

  Asteroid.COLOR = "black";
  Asteroid.RADIUS = 10;

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
