(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
      this.game = new Asteroids.Game({ ctx: ctx, gameView: this });
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

    this.intervalId = setInterval(function () {
      that.game.draw();
      if (that.game.health !== 0) {
        that.game.step();
      }
    }, 20);
  };

  GameView.prototype.stop = function () {
    clearInterval(this.intervalId);
  };
})();
