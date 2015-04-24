(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
      this.game = new Asteroids.Game();
      this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;

    key(
      'up',
      function () {
        that.game.ship.power([0, -5]);
      }
    );
    key(
      'down',
      function () {
        that.game.ship.power([0, 5]);
      }
    );
    key(
      'right',
      function () {
        that.game.ship.power([5, 0]);
      }
    );
    key(
      'left',
      function () {
        that.game.ship.power([-5, 0]);
      }
    );
    key(
      'space',
      function () {
        that.game.ship.fireBullet();
      }
    );
  };

  GameView.prototype.start = function () {
    var that = this;

    this.bindKeyHandlers();

    setInterval(function () {
      that.game.step();
      that.game.draw(that.ctx);
    }, 20);
  };
})();
