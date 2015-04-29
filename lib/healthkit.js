(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Healthkit = Asteroids.Healthkit = function (args) {
    Asteroids.MovingObject.call(this, args);
    this.vel = Asteroids.Util.randomVec(5);
    this.radius = Healthkit.RADIUS;
    this.sprite = Healthkit.SPRITE;
  };

  Healthkit.RADIUS = 10;
  Healthkit.SPRITE = "images/healthkit.png";

  Asteroids.Util.inherits(Healthkit, Asteroids.MovingObject);

  Healthkit.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject) && otherObject instanceof Asteroids.Ship) {
      this.game.remove(this);
      this.game.health += 1;
    }
  };
})();
