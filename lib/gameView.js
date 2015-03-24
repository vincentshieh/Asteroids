(function(){
  if(typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }
  var GameView = Asteroids.GameView = function(ctx){
      this.game = new Asteroids.Game();
      this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var that = this;

    setInterval(function () {
      that.game.step();
      that.game.draw(that.ctx);
    }, 20);
  };
})();
