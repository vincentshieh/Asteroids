(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(args){
    Asteroids.MovingObject.call(this, args);
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
    this.color = Ship.COLOR;
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "blue";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.collideWith = function (otherObject) {
    if(this.isCollidedWith(otherObject) && otherObject instanceof Asteroid) {
      this.relocate();
    }
  };
  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Util.randomPosition();
    this.vel = [0, 0];
  };

})();
