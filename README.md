# Asteroids

Asteroids is an arcade space shooter built using JavaScript and HTML5 Canvas. The project was started in collaboration with [Stephen La] and finished on my own. Its functionality is modeled on the game released by Atari in 1979 with the same name.

[Stephen La]: https://github.com/stephenla

Play the game live at: [http://vincentshieh.github.io/Asteroids][url]

[url]: http://vincentshieh.github.io/Asteroids

## How to play

* Navigate your ship using the arrow keys.
* Fire plasma spheres using the space bar.
* Collect healthkits to increase life.
* Collect powerups to shoot radially.

## Code Highlights
* The MovingObject class determines whether two objects have collided with each other by checking if the distance between their centers is less than the sum of their radii:
```javascript
MovingObject.prototype.isCollidedWith = function (otherObject) {
  var sumOfRadii = this.radius + otherObject.radius;
  var distanceBetweenObjs = Asteroids.Util.distance(this.pos, otherObject.pos);
  return distanceBetweenObjs < sumOfRadii;
};
```
