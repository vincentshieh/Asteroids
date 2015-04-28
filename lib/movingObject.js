(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var MovingObject = Asteroids.MovingObject = function (args) {
    this.pos = args.pos;
    this.vel = args.vel;
    this.radius = args.radius;
    this.color = args.color;
    this.game = args.game;
    this.ctx = args.ctx;
  };

  MovingObject.prototype.draw = function (ctx) {
    var image = document.createElement('img');
    image.src = this.sprite;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI);
    ctx.drawImage(image,
                  this.pos[0] - this.radius,
                  this.pos[1] - this.radius,
                  2 * this.radius,
                  2 * this.radius);
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var sumOfRadii = this.radius + otherObject.radius;
    var distanceBetweenObjs = Asteroids.Util.distance(this.pos, otherObject.pos);
    return distanceBetweenObjs < sumOfRadii;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };
})();
