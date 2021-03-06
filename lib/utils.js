(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function Surrogate(){};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Util.randomVec = function (length) {
    var x = (Math.random() * 2 - 1) * length;
    var y = (Math.random() * 2 - 1) * length;
    return [x, y];
  };

  Util.randomBorderPosition = function () {
    var x, y;
    if (Math.random() < 0.5) {
      x = Math.random() * Asteroids.Game.DIM_X;
      if (Math.random() < 0.5) {
        y = 0;
      } else {
        y = Asteroids.Game.DIM_Y;
      }
    } else {
      y = Math.random() * Asteroids.Game.DIM_Y;
      if (Math.random() < 0.5) {
        x = 0;
      } else {
        x = Asteroids.Game.DIM_X;
      }
    }
    return [x, y];
  };

  Util.randomPosition = function () {
    var x = Math.random() * Asteroids.Game.DIM_X;
    var y = Math.random() * Asteroids.Game.DIM_Y;
    return [x, y];
  };

  Util.distance = function (pos1, pos2) {
    return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));
  };
})();
